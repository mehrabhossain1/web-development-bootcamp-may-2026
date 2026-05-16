"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

import { ELEMENT_REGISTRY, PALETTE } from "@/lib/builder/defaults";
import { cn } from "@/lib/cn";
import type { ElementType } from "@/types/builder";

function PaletteItem({ type }: { type: ElementType }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { source: "palette", type },
  });

  const { icon: Icon, label, description } = ELEMENT_REGISTRY[type];

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      className={cn(
        "group flex w-full cursor-grab items-center gap-3 rounded-xl border bg-white p-3 text-left transition active:cursor-grabbing",
        isDragging
          ? "border-primary/40 opacity-50"
          : "border-border hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-fg">{label}</span>
        <span className="block truncate text-xs text-fg-subtle">
          {description}
        </span>
      </span>
      <GripVertical className="size-4 shrink-0 text-fg-subtle/60" />
    </button>
  );
}

export function Palette() {
  return (
    <aside className="overflow-y-auto border-r border-border bg-white p-3">
      <h2 className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-fg-subtle">
        Blocks
      </h2>
      <div className="flex flex-col gap-2">
        {PALETTE.map((type) => (
          <PaletteItem key={type} type={type} />
        ))}
      </div>
    </aside>
  );
}
