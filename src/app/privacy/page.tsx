export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Atlantic Home Watch.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-gray-700">
        We respect your privacy. We collect only the information necessary to respond to your
        inquiries and deliver service.
      </p>
      <h2 className="mt-8 text-xl font-medium">Information We Collect</h2>
      <p className="mt-2 text-gray-700">Name, email, phone, address, and details you provide in the contact form.</p>
      <h2 className="mt-6 text-xl font-medium">How We Use It</h2>
      <p className="mt-2 text-gray-700">We use your information to provide quotes, schedule visits, and communicate.</p>
      <h2 className="mt-6 text-xl font-medium">Contact</h2>
      <p className="mt-2 text-gray-700">Questions? Use the contact form on this site.</p>
    </main>
  );
}
