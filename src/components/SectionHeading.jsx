import ImpactTitle from './ImpactTitle';

export default function SectionHeading({ number, id, title }) {
  return (
    <div className="sec-head">
      <span className="section-index" aria-hidden="true">{number}</span>
      <ImpactTitle id={id} lines={[title]} />
    </div>
  );
}
