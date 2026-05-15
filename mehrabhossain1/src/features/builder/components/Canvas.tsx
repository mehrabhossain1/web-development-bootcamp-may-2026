"use client";

import { useDroppable } from "@dnd-kit/core";
import type { CSSProperties } from "react";

import { ContainerBody } from "@/features/builder/components/CanvasElement";
import { useEditorStore } from "@/features/builder/store/editorStore";

export function Canvas() {
  const doc = useEditorStore((s) => s.doc);
  const select = useEditorStore((s) => s.select);

  // The root container is a drop target; its id lets dropped elements land
  // straight in the root.
  const { setNodeRef, isOver } = useDroppable({ id: doc.root.id });

  return (
    <main
      className="overflow-auto bg-zinc-100 p-8"
      onClick={() => select(null)}
    >
      <div
        ref={setNodeRef}
        style={doc.root.styles as CSSProperties}
        className={`mx-auto max-w-3xl bg-white shadow-sm ring-2 transition-colors ${
          isOver ? "ring-blue-400" : "ring-transparent"
        }`}
      >
        <ContainerBody container={doc.root} />
      </div>
    </main>
  );
}
