import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useLang } from '../i18n';
import { Reveal } from './Reveal';
import ImpactTitle from './ImpactTitle';
import { scrollToTop } from '../hooks/useSmoothScroll';

export default function Contact() {
  const { t } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const yArt = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, reduce ? 0 : -10]);
  const scaleArt = useSpring(
    useTransform(scrollYProgress, [0, 0.55, 1], [0.9, reduce ? 1 : 1.06, 1.02]),
    { stiffness: 110, damping: 26, mass: 0.4 }
  );

  return (
    <section className="contact" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__grid">
          <div className="contact__copy">
            <span className="eyebrow">
              <span className="idx">07</span> {t.contact.eyebrow}
            </span>

            <ImpactTitle
              id="contact-title"
              className="contact__title"
              lines={[t.contact.title, t.contact.titleAccent]}
              from={300}
              to={600}
              scaleFrom={1.04}
            />

            <Reveal as="p" className="contact__lead" delay={60}>
              {t.contact.lead}
            </Reveal>

            <ul className="links">
              {t.contact.links.map((l, i) => (
                <Reveal as="li" key={l.label} delay={100 + i * 60}>
                  <a className="link" href={l.href} target="_blank" rel="noreferrer noopener">
                    <span className="link__idx">{String(i + 1).padStart(2, '0')}</span>
                    <span className="link__label">{l.label}</span>
                    <span className="link__value">{l.value}</span>
                    <span className="link__arrow" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M4 12 12 4M12 4H5.5M12 4v6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <motion.figure
            className="contact__art"
            style={{ y: yArt, scale: scaleArt, transformOrigin: '50% 100%' }}
          >
            <span className="contact__ring" aria-hidden="true" />
            <img src="/media/wave.webp" alt="Seimo 回头挥手" width="372" height="1164" loading="lazy" />
          </motion.figure>
        </div>

        <div className="motto">
          <span className="motto__cn serif-accent">{t.contact.motto}</span>
          <span className="motto__en serif-accent">{t.contact.mottoEn}</span>
        </div>

        <footer className="foot">
          <button type="button" className="foot__top" onClick={scrollToTop}>
            <span className="eyebrow">Back to top</span>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="M8 13.5v-11M3.6 6.8 8 2.4l4.4 4.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="foot__copy eyebrow">© {new Date().getFullYear()} Seimo</span>
        </footer>
      </div>
    </section>
  );
}
