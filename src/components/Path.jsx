import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';
import ImpactTitle from './ImpactTitle';

export default function Path() {
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.85'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="path" id="path" ref={ref} aria-labelledby="path-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">
            <span className="idx">04</span> {t.path.eyebrow}
          </span>
          <ImpactTitle id="path-title" lines={[t.path.title, t.path.titleAccent]} />
        </div>

        <div className="timeline">
          <div className="timeline__rail" aria-hidden="true">
            <motion.span className="timeline__fill" style={{ height: reduce ? '100%' : lineH }} />
          </div>

          {t.path.entries.map((e, i) => (
            <Reveal as="article" className="entry" key={e.year} delay={i * 60}>
              <div className="entry__left">
                <span className="entry__dot" aria-hidden="true">
                  <span />
                </span>
                <span className="entry__year">{e.year}</span>
                <span className="entry__tag">{e.tag}</span>
              </div>
              <div className="entry__body">
                <h3 className="entry__title">{e.title}</h3>
                <p className="entry__text">{e.body}</p>
                <ul className="entry__meta">
                  {e.meta.map((m) => (
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
