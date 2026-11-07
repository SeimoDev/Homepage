import { useEffect, useState } from 'react';

// Keep the semantic wrapper used by sections, without per-card entrance motion.
export function Reveal({ as: Tag = 'div', delay, className = '', children, ...rest }) {
  return <Tag className={className || undefined} {...rest}>{children}</Tag>;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = (event) => setMatches(event.matches);
    setMatches(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}
