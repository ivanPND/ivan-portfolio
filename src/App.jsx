import TopNav from './components/TopNav.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SnowOverlay from './components/SnowOverlay.jsx';
import TargetCursor from './components/TargetCursor.jsx';
import { projects } from './data/projects.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <TargetCursor />
      <SnowOverlay />
      <TopNav />
      <main>
        <Hero />
        <Projects items={projects} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
