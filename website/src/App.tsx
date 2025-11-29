import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import HistoricalFigures from './components/HistoricalFigures';
import TrailerShowcase from './components/TrailerShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <main>
      <Navbar />
      <Hero />

      <Experience />

      <HistoricalFigures />
      <TrailerShowcase />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
