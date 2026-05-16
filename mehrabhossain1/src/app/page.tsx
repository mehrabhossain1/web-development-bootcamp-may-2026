import Link from "next/link";

const FEATURES = [
  {
    icon: "🧩",
    title: "Drag & drop",
    body: "Build pages visually — drop text, images, buttons, and containers onto the canvas and reorder them freely.",
  },
  {
    icon: "👁️",
    title: "Live preview",
    body: "Open a clean, shareable preview of any page at its own URL — no editor chrome, just the result.",
  },
  {
    icon: "📦",
    title: "HTML export",
    body: "Download any page as a standalone HTML file with inline styles that opens in any browser.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-semibold tracking-tight">Website Builder</span>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 font-medium hover:bg-black/5"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-zinc-900 px-3 py-1.5 font-medium text-white hover:bg-zinc-700"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
          <div className="flex flex-col items-center text-center">
            <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-zinc-600">
              Drag-and-drop website builder
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Build web pages without writing code
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
              Drag blocks onto a canvas, tweak their properties, and publish a
              live preview or export standalone HTML — all in the browser.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Get started — it&apos;s free
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-black/15 px-5 py-2.5 text-sm font-medium hover:bg-black/5"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-black/10 bg-zinc-50">
          <div className="mx-auto grid w-full max-w-5xl gap-6 px-6 py-16 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-black/10 bg-white p-6"
              >
                <span aria-hidden className="text-2xl">
                  {feature.icon}
                </span>
                <h2 className="mt-3 font-semibold tracking-tight">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-zinc-500">
          Website Builder — a drag-and-drop page editor.
        </div>
      </footer>
    </div>
  );
}
