import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Lines } from './Reveal';

/**
 * A section heading that responds to scroll.
 *
 * The block settles in with a small scale-down "impact" (spring-damped, so it
 * carries a hint of overshoot), while the two lines slide through the weight
 * axis of the variable font: the first line firms up toward semibold, the
 * second stays airy. Both weights are exposed as CSS custom properties so the
 * line-level contrast is preserved instead of collapsing to one weight.
 */
export default function ImpactTitle({
  lines,
  id,
  className = 'sec-title',
  heavy = [300, 620],
  light = [120, 300],
  scaleFrom = 1.05,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.4'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : scaleFrom, 1]);
  const scale = useSpring(rawScale, { stiffness: 130, damping: 24, mass: 0.35 });

  const w1 = useTransform(scrollYProgress, [0, 1], heavy);
  const w2 = useTransform(scrollYProgress, [0, 1], light);
  const weight1 = useTransform(w1, (v) => String(Math.round(v)));
  const weight2 = useTransform(w2, (v) => String(Math.round(v)));

  return (
    <motion.h2
      ref={ref}
      id={id}
      className={className}
      style={{
        scale,
        transformOrigin: 'left center',
        '--w1': reduce ? String(heavy[1]) : weight1,
        '--w2': reduce ? String(light[1]) : weight2,
      }}
    >
      <Lines lines={lines} className="sec-title__lines" />
    </motion.h2>
  );
}
