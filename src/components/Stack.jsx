import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';

export default function Stack() {
  const { t } = useLang();
  return (
    <section className="stack" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <SectionHeading number="03" id="stack-title" title={t.stack.title} />
        <div className="layers">
          {t.stack.layers.map((layer) => <div className="layer" key={layer.no}>
            <span className="layer__no" aria-hidden="true">{layer.no}</span>
            <h3 className="layer__name">{layer.name}</h3>
            <ul className="layer__items">{layer.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>)}
        </div>
        <div className="langs">
          <h3 className="langs__title">{t.stack.langsTitle}</h3>
          <ul className="langs__list">{t.stack.langsList.map((language) => <li key={language}>{language}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
