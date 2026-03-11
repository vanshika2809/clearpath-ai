import React, { useState } from "react";
import { speak, stopSpeaking } from "../utils/tts.js";

export default function Scan() {
  const [status, setStatus] = useState("Ready to scan.");

  function alertObstacle(type) {
    const msg =
      type === "stairs"
        ? "Stairs ahead. Accessible route recommended."
        : type === "blocked"
        ? "Obstacle detected. Path may be blocked."
        : "Caution. Narrow path ahead.";

    setStatus(msg);
    speak(msg);
  }

  return (
    <div className="section" aria-label="Scan for obstacles">
      <h2 style={{ marginTop: 0 }}>Scan for Obstacles (Demo)</h2>
      <p className="small">
        Beginner MVP: This page simulates obstacle detection. In a full version, a
        camera model (Vision API) would detect obstacles automatically.
      </p>

      <div className="badge warn" style={{ marginTop: 10 }}>
        Status: {status}
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => alertObstacle("blocked")}>
          🚧 Obstacle
        </button>
        <button className="btn" onClick={() => alertObstacle("stairs")}>
          🧗 Stairs
        </button>
        <button className="btn" onClick={() => alertObstacle("narrow")}>
          ↔️ Narrow Path
        </button>
        <button className="btn secondary" onClick={() => { setStatus("Ready to scan."); stopSpeaking(); }}>
          Reset
        </button>
      </div>

      <div className="section" style={{ marginTop: 14 }}>
        <h3 style={{ marginTop: 0 }}>How to demo this</h3>
        <ol className="small">
          <li>Click “Obstacle” to simulate a blocked hallway.</li>
          <li>Click “Stairs” to show why step-free routing matters.</li>
          <li>Click “Narrow Path” to simulate accessibility constraints.</li>
        </ol>
      </div>
    </div>
  );
}
