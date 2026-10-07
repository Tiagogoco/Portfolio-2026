import { HighlightText } from './highlight-text';
import Image from 'next/image';
import { aboutContent } from '@/content/site';

/** Sección editorial de presentación: el titular ES la información, sin rótulo display. */
export function Process() {
  return (
    <section
      id="sobre-mi"
      data-skin="light"
      className="about-contact-cover relative bg-page px-[clamp(24px,5vw,72px)] py-[clamp(64px,8vh,110px)]"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div data-reveal="label" className="font-mono text-[clamp(10px,1vw,13px)] uppercase tracking-[0.22em] text-ink-mute">
          {aboutContent.eyebrow}
        </div>

        <h2
          data-reveal="text-lines"
          data-marker-block
          className="m-0 mt-[clamp(24px,4vh,52px)] font-serif font-normal tracking-[-0.015em] text-ink"
          style={{ fontSize: 'clamp(38px, 5.4vw, 96px)', lineHeight: 1.02, textWrap: 'pretty' }}
        >
          <HighlightText text={aboutContent.headline} phrase="una experiencia que funciona" />
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

          <div className="flex flex-col justify-end gap-[clamp(20px,3vh,40px)] md:justify-center">
            {aboutContent.notes.map((note) => (
              <p
                key={note}
                className="m-0 max-w-[44ch] font-serif text-[17px] font-normal tracking-[0.005em] text-body md:text-[28px] lg:text-[clamp(35px,2.4vw,40px)]"
                style={{ lineHeight: 1.45 }}
              >
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
