import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n';
import { scrollToId } from '../hooks/useSmoothScroll';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/SeimoDev',
    icon: (
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/SeimoDev',
    icon: (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path d="M12.6 1h2.2l-4.8 5.5L15.7 15h-4.4L7.8 10.2 3.8 15H1.6l5.1-5.9L1 1h4.5l3.2 4.4L12.6 1Zm-.8 12.5h1.2L4.7 2.4H3.4l8.4 11.1Z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/seimo_dev',
    icon: (
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
        <path d="M15.6 1.6 13.3 14c-.17.77-.63.95-1.27.6l-3.5-2.6-1.69 1.63c-.19.19-.35.35-.71.35l.25-3.56 6.5-5.87c.28-.25-.06-.39-.44-.14L4.4 8.75.95 7.68c-.75-.24-.77-.75.16-1.11L14.5.5c.62-.23 1.16.14 1.1 1.1Z" />
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: 'https://blog.seimo.cn',
    icon: (
      <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 3.2h7.4M2.5 6.4h7.4M2.5 9.6h4.6" />
        <path d="M10.2 12.6 13.8 9l-1.4-1.4-3.6 3.6-.3 1.7 1.7-.3Z" />
        <path d="M2.5 3.2v9.6h5" />
      </svg>
    ),
  },
];

export default function Hero() {
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yArt = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]), {
    stiffness: 90, damping: 26, mass: 0.4,
  });
  const scaleArt = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1 : 0.86]),
    { stiffness: 100, damping: 26, mass: 0.4 }
  );
  const yType = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);
  const blur = useTransform(scrollYProgress, [0, 0.7], ['blur(0px)', reduce ? 'blur(0px)' : 'blur(8px)']);
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.94]);
  const weight = useTransform(scrollYProgress, [0, 0.55], [200, 600]);
  const weightSetting = useTransform(weight, (w) => `"wght" ${Math.round(w)}`);

  const t1 = t.hero.lines[0];
  const t2 = t.hero.lines[1];

  return (
    <section className="hero" id="top" ref={ref}>
      {/* ghost wordmark */}
      <div className="hero__ghost" aria-hidden="true">
        <motion.span style={{ y: yType }}>SEIMO</motion.span>
      </div>

      <motion.div className="hero__gridline" aria-hidden="true" style={{ opacity: fade }} />

      <div className="hero__inner wrap">
        <motion.div className="hero__copy" style={{ y: yType, opacity: fade }}>
          <motion.p
            className="hero__role eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="dot" aria-hidden="true" />
            {t.hero.role}
          </motion.p>

          <motion.h1
            className="hero__title"
            style={{ scale: titleScale, filter: blur, fontVariationSettings: weightSetting }}
          >
            <span className="hero__line">
              {t1.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="ch"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.035, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </span>
            <span className="hero__line hero__line--accent">
              {t2.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="ch"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    delay: 0.62 + i * 0.035,
                    duration: 1.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="btn btn--primary" onClick={() => scrollToId('work')}>
              <span>{t.hero.cta}</span>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M8 2.5v10M3.6 8.4 8 12.8l4.4-4.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>

          <motion.ul
            className="socials"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  className="social"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={s.label}
                >
                  <span className="social__icon" aria-hidden="true">{s.icon}</span>
                  <span className="social__tip">{s.label}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.figure
          className="hero__art"
          style={{ y: yArt, scale: scaleArt }}
          initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.15, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero__halo" aria-hidden="true" />
          <img src="/media/hero.webp" alt="Seimo — 白帽红衣的少女形象" width="366" height="1175" />
          <figcaption className="hero__artmeta">
            <span className="hero__artmeta-rule" aria-hidden="true" />
            <span className="eyebrow">OC / Seimo</span>
            <span className="hero__artmeta-sep" aria-hidden="true">·</span>
            <span className="eyebrow">{t.hero.years}</span>
          </figcaption>
        </motion.figure>
      </div>

      <motion.div className="hero__foot wrap" style={{ opacity: fade }}>
        <span className="hero__motto serif-accent">{t.hero.motto}</span>
        <span className="hero__scroll" aria-hidden="true">
          <span>{t.hero.scroll}</span>
          <span className="hero__scrollbar">
            <span className="hero__scrolldot" />
          </span>
        </span>
      </motion.div>
    </section>
  );
}
