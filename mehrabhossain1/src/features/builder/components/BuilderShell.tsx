"use client";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Canvas } from "@/features/builder/components/Canvas";
import { Palette } from "@/features/builder/components/Palette";
import { PropertiesPanel } from "@/features/builder/property-editors/PropertiesPanel";
import { useEditorStore } from "@/features/builder/store/editorStore";
import { updateProject } from "@/features/projects/actions";
import { ElementRenderer } from "@/features/renderer/ElementRenderer";
import { createElement, ELEMENT_REGISTRY } from "@/lib/builder/defaults";
import { findElement, findParent } from "@/lib/builder/tree";
import type { ElementType, PageDocument } from "@/types/builder";

/**
 * Resolves a drop target id into a parent container + insertion index:
 * dropping over a container nests into it; dropping over a leaf inserts
 * next to it within its parent.
 */
function resolveDrop(
  doc: PageDocument,
  overId: string,
): { parentId: string; index: number } {
  const overEl = findElement(doc, overId);
  if (overEl?.type === "container") {
    return { parentId: overId, index: overEl.children.length };
  }
  const parent = findParent(doc, overId);
  if (parent) {
    return {
      parentId: parent.id,
      index: parent.children.findIndex((child) => child.id === overId),
    };
  }
  return { parentId: doc.root.id, index: doc.root.children.length };
}

export function BuilderShell({
  projectId,
  initialDoc,
}: {
  projectId: string;
  initialDoc: PageDocument;
}) {
  const doc = useEditorStore((s) => s.doc);
  const isDirty = useEditorStore((s) => s.isDirty);
  const addElement = useEditorStore((s) => s.addElement);
  const moveElement = useEditorStore((s) => s.moveElement);
  const setDoc = useEditorStore((s) => s.setDoc);
  const markSaved = useEditorStore((s) => s.markSaved);

  const [saving, setSaving] = useState(false);
  const [draggingType, setDraggingType] = useState<ElementType | null>(null);
  const [draggingElementId, setDraggingElementId] = useState<string | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  // Load the project's document into the store after mount. Effects don't run
  // during SSR, so the server keeps the pristine default doc — server and
  // client first-render produce identical markup (no hydration mismatch).
  useEffect(() => {
    setDoc(initialDoc);
  }, [initialDoc, setDoc]);

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current;
    if (data?.source === "palette") {
      setDraggingType(data.type as ElementType);
    } else if (data?.source === "canvas") {
      setDraggingElementId(String(event.active.id));
    }
  }

  function clearDrag() {
    setDraggingType(null);
    setDraggingElementId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    clearDrag();
    if (!over) return;

    const data = active.data.current;
    const currentDoc = useEditorStore.getState().doc;
    const target = resolveDrop(currentDoc, String(over.id));

    if (data?.source === "palette") {
      addElement(
        target.parentId,
        createElement(data.type as ElementType),
        target.index,
      );
      return;
    }

    if (data?.source === "canvas") {
      const activeId = String(active.id);
      if (activeId === String(over.id)) return;
      moveElement(activeId, target.parentId, target.index);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateProject(projectId, useEditorStore.getState().doc);
      markSaved();
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const draggingElement = draggingElementId
    ? findElement(doc, draggingElementId)
    : null;

  return (
    <DndContext
      id="builder-dnd"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={clearDrag}
    >
      <div className="flex h-[100dvh] flex-col overflow-hidden bg-zinc-100 text-zinc-900">
        {/* Toolbar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 bg-white px-4">
          <Link
            href="/dashboard"
            className="font-semibold tracking-tight hover:opacity-80"
          >
            Website Builder
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || saving}
              className="rounded-md bg-zinc-900 px-3 py-1.5 font-medium text-white disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {/* Preview shows the last saved tree; unsaved edits need a Save
                first. Opens in a new tab so live editor state is kept. */}
            <a
              href={`/preview/${projectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-black/15 px-3 py-1.5 font-medium hover:bg-black/5"
            >
              Preview
            </a>
            {/* Export downloads the last saved tree as a standalone .html
                file; the attachment header makes the browser download it. */}
            <a
              href={`/api/projects/${projectId}/export`}
              className="rounded-md border border-black/15 px-3 py-1.5 font-medium hover:bg-black/5"
            >
              Export
            </a>
          </div>
        </header>

        {/* 3-column body: palette / canvas / properties */}
        <div className="grid min-h-0 flex-1 grid-cols-[220px_1fr_300px]">
          <Palette />
          <Canvas />
          <aside className="overflow-y-auto border-l border-black/10 bg-white p-3">
            <h2 className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Properties
            </h2>
            <PropertiesPanel />
          </aside>
        </div>
      </div>

      <DragOverlay>
        {draggingType ? (
          <div className="flex items-center gap-2 rounded-md border border-black/20 bg-white px-3 py-2 text-sm shadow-lg">
            <span aria-hidden>{ELEMENT_REGISTRY[draggingType].icon}</span>
            <span>{ELEMENT_REGISTRY[draggingType].label}</span>
          </div>
        ) : draggingElement ? (
          <div style={{ opacity: 0.85 }}>
            <ElementRenderer element={draggingElement} mode="preview" />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
