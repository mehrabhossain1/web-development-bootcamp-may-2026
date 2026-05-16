/** Skeleton shown while the dashboard's project list is being fetched. */
export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your projects
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            Create a site and start building.
          </p>
        </div>
        <div className="h-9 w-44 animate-pulse rounded-md bg-black/10" />
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <li
            key={i}
            className="rounded-xl border border-black/10 bg-white p-4"
          >
            <div className="h-4 w-1/2 animate-pulse rounded bg-black/10" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-black/5" />
          </li>
        ))}
      </ul>
    </div>
  );
}
