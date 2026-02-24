import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const lines = [
  "Stay focused.",
  "Keep going.",
  "You're closer than you think.",
  "Discipline beats motivation.",
  "Small progress is still progress."
];

function getShuffledIndices(excludeIndex) {
  const indices = lines.map((_, i) => i).filter(i => i !== excludeIndex);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

function App() {
  const [randomLine, setRandomLine] = useState("");
  const [visible, setVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef(null);
  const queueRef = useRef([]);
  const previousIndexRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClick = () => {
    if (isTransitioning) return;

    if (queueRef.current.length === 0) {
      queueRef.current = getShuffledIndices(previousIndexRef.current);
    }

    const nextIndex = queueRef.current.pop();
    previousIndexRef.current = nextIndex;

    setIsTransitioning(true);
    setHasStarted(true);
    setVisible(false);

    timerRef.current = setTimeout(() => {
      setRandomLine(lines[nextIndex]);
      setVisible(true);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={handleClick} disabled={isTransitioning} className="inspire-button">
        {hasStarted ? "Next Quote" : "Inspire Me"}
      </button>
      {randomLine && (
        <p
          className={`fade-text ${visible ? "show" : ""}`}
          aria-live="polite"
        >
          {randomLine}
        </p>
      )}
    </div>
  );
}

export default App;