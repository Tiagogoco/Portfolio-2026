import { Fragment } from 'react';
import { CvActions } from '@/components/cv-actions';
import { cvIdentity, type CvContent, type CvLocale } from '@/content/cv';
import './cv.css';

/** La hoja es la misma en los dos idiomas: sólo cambia el contenido y el `lang`,
    que es lo que hace que un lector de pantalla —o un ATS— lea cada versión con
    la pronunciación y el diccionario correctos. */
export function CvDocument({ content, locale }: { content: CvContent; locale: CvLocale }) {
  return (
    <main className="cv-page">
      <CvActions locale={locale} downloadLabel={content.labels.download} />

      <article className="cv-sheet" lang={locale}>
        <header>
          <h1 className="cv-name">{cvIdentity.name}</h1>
          <p className="cv-headline">{content.headline}</p>

          <div className="cv-contact">
            <span>{content.location}</span>
            <span aria-hidden="true">|</span>
            <a href={cvIdentity.phone.href}>{cvIdentity.phone.label}</a>
            <span aria-hidden="true">|</span>
            <a href={`mailto:${cvIdentity.email}`}>{cvIdentity.email}</a>
          </div>

          <div className="cv-contact">
            {cvIdentity.links.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && <span aria-hidden="true">|</span>}
                <a href={link.href}>{link.label}</a>
              </Fragment>
            ))}
          </div>
        </header>

        <div className="cv-body">
          <aside>
            <section className="cv-section">
              <h2>{content.labels.profile}</h2>
              {content.profile.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section className="cv-section">
              <h2>{content.labels.skills}</h2>
              {content.skills.map((group) => (
                <div className="cv-block" key={group.title}>
                  <p className="cv-block-title">{group.title}</p>
                  <p className="cv-block-detail">{group.items}</p>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2>{content.labels.education}</h2>
              <p className="cv-block-title">{content.education.school}</p>
              <p className="cv-block-title">{content.education.degree}</p>
              <p className="cv-block-muted">{content.education.detail}</p>
              {content.education.status.map((line) => (
                <p className="cv-block-detail" key={line}>
                  {line}
                </p>
              ))}
            </section>

            <section className="cv-section">
              <h2>{content.labels.languages}</h2>
              {content.languages.map((language) => (
                <div className="cv-block" key={language.title}>
                  <p className="cv-block-title">{language.title}</p>
                  <p className="cv-block-muted">{language.detail}</p>
                </div>
              ))}
            </section>
          </aside>

          <section className="cv-section">
            <h2>{content.labels.experience}</h2>

            {content.experience.map((role) => (
              <div className="cv-role" key={role.org}>
                <h3>{role.org}</h3>
                <p className="cv-role-line">{role.role}</p>
                <p className="cv-role-meta">
                  {role.period} <span aria-hidden="true">|</span>{' '}
                  <a href={role.site.href}>{role.site.label}</a>
                </p>
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
