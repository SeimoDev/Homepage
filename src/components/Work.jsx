import { useLang } from '../i18n';
import SectionHeading from './SectionHeading';
import GitHubProjects from './GitHubProjects';

export default function Work() {
  const { t } = useLang();
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHeading number="02" id="work-title" title={t.work.title} />
        <div className="work__grid">
          <div className="work__col">
            <p className="work__body">{t.work.body}</p>
            <p className="work__body work__body--muted">{t.work.body2}</p>
            <div className="work__tags">{t.work.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="work__card"><GitHubProjects /></div>
          </div>
          <figure className="work__art"><img src="/media/desk.webp" alt={t.work.imageAlt} width="564" height="805" loading="lazy" /></figure>
        </div>
      </div>
    </section>
  );
}
