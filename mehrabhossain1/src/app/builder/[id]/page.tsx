import type { Metadata } from "next";

import { BuilderShell } from "@/features/builder/components/BuilderShell";

export const metadata: Metadata = {
  title: "Builder",
};

// Minimal route host for the builder shell. TICKET-22 wires this up:
// awaits `params`, fetches the project, and feeds its document into the store.
export default function BuilderPage() {
  return <BuilderShell />;
}
