"use client";
import { Phone, Map, Handshake } from "lucide-react";

const ICONS = { Phone, Map, Handshake };

type Step = { title: string; body: string; icon?: keyof typeof ICONS };

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <section aria-label="How it works" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">A Clear, Calm Process</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s) => {
            const Icon = s.icon ? ICONS[s.icon as keyof typeof ICONS] : undefined;
            return (
              <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-5">
                {Icon && <Icon className="h-6 w-6 text-slate-700" aria-label={`${s.title} icon`} />}
                <h3 className="mt-3 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}