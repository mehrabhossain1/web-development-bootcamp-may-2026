"use client";

import {
  ColorField,
  SelectField,
  SpacingField,
  TextField,
  UrlField,
} from "@/features/builder/property-editors/fields";
import { useEditorStore } from "@/features/builder/store/editorStore";
import { findElement } from "@/lib/builder/tree";
import type {
  ButtonElement,
  ContainerElement,
  ImageElement,
  TextElement,
} from "@/types/builder";

function TextEditor({ element }: { element: TextElement }) {
  const updateProps = useEditorStore((s) => s.updateProps);
  const updateStyles = useEditorStore((s) => s.updateStyles);
  return (
    <>
      <TextField
        label="Content"
        value={element.props.content}
        onCommit={(v) => updateProps(element.id, { content: v })}
      />
      <ColorField
        label="Text color"
        value={element.styles.color ?? "#000000"}
        onCommit={(v) => updateStyles(element.id, { color: v })}
      />
    </>
  );
}

function ImageEditor({ element }: { element: ImageElement }) {
  const updateProps = useEditorStore((s) => s.updateProps);
  return (
    <>
      <UrlField
        label="Image URL"
        value={element.props.src}
        onCommit={(v) => updateProps(element.id, { src: v })}
      />
      <TextField
        label="Alt text"
        value={element.props.alt}
        onCommit={(v) => updateProps(element.id, { alt: v })}
      />
    </>
  );
}

function ButtonEditor({ element }: { element: ButtonElement }) {
  const updateProps = useEditorStore((s) => s.updateProps);
  const updateStyles = useEditorStore((s) => s.updateStyles);
  return (
    <>
      <TextField
        label="Label"
        value={element.props.label}
        onCommit={(v) => updateProps(element.id, { label: v })}
      />
      <UrlField
        label="Link"
        value={element.props.href}
        onCommit={(v) => updateProps(element.id, { href: v })}
      />
      <ColorField
        label="Background"
        value={element.styles.backgroundColor ?? "#111827"}
        onCommit={(v) => updateStyles(element.id, { backgroundColor: v })}
      />
      <ColorField
        label="Text color"
        value={element.styles.color ?? "#ffffff"}
        onCommit={(v) => updateStyles(element.id, { color: v })}
      />
    </>
  );
}

function ContainerEditor({ element }: { element: ContainerElement }) {
  const updateStyles = useEditorStore((s) => s.updateStyles);
  return (
    <>
      <SelectField
        label="Layout"
        value={element.styles.flexDirection ?? "column"}
        options={[
          { value: "column", label: "Vertical" },
          { value: "row", label: "Horizontal" },
        ]}
        onCommit={(v) => updateStyles(element.id, { flexDirection: v })}
      />
      <SpacingField
        label="Padding"
        value={element.styles.padding ?? "0px"}
        onCommit={(v) => updateStyles(element.id, { padding: v })}
      />
      <SpacingField
        label="Gap"
        value={element.styles.gap ?? "0px"}
        onCommit={(v) => updateStyles(element.id, { gap: v })}
      />
      <ColorField
        label="Background"
        value={element.styles.backgroundColor ?? "#ffffff"}
        onCommit={(v) => updateStyles(element.id, { backgroundColor: v })}
      />
    </>
  );
}

export function PropertiesPanel() {
  const selectedId = useEditorStore((s) => s.selectedId);
  const doc = useEditorStore((s) => s.doc);

  const selected = selectedId ? findElement(doc, selectedId) : null;

  if (!selected) {
    return (
      <p className="px-1 text-sm text-zinc-500">
        Select an element to edit its properties.
      </p>
    );
  }

  // Keyed by element id so switching selection re-mounts the fields with
  // fresh local state.
  return (
    <div key={selected.id} className="flex flex-col gap-3">
      <p className="px-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {selected.type}
      </p>
      {selected.type === "text" && <TextEditor element={selected} />}
      {selected.type === "image" && <ImageEditor element={selected} />}
      {selected.type === "button" && <ButtonEditor element={selected} />}
      {selected.type === "container" && <ContainerEditor element={selected} />}
    </div>
  );
}
