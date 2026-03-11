const KEY = "clearpath_reports_v1";

export function loadReports() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReports(reports) {
  localStorage.setItem(KEY, JSON.stringify(reports));
}
