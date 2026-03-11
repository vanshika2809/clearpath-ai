import React, { useState } from "react";
import { startListening } from "../utils/stt.js";
import { speak, stopSpeaking } from "../utils/tts.js";

export default function Settings() {
  const [demoText, setDemoText] = useState("Welcome to ClearPath AI.");
  const [msg, setMsg] = useState("");

  function testVoice() {
    const ok = speak(demoText);
    if (!ok) setMsg("Text-to-Speech is not supported in this browser.");
    else setMsg("Playing voice demo.");
  }

  function voiceInput() {
    setMsg("Listening...");
    startListening({
      onText: (t) => {
        setDemoText(t);
        setMsg("Got it! Updated demo text from voice.");
      },
      onError: (e) => setMsg(e),
    });
  }

  return (
    <div className="section" aria-label="Settings">
      <h2 style={{ marginTop: 0 }}>Settings</h2>
      <p className="small">
        This MVP focuses on accessibility basics: clear UI + voice support.
      </p>

      <div style={{ marginTop: 10 }}>
        <label className="small">Voice demo text</label>
        <input
          value={demoText}
          onChange={(e) => setDemoText(e.target.value)}
          placeholder="Type something for voice guidance..."
        />
      </div>

      <div className="row" style={{ marginTop: 10 }}>
        <button className="btn" onClick={testVoice}>
          🔊 Test voice
        </button>
        <button className="btn" onClick={voiceInput}>
          🎤 Speak to type
        </button>
        <button className="btn secondary" onClick={stopSpeaking}>
          ⏹ Stop
        </button>
      </div>

      {msg ? (
        <div className="badge warn" style={{ marginTop: 12 }}>
          {msg}
        </div>
      ) : null}

      <div className="section" style={{ marginTop: 14 }}>
        <h3 style={{ marginTop: 0 }}>Accessibility Tips</h3>
        <ul className="small">
          <li>Use high contrast and large text.</li>
          <li>Keep screens simple and focused.</li>
          <li>Provide voice guidance and keyboard-friendly controls.</li>
        </ul>
      </div>
    </div>
  );
}
