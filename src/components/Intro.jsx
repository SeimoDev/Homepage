import { useLang } from '../i18n';

export default function Intro() {
  const { t } = useLang();
  return (
    <section className="intro" id="intro" aria-labelledby="intro-title">
      <div className="intro__inner wrap">
        <div className="intro__head">
          <span className="section-index" aria-hidden="true">01</span>
          <h2 className="intro__title" id="intro-title">{t.intro.eyebrow}</h2>
        </div>
        <dl className="facts">
          {t.intro.facts.map((fact) => <div className={`fact${fact.v === 'BI6PCR' ? ' fact--signature' : ''}`} key={fact.k}><dt>{fact.k}</dt><dd>{fact.v}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
