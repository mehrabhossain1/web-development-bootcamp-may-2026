import { Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type {
  BuilderElement,
  ButtonElement,
  ContainerElement,
  ElementStyles,
  TextElement,
} from "@/types/builder";

const id = () => crypto.randomUUID();

// --- element builders --------------------------------------------------------

function text(content: string, styles: ElementStyles): TextElement {
  return { id: id(), type: "text", props: { content }, styles };
}

function button(
  label: string,
  href: string,
  styles: ElementStyles,
): ButtonElement {
  return { id: id(), type: "button", props: { label, href }, styles };
}

function box(
  styles: ElementStyles,
  children: BuilderElement[],
): ContainerElement {
  return { id: id(), type: "container", props: {}, styles, children };
}

// --- presets -----------------------------------------------------------------

export interface SectionPreset {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Builds a fresh section subtree (new ids on every call). */
  create: () => ContainerElement;
}

function createHero(): ContainerElement {
  return box(
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      padding: "64px 32px",
      backgroundColor: "#ffffff",
    },
    [
      text("Drag-and-drop builder", {
        fontSize: "13px",
        fontWeight: "600",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#047857",
      }),
      text("Build something people love", {
        fontSize: "44px",
        fontWeight: "700",
        lineHeight: "1.1",
        color: "#0f172a",
        textAlign: "center",
        maxWidth: "560px",
      }),
      text(
        "Launch a polished landing page in minutes — no code, just drag, drop, and publish.",
        {
          fontSize: "18px",
          lineHeight: "1.6",
          color: "#475569",
          textAlign: "center",
          maxWidth: "480px",
        },
      ),
      box(
        {
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          padding: "8px",
          backgroundColor: "transparent",
        },
        [
          button("Get started", "#", {
            display: "inline-block",
            padding: "12px 22px",
            backgroundColor: "#047857",
            color: "#ffffff",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            textDecoration: "none",
          }),
          button("Learn more", "#", {
            display: "inline-block",
            padding: "12px 22px",
            backgroundColor: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            textDecoration: "none",
          }),
        ],
      ),
    ],
  );
}

/** Registry of section presets shown in the palette. */
export const SECTION_PRESETS: SectionPreset[] = [
  {
    key: "hero",
    label: "Hero",
    description: "Headline, subtext, and call-to-action",
    icon: Sparkles,
    create: createHero,
  },
];

/** Builds a fresh section subtree for the given preset key. */
export function createPreset(key: string): ContainerElement | undefined {
  return SECTION_PRESETS.find((preset) => preset.key === key)?.create();
}
