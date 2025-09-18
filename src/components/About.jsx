import { useRef } from 'react';
import VariableProximity from './VariableProximity.jsx';

function About() {
  const textRef = useRef(null);

  return (
    <section id="about">
      <h2>About Me</h2>
      <p ref={textRef}>
        <VariableProximity
          label="I'm a recent Computer Science graduate from the University of Sussex. I have experience in Java, Python, and cloud platforms like AWS and Azure."
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 900, 'opsz' 40"
          containerRef={textRef}
          radius={140}
          falloff="linear"
          className="about-variable-text"
          style={{ display: 'inline-block', fontSize: '1.1rem', lineHeight: 1.7 }}
        />
      </p>
    </section>
  );
}

export default About;
