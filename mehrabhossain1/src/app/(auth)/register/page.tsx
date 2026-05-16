import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-4 py-12">
      <Link href="/" className="font-semibold tracking-tight text-zinc-900">
        Website Builder
      </Link>
      <div className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          Start building websites in minutes.
        </p>

        <RegisterForm />

        <p className="mt-6 text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-zinc-900 underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
