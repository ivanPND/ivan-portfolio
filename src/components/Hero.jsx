import { useEffect, useRef } from 'react';
import BlurText from './BlurText.jsx';

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) {
      return;
    }

    const handleScroll = () => {
      const heroHeight = heroElement.offsetHeight;
      if (window.scrollY > heroHeight * 0.6) {
        heroElement.classList.add('fade-out');
      } else {
        heroElement.classList.remove('fade-out');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-content">
        <div className="scroll-cue">v</div>
        <BlurText as="h1" text="Hello, I'm Ivan Teixeira" className="hero-heading cursor-target" delay={120} />
        <BlurText
          as="p"
          text="Computer Science Graduate | Developer | Innovator"
          className="hero-subtitle cursor-target"
          delay={90}
        />
      </div>
    </section>
  );
}

export default Hero;
