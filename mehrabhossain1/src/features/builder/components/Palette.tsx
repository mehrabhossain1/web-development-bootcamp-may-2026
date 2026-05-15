"use client";

import { useDraggable } from "@dnd-kit/core";

import { ELEMENT_REGISTRY, PALETTE } from "@/lib/builder/defaults";
import type { ElementType } from "@/types/builder";

function PaletteItem({ type }: { type: ElementType }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: "palette", type },
  });

  const { icon, label } = ELEMENT_REGISTRY[type];

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm ${
        isDragging
          ? "border-black/10 opacity-40"
          : "border-black/10 hover:border-black/25"
      }`}
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function Palette() {
  return (
    <aside className="overflow-y-auto border-r border-black/10 bg-white p-3">
      <h2 className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Elements
      </h2>
      <div className="flex flex-col gap-2">
        {PALETTE.map((type) => (
          <PaletteItem key={type} type={type} />
        ))}
      </div>
    </aside>
  );
}
