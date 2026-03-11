import React, { useMemo, useState } from "react";
import { NODES, EDGES } from "../data/buildingMap.js";
import { shortestAccessiblePath } from "../utils/routing.js";
import { speak, stopSpeaking } from "../utils/tts.js";

function nodeLabel(id) {
  return NODES.find((n) => n.id === id)?.label || id;
}

export default function Navigate() {
  const [start, setStart] = useState("entrance");
  const [goal, setGoal] = useState("room210");
  const [avoidStairs, setAvoidStairs] = useState(true);

  const result = useMemo(() => {
    return shortestAccessiblePath(NODES, EDGES, start, goal, avoidStairs);
  }, [start, goal, avoidStairs]);

  const instructions = useMemo(() => {
    if (!result.reachable) return [];
    const steps = [];
    for (const e of result.path) {
      const dir =
        e.type === "stairs"
          ? "Use stairs"
          : e.to.includes("elevator")
          ? "Go to the elevator"
          : "Continue to";
      steps.push(`${dir} ${nodeLabel(e.to)} (${e.d}m).`);
    }
    if (steps.length === 0) steps.push("You are already at the destination.");
    return steps;
  }, [result]);

  function speakRoute() {
    if (!instructions.length) return;
    speak(`Starting navigation from ${nodeLabel(start)} to ${nodeLabel(goal)}.`);
    instructions.forEach((s, i) => {
      setTimeout(() => speak(`Step ${i + 1}. ${s}`), 700 * (i + 1));
    });
  }

  return (
    <div className="section" aria-label="Navigation">
      <h2 style={{ marginTop: 0 }}>Accessible Navigation</h2>
      <p className="small">
        This demo uses a small sample building map and a simple accessibility-weighted
        routing algorithm.
      </p>

      <div className="row">
        <div style={{ minWidth: 240 }}>
          <label className="small">Start</label>
          <select value={start} onChange={(e) => setStart(e.target.value)}>
            {NODES.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: 240 }}>
          <label className="small">Destination</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            {NODES.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        <label className="badge warn" style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={avoidStairs}
            onChange={(e) => setAvoidStairs(e.target.checked)}
            style={{ transform: "scale(1.2)" }}
          />
          Avoid stairs (recommended)
        </label>

        <button className="btn" onClick={speakRoute}>
          🔊 Speak route
        </button>

        <button className="btn secondary" onClick={stopSpeaking}>
          ⏹ Stop voice
        </button>
      </div>

      <hr style={{ margin: "16px 0", borderColor: "rgba(255,255,255,0.08)" }} />

      {!result.reachable ? (
        <div className="badge danger">No route found in demo map.</div>
      ) : (
        <>
          <div className="badge ok">Route found</div>
          <ul className="list">
            {instructions.map((s, idx) => (
              <li className="item" key={idx}>
                <strong>Step {idx + 1}:</strong> {s}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="section" style={{ marginTop: 14 }}>
        <h3 style={{ marginTop: 0 }}>Demo Map Notes</h3>
        <p className="small">
          In a real product, indoor positioning can use beacons/QR markers and building
          floor plans. This MVP focuses on accessibility-first routing + voice guidance.
        </p>
      </div>
    </div>
  );
}
