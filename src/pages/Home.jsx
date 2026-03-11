import React from "react";
import CardButton from "../components/CardButton.jsx";

export default function Home({ onGo }) {
  return (
    <div className="grid" aria-label="Home actions">
      <CardButton
        title="Start Navigation"
        desc="Find an accessible route (avoids stairs by default)."
        onClick={() => onGo("navigate")}
      />
      <CardButton
        title="Scan for Obstacles"
        desc="Demo obstacle alerts (voice + quick buttons)."
        onClick={() => onGo("scan")}
      />
      <CardButton
        title="Accessibility Reports"
        desc="View and submit community accessibility updates."
        onClick={() => onGo("reports")}
      />
      <CardButton
        title="Settings"
        desc="Adjust voice guidance speed and preferences."
        onClick={() => onGo("settings")}
      />
    </div>
  );
}
