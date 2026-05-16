import Link from "next/link";

/** Branded 404 — covers the `notFound()` calls in the builder and preview. */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-20 text-center text-zinc-900">
      <span className="text-sm font-semibold text-zinc-500">404</span>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-600">
        The page you’re looking for doesn’t exist or may have been removed.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
