import { useMemo } from 'react';

const SNOWFLAKE_COUNT = 100;

function SnowOverlay() {
  const flakes = useMemo(
    () =>
      Array.from({ length: SNOWFLAKE_COUNT }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        opacity: Math.random(),
        scale: Math.random() * 1.2,
      })),
    [],
  );

  return (
    <div className="snow">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}vw`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: flake.opacity,
            transform: `scale(${flake.scale})`,
          }}
        />
      ))}
    </div>
  );
}

export default SnowOverlay;
