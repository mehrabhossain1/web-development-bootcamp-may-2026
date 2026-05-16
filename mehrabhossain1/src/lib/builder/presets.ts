import { PanelBottom, PanelTop, Sparkles } from "lucide-react";
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

/** A transparent-background ghost nav link. */
function navLink(label: string): ButtonElement {
  return button(label, "#", {
    display: "inline-block",
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: "#475569",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
  });
}

function createHeader(): ContainerElement {
  return box(
    {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      padding: "16px 32px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
    },
    [
      text("YourBrand", {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0f172a",
      }),
      box(
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "6px",
          padding: "0px",
          backgroundColor: "transparent",
        },
        [
          navLink("Features"),
          navLink("Pricing"),
          navLink("About"),
          button("Get started", "#", {
            display: "inline-block",
            padding: "9px 16px",
            backgroundColor: "#047857",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
          }),
        ],
      ),
    ],
  );
}

/** A footer link column — a heading followed by muted link texts. */
function footerColumn(heading: string, links: string[]): ContainerElement {
  return box(
    {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "0px",
      backgroundColor: "transparent",
    },
    [
      text(heading, {
        fontSize: "13px",
        fontWeight: "600",
        color: "#ffffff",
      }),
      ...links.map((link) =>
        text(link, {
          fontSize: "13px",
          color: "#94a3b8",
          lineHeight: "1.4",
        }),
      ),
    ],
  );
}

function createFooter(): ContainerElement {
  return box(
    {
      display: "flex",
      flexDirection: "column",
      gap: "28px",
      padding: "48px 32px",
      backgroundColor: "#0f172a",
    },
    [
      box(
        {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "48px",
          padding: "0px",
          backgroundColor: "transparent",
        },
        [
          box(
            {
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "0px",
              backgroundColor: "transparent",
            },
            [
              text("YourBrand", {
                fontSize: "16px",
                fontWeight: "700",
                color: "#ffffff",
              }),
              text("Build polished pages without writing code.", {
                fontSize: "13px",
                color: "#94a3b8",
                lineHeight: "1.6",
                maxWidth: "220px",
              }),
            ],
          ),
          footerColumn("Product", ["Features", "Pricing", "Templates"]),
          footerColumn("Company", ["About", "Blog", "Contact"]),
        ],
      ),
      text("© 2026 YourBrand. All rights reserved.", {
        fontSize: "12px",
        color: "#64748b",
        borderTop: "1px solid #1e293b",
        paddingTop: "24px",
      }),
    ],
  );
}

/** Registry of section presets shown in the palette. */
export const SECTION_PRESETS: SectionPreset[] = [
  {
    key: "header",
    label: "Header",
    description: "Logo, navigation links, and a CTA",
    icon: PanelTop,
    create: createHeader,
  },
  {
    key: "hero",
    label: "Hero",
    description: "Headline, subtext, and call-to-action",
    icon: Sparkles,
    create: createHero,
  },
  {
    key: "footer",
    label: "Footer",
    description: "Link columns and fine print",
    icon: PanelBottom,
    create: createFooter,
  },
];

/** Builds a fresh section subtree for the given preset key. */
export function createPreset(key: string): ContainerElement | undefined {
  return SECTION_PRESETS.find((preset) => preset.key === key)?.create();
}
