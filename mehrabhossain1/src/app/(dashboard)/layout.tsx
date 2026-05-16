import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Definitive, authoritative auth check for everything under (dashboard).
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 text-zinc-900">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-3">
          <Link href="/dashboard" className="font-semibold tracking-tight">
            Website Builder
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-zinc-600">{session.user.name}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded-md border border-black/15 px-3 py-1.5 font-medium hover:bg-black/5"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
