"use client";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, MouseEvent } from "react";

import { useEditorStore } from "@/features/builder/store/editorStore";
import { ElementRenderer } from "@/features/renderer/ElementRenderer";
import type { BuilderElement, ContainerElement } from "@/types/builder";

const EMPTY_HINT_STYLE: CSSProperties = {
  display: "block",
  padding: "12px",
  textAlign: "center",
  color: "#9ca3af",
  fontSize: "13px",
  fontStyle: "italic",
};

/** Renders a container's children inside a scoped SortableContext. */
export function ContainerBody({ container }: { container: ContainerElement }) {
  if (container.children.length === 0) {
    return <span style={EMPTY_HINT_STYLE}>Empty container</span>;
  }
  return (
    <SortableContext
      items={container.children.map((child) => child.id)}
      strategy={verticalListSortingStrategy}
    >
      {container.children.map((child) => (
        <CanvasElement key={child.id} element={child} />
      ))}
    </SortableContext>
  );
}

/** A draggable / sortable / selectable element on the editor canvas. */
export function CanvasElement({ element }: { element: BuilderElement }) {
  const selectedId = useEditorStore((s) => s.selectedId);
  const select = useEditorStore((s) => s.select);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id, data: { source: "canvas" } });

  const dndStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
    outline: selectedId === element.id ? "2px solid #2563eb" : undefined,
    outlineOffset: "-2px",
    cursor: "grab",
  };

  function handleClick(event: MouseEvent) {
    // Select this element; stop bubbling so the innermost element wins, and
    // prevent default so a button element's link doesn't navigate in-editor.
    event.stopPropagation();
    event.preventDefault();
    select(element.id);
  }

  if (element.type === "container") {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={handleClick}
        style={{ ...(element.styles as CSSProperties), ...dndStyle }}
      >
        <ContainerBody container={element} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      style={dndStyle}
    >
      <ElementRenderer element={element} mode="edit" />
    </div>
  );
}
