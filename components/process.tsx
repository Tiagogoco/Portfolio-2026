import { aboutContent } from '@/content/site';

/** Sección editorial de presentación, sin el tratamiento azul del proceso anterior. */
export function Process() {
  return (
    <section
      id="sobre-mi"
      className="relative bg-page px-[clamp(24px,5vw,72px)] py-[clamp(64px,8vh,110px)]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div>
          <div className="font-mono text-[clamp(10px,1vw,13px)] uppercase tracking-[0.22em] text-ink-mute">
            {aboutContent.eyebrow}
          </div>
          <h2
            className="m-0 mt-[clamp(28px,5vh,72px)] max-w-[1200px] font-extrabold text-[clamp(72px,17vw,250px)] uppercase tracking-[-0.075em] text-ink md:text-[clamp(52px,8.5vw,125px)]"
            style={{ lineHeight: 0.78 }}
          >
            {aboutContent.title}
          </h2>
        </div>

        <div className="grid gap-[clamp(32px,6vw,96px)] pb-[clamp(8px,2vh,30px)] pt-[clamp(40px,6vh,80px)] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:items-start">
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
