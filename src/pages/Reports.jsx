import React, { useMemo, useState } from "react";
import { loadReports, saveReports } from "../utils/storage.js";

function nowISO() {
  return new Date().toISOString();
}

export default function Reports() {
  const [reports, setReports] = useState(loadReports());
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Elevator out of service");
  const [notes, setNotes] = useState("");

  const sorted = useMemo(() => {
    return [...reports].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [reports]);

  function addReport() {
    if (!title.trim() || !location.trim()) return;

    const r = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
      title: title.trim(),
      location: location.trim(),
      type,
      notes: notes.trim(),
      createdAt: nowISO(),
      verified: false,
    };

    const next = [r, ...reports];
    setReports(next);
    saveReports(next);

    setTitle("");
    setLocation("");
    setNotes("");
  }

  function toggleVerify(id) {
    const next = reports.map((r) =>
      r.id === id ? { ...r, verified: !r.verified } : r
    );
    setReports(next);
    saveReports(next);
  }

  function removeReport(id) {
    const next = reports.filter((r) => r.id !== id);
    setReports(next);
    saveReports(next);
  }

  return (
    <div className="section" aria-label="Accessibility reports">
      <h2 style={{ marginTop: 0 }}>Accessibility Reports</h2>
      <p className="small">
        Community updates help users avoid broken elevators, blocked ramps, and temporary
        obstacles.
      </p>

      <div className="section" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>Submit a report</h3>

        <div className="row">
          <div style={{ flex: 1, minWidth: 240 }}>
            <label className="small">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Ramp blocked near Library"
            />
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <label className="small">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Building A, 1st floor"
            />
          </div>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <label className="small">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Elevator out of service</option>
              <option>Ramp blocked</option>
              <option>Construction / obstacle</option>
              <option>Door too narrow</option>
              <option>Signage not accessible</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <label className="small">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add helpful details for other users..."
          />
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn" onClick={addReport}>
            ➕ Submit Report
          </button>
          <span className="small">Reports save in your browser (localStorage).</span>
        </div>
      </div>

      <div className="section" style={{ marginTop: 12 }}>
        <h3 style={{ marginTop: 0 }}>Recent reports</h3>
        {sorted.length === 0 ? (
          <div className="badge warn">No reports yet. Add the first one!</div>
        ) : (
          <ul className="list">
            {sorted.map((r) => (
              <li className="item" key={r.id}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div>
                    <strong>{r.title}</strong>
                    <div className="small">
                      {r.type} • {r.location}
                    </div>
                    {r.notes ? <div className="small">{r.notes}</div> : null}
                    <div className="small">
                      {new Date(r.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="row">
                    <span className={`badge ${r.verified ? "ok" : "warn"}`}>
                      {r.verified ? "Verified" : "Unverified"}
                    </span>
                    <button className="btn secondary" onClick={() => toggleVerify(r.id)}>
                      Toggle verify
                    </button>
                    <button className="btn secondary" onClick={() => removeReport(r.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
