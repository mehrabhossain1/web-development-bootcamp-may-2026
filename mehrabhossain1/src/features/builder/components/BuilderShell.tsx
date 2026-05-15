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
import { useState } from "react";

import { Canvas } from "@/features/builder/components/Canvas";
import { Palette } from "@/features/builder/components/Palette";
import { useEditorStore } from "@/features/builder/store/editorStore";
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

export function BuilderShell() {
  const doc = useEditorStore((s) => s.doc);
  const selectedId = useEditorStore((s) => s.selectedId);
  const isDirty = useEditorStore((s) => s.isDirty);
  const addElement = useEditorStore((s) => s.addElement);
  const moveElement = useEditorStore((s) => s.moveElement);

  const [draggingType, setDraggingType] = useState<ElementType | null>(null);
  const [draggingElementId, setDraggingElementId] = useState<string | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const selected = selectedId ? findElement(doc, selectedId) : null;
  const draggingElement = draggingElementId
    ? findElement(doc, draggingElementId)
    : null;

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
          <span className="font-semibold tracking-tight">Website Builder</span>
          <div className="flex items-center gap-2 text-sm">
            {/* Save / Preview / Export are wired in TICKET-22 / 23 / 24. */}
            <button
              type="button"
              disabled={!isDirty}
              className="rounded-md bg-zinc-900 px-3 py-1.5 font-medium text-white disabled:opacity-40"
            >
              Save
            </button>
            <button
              type="button"
              className="rounded-md border border-black/15 px-3 py-1.5 font-medium hover:bg-black/5"
            >
              Preview
            </button>
            <button
              type="button"
              className="rounded-md border border-black/15 px-3 py-1.5 font-medium hover:bg-black/5"
            >
              Export
            </button>
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
            {selected ? (
              <div className="rounded-md border border-black/10 p-3 text-sm">
                <p className="font-medium capitalize">{selected.type}</p>
                <p className="mt-1 break-all text-xs text-zinc-500">
                  {selected.id}
                </p>
              </div>
            ) : (
              <p className="px-1 text-sm text-zinc-500">
                Select an element to edit its properties.
              </p>
            )}
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
