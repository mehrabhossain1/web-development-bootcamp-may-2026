"use client";

import { useEffect, useState } from "react";

const labelClass = "block text-xs font-medium text-zinc-600";
const inputClass =
  "mt-1 w-full rounded-md border border-black/15 bg-white px-2 py-1.5 text-sm outline-none focus:border-zinc-500";

interface BaseProps {
  label: string;
  value: string;
  onCommit: (value: string) => void;
}

function TextLikeField({
  label,
  value,
  onCommit,
  type,
}: BaseProps & { type: "text" | "url" }) {
  const [local, setLocal] = useState(value);

  // Debounce: commit to the store 300ms after the last keystroke.
  useEffect(() => {
    if (local === value) return;
    const timer = setTimeout(() => onCommit(local), 300);
    return () => clearTimeout(timer);
  }, [local, value, onCommit]);

  return (
    <label className={labelClass}>
      {label}
      <input
        type={type}
        value={local}
        onChange={(event) => setLocal(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextField(props: BaseProps) {
  return <TextLikeField {...props} type="text" />;
}

export function UrlField(props: BaseProps) {
  return <TextLikeField {...props} type="url" />;
}

export function ColorField({ label, value, onCommit }: BaseProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    if (local === value) return;
    const timer = setTimeout(() => onCommit(local), 200);
    return () => clearTimeout(timer);
  }, [local, value, onCommit]);

  return (
    <label className={labelClass}>
      {label}
      <div className="mt-1 flex items-center gap-2">
        <input
          type="color"
          value={local || "#000000"}
          onChange={(event) => setLocal(event.target.value)}
          className="h-8 w-10 cursor-pointer rounded border border-black/15"
        />
        <span className="text-xs text-zinc-500">{local || "—"}</span>
      </div>
    </label>
  );
}

export function SpacingField({ label, value, onCommit }: BaseProps) {
  const [local, setLocal] = useState(() => Number.parseInt(value, 10) || 0);

  useEffect(() => {
    const next = `${local}px`;
    if (next === value) return;
    const timer = setTimeout(() => onCommit(next), 300);
    return () => clearTimeout(timer);
  }, [local, value, onCommit]);

  return (
    <label className={labelClass}>
      {label}
      <input
        type="number"
        min={0}
        value={local}
        onChange={(event) => setLocal(Number(event.target.value))}
        className={inputClass}
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  options,
  onCommit,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onCommit: (value: string) => void;
}) {
  return (
    <label className={labelClass}>
      {label}
      <select
        value={value}
        onChange={(event) => onCommit(event.target.value)}
        className={inputClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
