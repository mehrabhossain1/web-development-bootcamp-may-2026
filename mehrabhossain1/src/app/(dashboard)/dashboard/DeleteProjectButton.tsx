"use client";

import { deleteProject } from "@/features/projects/actions";

export function DeleteProjectButton({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  return (
    <form action={deleteProject.bind(null, projectId)}>
      <button
        type="submit"
        onClick={(event) => {
          if (!confirm(`Delete "${projectName}"? This cannot be undone.`)) {
            event.preventDefault();
          }
        }}
        className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
