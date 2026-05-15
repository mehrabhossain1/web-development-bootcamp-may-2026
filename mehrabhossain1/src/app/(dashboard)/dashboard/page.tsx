import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Placeholder — the real project list is built in TICKET-21.
export default function DashboardPage() {
  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Your projects will appear here.
      </p>
    </div>
  );
}
