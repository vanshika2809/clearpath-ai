import React, { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Navigate from "./pages/Navigate.jsx";
import Scan from "./pages/Scan.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  const [page, setPage] = useState("home");

  const Page = useMemo(() => {
    switch (page) {
      case "navigate":
        return <Navigate />;
      case "scan":
        return <Scan />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Home onGo={setPage} />;
    }
  }, [page]);

  return (
    <div className="container">
      <Header page={page} onNavigate={setPage} />
      {Page}
      <div className="section" style={{ marginBottom: 20 }}>
        <div className="small">
          Tip: This is an MVP demo. For a full version, add real indoor maps + beacon
          positioning + verified building data.
        </div>
      </div>
    </div>
  );
}
