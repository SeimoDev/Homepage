import { useLang } from '../i18n';
import { scrollToId } from '../hooks/useSmoothScroll';
import Icon from './Icon';

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <p className="hero__role">{t.hero.role}</p>
          <h1 className="hero__title" id="hero-title">
            {t.hero.lines.map((line, index) => <span className={`hero__line${index ? ' hero__line--accent' : ''}`} key={line}>{line}</span>)}
          </h1>
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={() => scrollToId('work')}>{t.hero.cta}<Icon name="down" /></button>
            <a className="hero__secondary" href="#contact" onClick={(event) => { event.preventDefault(); scrollToId('contact'); }}>{t.hero.contact}<Icon name="external" /></a>
          </div>
        </div>
        <figure className="hero__art">
          <img src="/media/hero.webp" alt={t.hero.imageAlt} width="366" height="1175" fetchPriority="high" />
        </figure>
      </div>
    </section>
  );
}
