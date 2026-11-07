import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from './i18n';
import useSmoothScroll from './hooks/useSmoothScroll';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Work from './components/Work';
import Stack from './components/Stack';
import Path from './components/Path';
import Method from './components/Method';
import Life from './components/Life';
import Contact from './components/Contact';

function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1150;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setGone(true);
          onDone();
        }, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="pre"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pre__inner wrap">
            <span className="pre__mark">SEIMO</span>
            <div className="pre__bar">
              <motion.span className="pre__fill" style={{ width: `${count}%` }} />
            </div>
            <span className="pre__count">{String(count).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  useSmoothScroll();
  const [ready, setReady] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (!ready) return;
    document.body.classList.add('is-ready');
  }, [ready]);

  return (
    <div className="shell" data-ready={ready}>
      <Preloader onDone={() => setReady(true)} />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Stack />
        <Path />
        <Method />
        <Life />
        <Contact />
      </main>
      <span className="sr-only">{t.contact.mottoEn}</span>
    </div>
  );
}
