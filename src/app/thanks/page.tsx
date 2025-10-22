import Link from "next/link";

export const metadata = {
  title: "Thanks | Rachel Kovalsky Real Estate",
  description: "Thank you for contacting Rachel Kovalsky Real Estate.",
};

export default function ThanksPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">
        Thank You for Reaching Out!
      </h1>
      <p className="mt-4 text-slate-600 text-lg">
        Your message has been sent successfully. Rachel or a member of her team will get back to you soon.
      </p>

      <div className="mt-10">
        <Link
          href="/"
          className="rounded-lg bg-slate-900 px-6 py-3 text-white font-medium hover:bg-black transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <p className="mt-10 text-sm text-slate-500">
        If you need immediate assistance, call or text us at {" "}
        <a href="tel:+15612878966" className="underline">
          (561) 287-8966
        </a>
        .
      </p>
    </main>
  );
}