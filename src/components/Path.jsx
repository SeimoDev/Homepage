import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';

export default function Path() {
  const { t } = useLang();
  return (
    <section className="path" id="path" aria-labelledby="path-title">
      <div className="wrap">
        <SectionHeading number="04" id="path-title" title={t.path.title} />
        <div className="timeline">
          {t.path.entries.map((entry) => <article className="entry" key={entry.year}>
            <span className="entry__year">{entry.year}</span>
            <div>
              <h3 className="entry__title">{entry.title}</h3>
              <p className="entry__text">{entry.body}</p>
              <ul className="entry__meta">{entry.meta.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
