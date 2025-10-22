// Neutral, “luxury” styling: larger type, soft cards, consistent icons.
import { Phone, Map, Handshake } from "lucide-react";

const ICONS = { Phone, Map, Handshake };

export type Step = {
  title: string;
  body: string;
  icon?: keyof typeof ICONS;
};

type Props = { steps?: Step[] };

export default function ProcessSteps({ steps = [] }: Props) {
  return (
    <section aria-label="How it works" className="border-t bg-surface-subtle">
      <div className="section py-12">
        <div className="text-center">
          <div className="eyebrow mb-2">How it works</div>
          <h2 className="h2">A clear, calm process</h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon ? ICONS[s.icon] : undefined;
            return (
              <article
                key={s.title}
                className="card p-6 transition-shadow duration-300 hover:shadow-md focus-within:shadow-md"
              >
                {Icon && (
                  <div className="h-10 w-10 rounded-full border border-slate-200 bg-white flex items-center justify-center">
                    <Icon className="h-5 w-5 text-ink-lighter" aria-hidden="true" />
                  </div>
                )}

                <h3 className="mt-4 h3 text-ink">{s.title}</h3>
                <p className="mt-3 body text-ink-soft">{s.body}</p>
              </article>
            );
          })}
          {steps.length === 0 && <p className="body-small text-ink-lighter">Steps coming soon.</p>}
        </div>
      </div>
    </section>
  );
}