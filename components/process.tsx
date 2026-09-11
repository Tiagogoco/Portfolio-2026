import { aboutContent } from '@/content/site';

/** Sección editorial de presentación, sin el tratamiento azul del proceso anterior. */
export function Process() {
  return (
    <section
      id="sobre-mi"
      className="relative flex min-h-[100svh] flex-col justify-between bg-page px-[clamp(24px,5vw,72px)] py-[clamp(92px,11vh,150px)]"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-start">
        <div>
          <div className="font-mono text-[clamp(10px,1vw,13px)] uppercase tracking-[0.22em] text-ink-mute">
            {aboutContent.eyebrow}
          </div>
          <h2
            className="m-0 mt-[clamp(28px,5vh,72px)] max-w-[1200px] font-extrabold uppercase tracking-[-0.075em] text-ink"
            style={{ fontSize: 'clamp(72px, 17vw, 250px)', lineHeight: 0.78 }}
          >
            {aboutContent.title}
          </h2>
        </div>

        <div className="grid gap-[clamp(42px,8vw,150px)] pb-[clamp(24px,4vh,58px)] pt-[clamp(56px,8vh,120px)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:items-start">
          <p
            className="m-0 max-w-[580px] font-semibold tracking-[-0.045em] text-ink"
            style={{ fontSize: 'clamp(27px, 3.25vw, 52px)', lineHeight: 1.02, textWrap: 'pretty' }}
          >
            {aboutContent.lead}
          </p>
          <p
            className="m-0 max-w-[720px] tracking-[-0.035em] text-body"
            style={{ fontSize: 'clamp(21px, 2.15vw, 34px)', lineHeight: 1.18, textWrap: 'pretty' }}
          >
            {aboutContent.body}
          </p>
        </div>
      </div>
    </section>
  );
}
