"use client";

import { useEditorStore } from "@/features/builder/store/editorStore";
import { ElementRenderer } from "@/features/renderer/ElementRenderer";
import { ELEMENT_REGISTRY, PALETTE } from "@/lib/builder/defaults";
import { findElement } from "@/lib/builder/tree";

export function BuilderShell() {
  const doc = useEditorStore((s) => s.doc);
  const selectedId = useEditorStore((s) => s.selectedId);
  const isDirty = useEditorStore((s) => s.isDirty);

  const selected = selectedId ? findElement(doc, selectedId) : null;

  return (
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
        {/* Palette */}
        <aside className="overflow-y-auto border-r border-black/10 bg-white p-3">
          <h2 className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Elements
          </h2>
          <div className="flex flex-col gap-2">
            {PALETTE.map((type) => (
              <div
                key={type}
                className="flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-sm"
              >
                <span aria-hidden>{ELEMENT_REGISTRY[type].icon}</span>
                <span>{ELEMENT_REGISTRY[type].label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <main className="overflow-auto p-8">
          <div className="mx-auto max-w-3xl bg-white shadow-sm">
            <ElementRenderer element={doc.root} mode="edit" />
          </div>
        </main>

        {/* Properties */}
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
  );
}
