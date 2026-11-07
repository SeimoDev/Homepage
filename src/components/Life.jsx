import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';

const dimensions = { radio: [368, 1162], desk: [564, 805], wave: [372, 1164] };

export default function Life() {
  const { t } = useLang();
  return (
    <section className="life" id="life" aria-labelledby="life-title">
      <div className="wrap">
        <SectionHeading number="06" id="life-title" title={t.life.title} />
        <div className="life__grid">
          {t.life.cards.map((card) => <article className="lifecard" key={card.name}>
            <div className="lifecard__media"><img src={`/media/${card.img}.webp`} alt="" width={dimensions[card.img][0]} height={dimensions[card.img][1]} loading="lazy" /></div>
            <div><h3 className="lifecard__name">{card.name}</h3><p className="lifecard__body">{card.body}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
