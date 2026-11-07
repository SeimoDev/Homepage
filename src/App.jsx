import Nav from './components/Nav';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Work from './components/Work';
import Stack from './components/Stack';
import Path from './components/Path';
import Method from './components/Method';
import Life from './components/Life';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="shell">
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Work />
        <Stack />
        <Path />
        <Method />
        <Life />
        <Contact />
      </main>
    </div>
  );
}
