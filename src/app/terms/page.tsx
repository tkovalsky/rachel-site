export const metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions for Atlantic Home Watch.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Terms & Conditions</h1>
      <p className="mt-4 text-gray-700">
        By using our site and services, you agree to the following terms and conditions. 
        Please read them carefully.
      </p>

      <h2 className="mt-8 text-xl font-medium">Services</h2>
      <p className="mt-2 text-gray-700">
        Atlantic Home Watch provides home watch visits, vendor coordination, 
        arrival and departure preparation, and storm readiness. 
        Services are performed as visual inspections and scheduled visits unless otherwise agreed in writing.
      </p>

      <h2 className="mt-6 text-xl font-medium">Client Responsibilities</h2>
      <p className="mt-2 text-gray-700">
        Clients must provide accurate contact details, property access information, and 
        notify us of any changes that may affect scheduled visits or property security.
      </p>

      <h2 className="mt-6 text-xl font-medium">Liability</h2>
      <p className="mt-2 text-gray-700">
        Our inspections are visual only. We are not responsible for hidden issues, 
        structural defects, or damage that occurs outside the scope of contracted visits. 
        Clients are advised to maintain appropriate insurance coverage at all times.
      </p>

      <h2 className="mt-6 text-xl font-medium">Payments</h2>
      <p className="mt-2 text-gray-700">
        Payment is due as agreed in your service plan. Packages may be canceled 
        at any time before the next billing cycle. One-time visits are billed at booking.
      </p>

      <h2 className="mt-6 text-xl font-medium">Termination</h2>
      <p className="mt-2 text-gray-700">
        Either party may terminate services with written notice. 
        Fees already paid are non-refundable unless otherwise stated.
      </p>

      <h2 className="mt-6 text-xl font-medium">Governing Law</h2>
      <p className="mt-2 text-gray-700">
        These terms are governed by the laws of the State of Florida.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>
    </main>
  );
}