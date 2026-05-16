"use client";

import { useActionState } from "react";

import { loginUser, type LoginState } from "./actions";

const initialState: LoginState = {};

const fieldClass =
  "mt-1 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      {state.error ? (
        <p
          aria-live="polite"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

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
          autoComplete="current-password"
          required
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Log in"}
      </button>
    </form>
  );
}
