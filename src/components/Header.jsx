import React from "react";

export default function Header({ page, onNavigate }) {
  return (
    <div className="header" role="banner" aria-label="ClearPath AI Header">
      <div className="brand">
        <div className="logo" aria-hidden="true">CP</div>
        <div className="title">
          <h1>ClearPath AI</h1>
          <p>Indoor accessibility navigation (beginner MVP)</p>
        </div>
      </div>

      <div className="nav" role="navigation" aria-label="Main navigation">
        <button onClick={() => onNavigate("home")} aria-current={page === "home"}>
          Home
        </button>
        <button onClick={() => onNavigate("navigate")} aria-current={page === "navigate"}>
          Navigate
        </button>
        <button onClick={() => onNavigate("scan")} aria-current={page === "scan"}>
          Scan
        </button>
        <button onClick={() => onNavigate("reports")} aria-current={page === "reports"}>
          Reports
        </button>
        <button onClick={() => onNavigate("settings")} aria-current={page === "settings"}>
          Settings
        </button>
      </div>
    </div>
  );
}
