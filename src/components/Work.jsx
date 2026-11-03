import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';
import ImpactTitle from './ImpactTitle';

export default function Work() {
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yArt = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  // gentle push-in as the figure crosses the viewport
  const scaleArt = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.92, reduce ? 1 : 1.05, 0.96]),
    { stiffness: 110, damping: 26, mass: 0.4 }
  );

  return (
    <section className="work" id="work" ref={ref} aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">
            <span className="idx">02</span> {t.work.eyebrow}
          </span>
          <ImpactTitle id="work-title" lines={[t.work.title, t.work.titleAccent]} />
        </div>

        <div className="work__grid">
          <div className="work__col">
            <Reveal as="p" className="work__body" delay={40}>
              {t.work.body}
            </Reveal>
            <Reveal as="p" className="work__body work__body--muted" delay={120}>
              {t.work.body2}
            </Reveal>

            <Reveal className="work__tags" delay={200}>
              {t.work.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </Reveal>

            <Reveal className="work__card" delay={260}>
              <div className="card">
                <div className="card__top">
                  <span className="card__label eyebrow">
                    <span className="pulse" aria-hidden="true" />
                    {t.work.cardLabel}
                  </span>
                  <span className="card__meta eyebrow">nabu / sm8150</span>
                </div>
                <h3 className="card__title">{t.work.cardTitle}</h3>
                <p className="card__sub">{t.work.cardMeta}</p>
                <div className="card__bar" aria-hidden="true">
                  <span />
                </div>
                <p className="card__note">{t.work.cardNote}</p>
                <span className="card__glow" aria-hidden="true" />
              </div>
            </Reveal>
          </div>

          <motion.figure
            className="work__art"
            style={{ y: yArt, scale: scaleArt, transformOrigin: '50% 100%' }}
          >
            <span className="work__frame" aria-hidden="true" />
            <Marquee items={t.work.marquee} />
            <img src="/media/desk.webp" alt="Seimo 坐在地上用笔记本电脑" width="564" height="805" loading="lazy" />
            <figcaption className="work__caption">
              <span className="eyebrow">02 — desk</span>
              <span className="eyebrow">UTC+8 · 03:41</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

function Marquee({ items }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee__track"
        animate={reduce ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 46, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span className="marquee__item" key={i}>
            <span className={i % 2 === 0 ? 'is-cjk' : 'is-latin'}>{item}</span>
            <span className="marquee__dot" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
