import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/15 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Start building websites in minutes.
        </p>

        <RegisterForm />

        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
