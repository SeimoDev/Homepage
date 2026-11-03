import { useLang } from '../i18n';
import { Reveal } from './Reveal';
import ImpactTitle from './ImpactTitle';
import ScrollZoom from './ScrollZoom';

export default function Life() {
  const { t } = useLang();

  return (
    <section className="life" id="life" aria-labelledby="life-title">
      <div className="wrap">
        <div className="sec-head sec-head--split">
          <span className="eyebrow">
            <span className="idx">06</span> {t.life.eyebrow}
          </span>
          <ImpactTitle id="life-title" lines={[t.life.title, t.life.titleAccent]} />
        </div>

        <div className="life__grid">
          {t.life.cards.map((card, i) => (
            <Reveal
              as="article"
              className={`lifecard lifecard--${i === 0 ? 'tall' : i === 1 ? 'wide' : 'std'}`}
              key={card.name}
              delay={i * 90}
            >
              <div className="lifecard__media">
                <span className="lifecard__glow" aria-hidden="true" />
                <ScrollZoom
                  className="lifecard__figure"
                  from={0.82}
                  to={1.04}
                  origin="50% 100%"
                  offset={['start end', 'end start']}
                >
                  <img
                    src={`/media/${card.img}.webp`}
                    alt={card.name}
                    loading="lazy"
                    width="372"
                    height="1176"
                  />
                </ScrollZoom>
                <span className="lifecard__index eyebrow">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="lifecard__info">
                <div className="lifecard__title-row">
                  <h3 className="lifecard__name">{card.name}</h3>
                  <span className="lifecard__en eyebrow">{card.en}</span>
                </div>
                <p className="lifecard__body">{card.body}</p>
                <ul className="lifecard__meta">
                  {card.meta.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
