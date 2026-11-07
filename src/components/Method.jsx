import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';

export default function Method() {
  const { t } = useLang();
  return (
    <section className="method" id="method" aria-labelledby="method-title">
      <div className="wrap">
        <SectionHeading number="05" id="method-title" title={t.method.title} />
        <div className="steps">
          {t.method.steps.map((step) => <div className="step" key={step.no}>
            <span className="step__no" aria-hidden="true">{step.no}</span>
            <h3 className="step__name">{step.name}</h3>
            <p className="step__body">{step.body}</p>
          </div>)}
        </div>
      </div>
    </section>
  );
}
