"use client";

/** Error boundary for everything under the (dashboard) route group. */
export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-zinc-600">
        We couldn’t load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
      >
        Try again
      </button>
    </div>
  );
}
