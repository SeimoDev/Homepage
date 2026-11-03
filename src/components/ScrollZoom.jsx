import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Scroll-linked zoom for artwork.
 *
 * The element's own position in the viewport drives a spring-damped scale, so
 * the figure "pushes in" as it travels through the reader's field of view and
 * relaxes again on the way out. Transform origin can be pinned to keep the
 * character planted on their feet while the frame grows around them.
 */
export default function ScrollZoom({
  children,
  className = '',
  from = 0.9,
  to = 1.04,
  peakAt = 0.5,
  offset = ['start end', 'end start'],
  origin = '50% 100%',
  as = 'div',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset });

  const raw = useTransform(
    scrollYProgress,
    [0, peakAt, 1],
    reduce ? [1, 1, 1] : [from, to, from + (to - from) * 0.35]
  );
  const scale = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.4 });

  const Comp = as === 'figure' ? motion.figure : motion.div;

  return (
    <Comp ref={ref} className={className} style={{ ...style, scale, transformOrigin: origin }} {...rest}>
      {children}
    </Comp>
  );
}
