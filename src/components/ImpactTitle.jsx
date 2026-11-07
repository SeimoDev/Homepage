export default function ImpactTitle({ lines, id, className = 'sec-title' }) {
  return (
    <h2 id={id} className={className} tabIndex={-1}>
      {lines.filter(Boolean).map((line) => <span className="sec-title__line" key={line}>{line}</span>)}
    </h2>
  );
}
