import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { useLang } from '../i18n';
import { ui, ORDER } from '../content';
import { scrollToId } from '../hooks/useSmoothScroll';

function LangSwitch({ compact = false }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`lang ${compact ? 'lang--compact' : ''}`} ref={ref}>
      <button
        type="button"
        className="lang__btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        <span className="lang__globe" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.1">
            <circle cx="8" cy="8" r="6.2" />
            <path d="M1.8 8h12.4M8 1.8c1.8 1.9 2.7 4 2.7 6.2S9.8 12.3 8 14.2C6.2 12.3 5.3 10.2 5.3 8S6.2 3.7 8 1.8Z" />
          </svg>
        </span>
        <span className="lang__code">{ui[lang].code}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang__menu"
            role="listbox"
            aria-label="Language"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {ORDER.map((code, i) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={code === lang}
                  className={`lang__item ${code === lang ? 'is-active' : ''}`}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                >
                  <span className="lang__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lang__label">{ui[code].label}</span>
                  <span className="lang__tick" aria-hidden="true">
                    {code === lang ? '●' : ''}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export { LangSwitch };

export default function Nav() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // How far the links have to travel from "left gutter" to "centered".
  const [shift, setShift] = useState(0);
  // Scroll distance over which the nav re-composes.
  const [range, setRange] = useState(700);

  const innerRef = useRef(null);
  const linksRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 24));

  useEffect(() => {
    const measure = () => {
      const links = linksRef.current;
      if (!links || links.offsetWidth === 0) {
        setShift(0);
        return;
      }
      // Measure the untransformed layout position: the scroll-linked x would
      // otherwise bias the reading and the links would never reach centre.
      const prev = links.style.transform;
      links.style.transform = 'none';
      const rect = links.getBoundingClientRect();
      links.style.transform = prev;

      const baseCenter = rect.left + rect.width / 2;
      setShift(window.innerWidth / 2 - baseCenter);

      const intro = document.getElementById('intro');
      const top = intro ? intro.getBoundingClientRect().top + window.scrollY : window.innerHeight;
      setRange(Math.max(320, top * 0.8));
    };

    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => window.removeEventListener('resize', measure);
  }, [t.nav]);

  const progress = useTransform(scrollY, [0, range], [0, 1]);
  const eased = useSpring(progress, { stiffness: 90, damping: 24, mass: 0.32 });
  const linksX = useTransform(eased, [0, 1], [0, shift]);
  const rightOpacity = useTransform(eased, [0, 0.65], [1, 0]);
  const rightShift = useTransform(eased, [0, 1], [0, 10]);
  const rightPointer = useTransform(eased, (v) => (v > 0.6 ? 'none' : 'auto'));

  useEffect(() => {
    const ids = t.nav.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [t.nav]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen && window.__lenis) window.__lenis.stop();
    if (!menuOpen && window.__lenis) window.__lenis.start();
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <header className={`nav ${solid ? 'is-solid' : ''}`}>
        <div className="nav__inner wrap" ref={innerRef}>
          <motion.nav
            className="nav__links"
            aria-label="Sections"
            ref={linksRef}
            style={{ x: linksX }}
          >
            {t.nav.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav__link ${active === item.id ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
              >
                <span className="nav__idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav__word">{item.label}</span>
              </a>
            ))}
          </motion.nav>

          <motion.div
            className="nav__right"
            style={{ opacity: rightOpacity, x: rightShift, pointerEvents: rightPointer }}
          >
            <LangSwitch />
            <button
              type="button"
              className={`burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </motion.div>
        </div>
        <div className="nav__progress">
          <Progress />
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sheet__inner wrap">
              <ul className="sheet__list">
                {t.nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button type="button" onClick={() => go(item.id)}>
                      <span className="sheet__idx">{String(i + 1).padStart(2, '0')}</span>
                      <span>{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="sheet__foot">
                <LangSwitch compact />
                <span className="eyebrow">{t.contact.mottoEn}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="nav__bar" style={{ scaleX: scrollYProgress }} />;
}
