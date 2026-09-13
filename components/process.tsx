import Image from 'next/image';
import { aboutContent } from '@/content/site';

/** Sección editorial de presentación: el titular ES la información, sin rótulo display. */
export function Process() {
  return (
    <section
      id="sobre-mi"
      data-skin="light"
      className="relative bg-page px-[clamp(24px,5vw,72px)] py-[clamp(64px,8vh,110px)]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="font-mono text-[clamp(10px,1vw,13px)] uppercase tracking-[0.22em] text-ink-mute">
          {aboutContent.eyebrow}
        </div>

        <h2
          className="m-0 mt-[clamp(24px,4vh,52px)] font-serif font-normal tracking-[-0.015em] text-ink"
          style={{ fontSize: 'clamp(38px, 5.4vw, 96px)', lineHeight: 1.02, textWrap: 'pretty' }}
        >
          {aboutContent.headline}
        </h2>

        <div className="mt-[clamp(48px,8vh,120px)] grid gap-[clamp(32px,5vw,80px)] md:grid-cols-2 md:items-stretch">
          <figure className="relative m-0 aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-lottie-slot">
            <Image
              src={aboutContent.portrait.src}
              alt={aboutContent.portrait.alt}
              fill
              sizes="(max-width: 768px) 100vw, 46vw"
              className="object-cover"
              style={{ objectPosition: '50% 50%' }}
            />
          </figure>

          <div className="flex flex-col justify-end gap-[clamp(18px,2.4vh,28px)]">
            {aboutContent.notes.map((note) => (
              <p
                key={note}
                className="m-0 max-w-[46ch] uppercase tracking-[0.015em] text-body"
                style={{ fontSize: 'clamp(13px, 1.05vw, 16px)', lineHeight: 1.5 }}
              >
                {note}
              </p>
            ))}

            <a
              href={aboutContent.cta.href}
              className="mt-[clamp(14px,2.4vh,32px)] flex items-center justify-between border-b border-ink pb-[clamp(10px,1.4vh,16px)] font-bold uppercase tracking-[0.04em] text-ink transition-opacity hover:opacity-55"
              style={{ fontSize: 'clamp(14px, 1.15vw, 18px)' }}
            >
              {aboutContent.cta.label}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
