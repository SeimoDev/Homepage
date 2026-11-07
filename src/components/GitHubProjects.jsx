import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useLang } from '../i18n';
import projectConfig from '../../projects.config.json';
import projectData from '../data/projects.json';
import { selectProjects } from '../lib/projects';
import { useMediaQuery } from './Reveal';
import Icon from './Icon';

const repositories = selectProjects(projectConfig.repositories, projectData.repositories);

export default function GitHubProjects() {
  const { lang, t } = useLang();
  const copy = t.work.repositories;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const region = useRef(null);
  const track = useRef(null);
  const visible = useInView(region, { amount: 0.25 });
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');

  function scrollTo(index) {
    const el = track.current;
    if (!el?.children[index]) return;
    el.scrollTo({
      left: el.children[index].offsetLeft - el.children[0].offsetLeft,
      behavior: reduce ? 'instant' : 'smooth',
    });
  }

  useEffect(() => {
    if (reduce || paused || hovered || focused || !visible || repositories.length < 2) return;
    const timer = setInterval(() => {
      if (!document.hidden) scrollTo((active + 1) % repositories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active, repositories.length, reduce, paused, hovered, focused, visible]);

  function syncActive() {
    const el = track.current;
    if (!el?.children.length) return;
    const first = el.children[0].offsetLeft;
    let closest = 0;
    for (let i = 1; i < el.children.length; i += 1) {
      if (Math.abs(el.children[i].offsetLeft - first - el.scrollLeft) <
          Math.abs(el.children[closest].offsetLeft - first - el.scrollLeft)) closest = i;
    }
    setActive(closest);
  }

  return (
    <div
      className="repos"
      ref={region}
      role="region"
      aria-labelledby="repos-title"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="repos__head">
        <h3 className="repos__label" id="repos-title">
          {t.work.cardLabel}
        </h3>
        <a className="repos__source" href={projectConfig.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub <Icon name="external" />
        </a>
      </div>
      {repositories.length === 0 && <p className="repos__status repos__status--empty">{copy.empty}</p>}

      {repositories.length > 0 && (
        <>
          <div className="repos__track" id="repos-track" ref={track} role="list" onScroll={syncActive}>
            {repositories.map((repo) => (
              <article className="repo-card" role="listitem" key={repo.sourceUrl}>
                <a className="repo-card__link" href={repo.url} target="_blank" rel="noopener noreferrer">
                  <span className="repo-card__owner">{repo.owner}</span>
                  <h4 className="repo-card__title">{repo.name}<Icon name="external" /></h4>
                  <p className="repo-card__description">{repo.description?.replace(/\p{Extended_Pictographic}[\uFE0F\u200D]*/gu, '').replace(/[\uFE0F\u200D]/g, '').replace(/\s+/g, ' ').trim() || (repo.metadataUnavailable ? copy.viewRepository : copy.noDescription)}</p>
                  <div className="repo-card__meta">
                    {repo.language && <span>{repo.language}</span>}
                    {Number.isFinite(repo.stars) && <span className="repo-card__stars" aria-label={`${copy.stars}: ${repo.stars}`}><Icon name="star" />{repo.stars.toLocaleString(lang)}</span>}
                    {repo.pushedAt && <time dateTime={repo.pushedAt} title={copy.updated}>
                      {new Date(repo.pushedAt).toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>}
                  </div>
                </a>
              </article>
            ))}
          </div>
          <div className="repos__controls">
            <span className="repos__count" aria-live="off">{String(active + 1).padStart(2, '0')} <span>/ {String(repositories.length).padStart(2, '0')}</span></span>
            <div className="repos__buttons">
              {!reduce && repositories.length > 1 && (
                <button type="button" className="repos__control" aria-label={paused ? copy.play : copy.pause} aria-controls="repos-track" onClick={() => setPaused((value) => !value)}>
                  <Icon name={paused ? 'play' : 'pause'} />
                </button>
              )}
              <button type="button" className="repos__control" aria-label={copy.previous} aria-controls="repos-track" disabled={repositories.length < 2} onClick={() => scrollTo((active - 1 + repositories.length) % repositories.length)}>
                <Icon name="left" />
              </button>
              <button type="button" className="repos__control" aria-label={copy.next} aria-controls="repos-track" disabled={repositories.length < 2} onClick={() => scrollTo((active + 1) % repositories.length)}>
                <Icon name="right" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
