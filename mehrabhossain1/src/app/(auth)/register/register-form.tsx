"use client";

import { useActionState } from "react";

import { registerUser, type RegisterState } from "./actions";

const initialState: RegisterState = {};

const fieldClass =
  "mt-1 w-full rounded-md border border-black/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground dark:border-white/20";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      {state.error ? (
        <p
          aria-live="polite"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400"
        >
          {state.error}
        </p>
      ) : null}

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
