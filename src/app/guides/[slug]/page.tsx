import { guides } from "@/app/content/guides";
import GuideLandingPage from "@/app/components/GuideLandingPage";

// ✅ make the function async and await params
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ✅ unwrap the Promise

  const article = guides.find((g) => g.slug === slug);

  if (!article) {
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Guide not found. Check your slug or create a new entry in `guides.ts`.
      </div>
    );
  }

  return <GuideLandingPage article={article} />;
}

// Optional for static generation (recommended)
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}