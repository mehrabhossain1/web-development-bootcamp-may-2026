/** Shown while the builder page loads the saved project from the database. */
export default function BuilderLoading() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-zinc-100 text-zinc-900">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/15 border-t-zinc-900" />
      <p className="mt-3 text-sm text-zinc-600">Loading builder…</p>
    </div>
  );
}
