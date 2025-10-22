type Props = { intro: string; bullets: string[] };

export default function About({ intro, bullets }: Props) {
  return (
    <section id="about" className="section-alt">
      <div className="section py-16">
        <h2 className="h2 text-deep">About Rachel</h2>

        <p className="lead mt-4">{intro}</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {bullets.map((h) => (
            <div key={h} className="card p-6">
              <p className="body text-ink-soft">{h}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 body-small text-ink-lighter">
          Affiliated with Compass Florida, LLC (Koolik Group).{" "}
          <a
            href="https://koolik.com/meet-rachel-kovalsky/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne hover:underline"
          >
            View Rachel's Koolik profile
          </a>.
        </p>
      </div>
    </section>
  );
}