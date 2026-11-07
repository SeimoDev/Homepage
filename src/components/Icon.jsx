const paths = {
  down: 'M8 2v12M3 9l5 5 5-5',
  up: 'M8 14V2M3 7l5-5 5 5',
  external: 'M4 12 12 4M4 4h8v8',
  left: 'm10 3-5 5 5 5',
  right: 'm6 3 5 5-5 5',
  play: 'm5 3 7 5-7 5Z',
  pause: 'M5 3v10M11 3v10',
  menu: 'M2 4h12M2 8h12M2 12h12',
  close: 'm3 3 10 10M13 3 3 13',
  check: 'm3 8 3 3 7-7',
  star: 'm8 1 2.1 4.3 4.8.7-3.5 3.4.8 4.8L8 12l-4.2 2.2.8-4.8L1.1 6l4.8-.7Z',
};

export default function Icon({ name, size = 16 }) {
  return (
    <svg className="icon" viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === 'globe' ? <><circle cx="8" cy="8" r="6" /><path d="M2 8h12M8 2c3 3 3 9 0 12-3-3-3-9 0-12Z" /></> : <path d={paths[name]} />}
    </svg>
  );
}
