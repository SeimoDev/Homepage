import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';

export default function Intro() {
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yQuote = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);

  const words = t.intro.quote.split('');

  return (
    <section className="intro" ref={ref} aria-labelledby="intro-eyebrow">
      <div className="wrap">
        <div className="intro__head">
          <span className="eyebrow" id="intro-eyebrow">
            <span className="idx">01</span> {t.intro.eyebrow}
          </span>
          <span className="intro__hair" aria-hidden="true" />
        </div>

        <motion.blockquote className="intro__quote" style={{ y: yQuote }}>
          <ScrollText text={t.intro.quote} />
        </motion.blockquote>

        <Reveal className="intro__facts" delay={80}>
          <dl className="facts">
            {t.intro.facts.map((f) => (
              <div className="fact" key={f.k}>
                <dt className="eyebrow">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

const CJK = /[　-鿿＀-￯]/;

/** Character-level scroll highlight: each char lifts from dim to full as it enters. */
function ScrollText({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'start 0.3'] });
  const words = text.split(' ');
  const total = text.length;
  let cursor = 0;

  return (
    <span ref={ref} className="scrolltext">
      {words.map((word, wi) => {
        const startIdx = cursor;
        cursor += word.length + 1;
        const chars = word.split('').map((ch, ci) => (
          <Char
            key={ci}
            ch={ch}
            progress={scrollYProgress}
            index={startIdx + ci}
            total={total}
            reduce={reduce}
          />
        ));
        // CJK runs must be able to break mid-run, Latin words must not.
        return CJK.test(word) ? (
          <span className="scrolltext__cjk" key={wi}>{chars}</span>
        ) : (
          <span className="scrolltext__word" key={wi}>{chars}</span>
        );
      })}
    </span>
  );
}

function Char({ ch, progress, index, total, reduce }) {
  const start = Math.min(0.92, (index / total) * 0.85);
  const opacity = useTransform(progress, [start, Math.min(1, start + 0.14)], reduce ? [1, 1] : [0.16, 1]);
  return <motion.span className="ch" style={{ opacity }}>{ch}</motion.span>;
}
