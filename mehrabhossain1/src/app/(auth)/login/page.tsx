import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-4 py-12">
      <Link href="/" className="font-semibold tracking-tight text-zinc-900">
        Website Builder
      </Link>
      <div className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-zinc-600">Log in to continue building.</p>

        <LoginForm />

        <p className="mt-6 text-sm text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-zinc-900 underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
