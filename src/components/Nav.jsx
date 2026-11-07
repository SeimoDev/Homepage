import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { ui, ORDER } from '../content';
import { scrollToId, scrollToTop } from '../hooks/useSmoothScroll';
import { useMediaQuery } from './Reveal';
import Icon from './Icon';

const moveTo = (id) => id === 'top' ? scrollToTop() : scrollToId(id);

function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const button = useRef(null);
  const menu = useRef(null);

  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('[aria-selected="true"]')?.focus();
    const outside = (event) => { if (!ref.current?.contains(event.target)) setOpen(false); };
    const escape = (event) => {
      if (event.key === 'Escape') { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  function navigate(event) {
    const options = [...menu.current.querySelectorAll('[role="option"]')];
    const current = options.indexOf(document.activeElement);
    let next;
    if (event.key === 'ArrowDown') next = (current + 1) % options.length;
    if (event.key === 'ArrowUp') next = (current - 1 + options.length) % options.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = options.length - 1;
    if (next !== undefined) { event.preventDefault(); options[next].focus(); }
  }

  return (
    <div className="lang" ref={ref} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button className="lang__btn" type="button" ref={button} onClick={() => setOpen((value) => !value)} aria-label={t.controls.language} aria-haspopup="listbox" aria-expanded={open} aria-controls="language-options"><Icon name="globe" /><span className="lang__code">{ui[lang].code}</span></button>
      {open && <ul className="lang__menu" id="language-options" ref={menu} role="listbox" aria-label={t.controls.language} onKeyDown={navigate}>
        {ORDER.map((code) => <li key={code} role="presentation"><button type="button" className={`lang__item${code === lang ? ' is-active' : ''}`} role="option" aria-selected={code === lang} tabIndex={code === lang ? 0 : -1} onClick={() => { setLang(code); setOpen(false); button.current?.focus(); }}><span className="lang__label">{ui[code].label}</span>{code === lang && <Icon name="check" />}</button></li>)}
      </ul>}
    </div>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const button = useRef(null);
  const pendingSection = useRef(null);
  const wide = useMediaQuery('(min-width: 901px)');

  useEffect(() => {
    const sections = t.nav.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const update = () => {
      setSolid(window.scrollY > 8);
      const position = window.scrollY + window.innerHeight * 0.3;
      const current = [...sections].reverse().find((section) => section.offsetTop <= position);
      setActive(current?.id || '');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [t.nav]);

  useEffect(() => { if (wide) setMenuOpen(false); }, [wide]);
  useEffect(() => {
    if (!menuOpen) return;
    const before = document.body.style.overflow;
    const main = document.getElementById('main');
    document.body.style.overflow = 'hidden';
    if (main) main.inert = true;
    const focus = requestAnimationFrame(() => document.querySelector('.sheet__link')?.focus());
    const escape = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); button.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => {
      cancelAnimationFrame(focus);
      document.body.style.overflow = before;
      if (main) main.inert = false;
      document.removeEventListener('keydown', escape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen || !pendingSection.current) return;
    const id = pendingSection.current;
    pendingSection.current = null;
    const frame = requestAnimationFrame(() => moveTo(id));
    return () => cancelAnimationFrame(frame);
  }, [menuOpen]);

  const go = (event, id) => {
    event.preventDefault();
    if (menuOpen) {
      pendingSection.current = id;
      setMenuOpen(false);
    } else moveTo(id);
  };

  return (
    <>
      <header className={`nav${solid ? ' is-solid' : ''}`}>
        <div className="nav__inner wrap">
          <a className="nav__brand" href="#top" aria-label={t.controls.home} onClick={(event) => go(event, 'top')}><img src="/favicon-192x192.png?v=round" width="28" height="28" alt="" /><span>Seimo</span></a>
          <nav className="nav__links" aria-label={t.controls.sections}>
            {t.nav.map((item) => <a key={item.id} href={`#${item.id}`} className={`nav__link${active === item.id ? ' is-active' : ''}`} aria-current={active === item.id ? 'location' : undefined} onClick={(event) => go(event, item.id)}>{item.label}</a>)}
          </nav>
          <div className="nav__right"><LangSwitch /><button ref={button} type="button" className="burger" aria-label={menuOpen ? t.controls.closeMenu : t.controls.openMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}><Icon name={menuOpen ? 'close' : 'menu'} /></button></div>
        </div>
      </header>
      {menuOpen && <nav className="sheet" id="mobile-navigation" aria-label={t.controls.sections}><ul className="sheet__list wrap">{t.nav.map((item, index) => <li key={item.id}><a className="sheet__link" href={`#${item.id}`} onClick={(event) => go(event, item.id)}><span className="sheet__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{item.label}</a></li>)}</ul></nav>}
    </>
  );
}
