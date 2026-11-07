import { useState } from 'react';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';
import ImpactTitle from './ImpactTitle';

export default function Stack() {
  const { t } = useLang();
  const [hovered, setHovered] = useState(0);

  return (
    <section className="stack" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="sec-head sec-head--split">
          <span className="eyebrow">
            <span className="idx">03</span> {t.stack.eyebrow}
          </span>
          <ImpactTitle id="stack-title" lines={[t.stack.title, t.stack.titleAccent]} />
          <p className="sec-lead serif-accent">{t.stack.lead}</p>
        </div>

        <div className="layers" onMouseLeave={() => setHovered(0)}>
          {t.stack.layers.map((layer, i) => (
            <Reveal
              key={layer.no}
              className={`layer ${hovered === i ? 'is-hover' : ''}`}
              delay={i * 70}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              tabIndex={0}
              role="group"
              aria-label={layer.name}
            >
              <span className="layer__no">{layer.no}</span>
              <div className="layer__main">
                <h3 className="layer__name">{layer.name}</h3>
                <span className="layer__en">{layer.en}</span>
              </div>
              <p className="layer__desc">{layer.desc}</p>
              <ul className="layer__items">
                {layer.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <span className="layer__sweep" aria-hidden="true" />
            </Reveal>
          ))}
        </div>

        <Reveal className="langs" delay={60}>
          <div className="langs__head">
            <h3 className="langs__title">{t.stack.langsTitle}</h3>
            <p className="langs__note">{t.stack.langsNote}</p>
          </div>
          <ul className="langs__list">
            {t.stack.langsList.map((l, i) => (
              <li key={l} style={{ '--i': i }}>
                <span className="langs__num">{String(i + 1).padStart(2, '0')}</span>
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
