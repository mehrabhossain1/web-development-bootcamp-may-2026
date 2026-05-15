import type { Metadata } from "next";
import Link from "next/link";

import { createProject } from "@/features/projects/actions";
import { listProjects } from "@/features/projects/queries";

import { DeleteProjectButton } from "./DeleteProjectButton";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const projects = await listProjects();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your projects
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Create a site and start building.
          </p>
        </div>

        <form action={createProject} className="flex items-center gap-2">
          <input
            type="text"
            name="name"
            placeholder="Project name"
            className="rounded-md border border-black/15 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-foreground dark:border-white/20"
          />
          <button
            type="submit"
            className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90"
          >
            New project
          </button>
        </form>
      </div>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-black/15 px-6 py-16 text-center dark:border-white/15">
          <p className="text-sm font-medium">No projects yet</p>
          <p className="mt-1 text-sm text-zinc-500">
            Use the “New project” button above to create your first site.
          </p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/10 p-4 dark:border-white/15"
            >
              <Link href={`/builder/${project.id}`} className="min-w-0 flex-1">
                <span className="block truncate font-medium">
                  {project.name}
                </span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Updated {project.updatedAt.toLocaleDateString()}
                </span>
              </Link>
              <DeleteProjectButton
                projectId={project.id}
                projectName={project.name}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
