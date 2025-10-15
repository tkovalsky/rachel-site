export default function Thanks() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Thanks — check your inbox</h1>
        <p className="mt-4 text-slate-600">
          We’ve sent the Relocation Checklist to your email. If you don’t see it in a few minutes,
          check your spam or promotions folder.
        </p>
        <a href="/" className="mt-8 inline-block rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">
          Back to home
        </a>
      </section>
    </main>
  );
}