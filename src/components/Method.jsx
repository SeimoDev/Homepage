import { useLang } from '../i18n';
import { Reveal } from './Reveal';
import ImpactTitle from './ImpactTitle';

export default function Method() {
  const { t } = useLang();

  return (
    <section className="method" aria-labelledby="method-title">
      <div className="wrap">
        <div className="method__head">
          <span className="eyebrow">
            <span className="idx">05</span> {t.method.eyebrow}
          </span>
          <ImpactTitle
            id="method-title"
            className="sec-title sec-title--sm"
            lines={[t.method.title, t.method.titleAccent]}
          />
        </div>

        <div className="steps">
          {t.method.steps.map((s, i) => (
            <Reveal className="step" key={s.no} delay={i * 80}>
              <div className="step__top">
                <span className="step__no">{s.no}</span>
                <span className="step__en eyebrow">{s.en}</span>
              </div>
              <h3 className="step__name">{s.name}</h3>
              <p className="step__body">{s.body}</p>
              <span className="step__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 12" width="34" height="17" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0 6h22M17 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal className="method__aside" delay={80}>
          <span className="method__quote serif-accent">“</span>
          <p>{t.method.aside}</p>
        </Reveal>
      </div>
    </section>
  );
}
