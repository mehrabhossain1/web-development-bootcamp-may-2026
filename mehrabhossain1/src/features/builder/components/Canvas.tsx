"use client";

import { useDroppable } from "@dnd-kit/core";

import { useEditorStore } from "@/features/builder/store/editorStore";
import { ElementRenderer } from "@/features/renderer/ElementRenderer";

export function Canvas() {
  const doc = useEditorStore((s) => s.doc);

  // The page frame is a drop target; its id is the root container's id so a
  // dropped element is added straight into the root.
  const { setNodeRef, isOver } = useDroppable({ id: doc.root.id });

  return (
    <main className="overflow-auto bg-zinc-100 p-8">
      <div
        ref={setNodeRef}
        className={`mx-auto max-w-3xl bg-white shadow-sm ring-2 transition-colors ${
          isOver ? "ring-blue-400" : "ring-transparent"
        }`}
      >
        <ElementRenderer element={doc.root} mode="edit" />
      </div>
    </main>
  );
}
