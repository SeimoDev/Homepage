import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';
import Icon from './Icon';
import { scrollToTop } from '../hooks/useSmoothScroll';

export default function Contact() {
  const { t } = useLang();
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__grid">
          <div className="contact__copy">
            <SectionHeading number="07" id="contact-title" title={t.contact.title} />
            <ul className="links">
              {t.contact.links.map((link) => <li key={link.label}><a className="link" href={link.href} target="_blank" rel="noopener noreferrer"><span className="link__label">{link.label}</span><span className="link__value">{link.value}</span><span className="link__arrow"><Icon name="external" /></span></a></li>)}
            </ul>
          </div>
          <figure className="contact__art"><img src="/media/wave.webp" alt={t.contact.imageAlt} width="372" height="1164" loading="lazy" /></figure>
        </div>
        <p className="motto">{t.contact.motto}</p>
        <footer className="foot">
          <button type="button" className="foot__top" onClick={scrollToTop}>{t.controls.backToTop}<Icon name="up" /></button>
          <span className="foot__copy">© {new Date().getFullYear()} Seimo · BI6PCR</span>
        </footer>
      </div>
    </section>
  );
}
