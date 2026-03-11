// routing: Dijkstra with accessibility weights.
// Weight = distance + penalty based on edge type.
// If avoidStairs=true, stairs get a big penalty.

export function buildAdjacency(nodes, edges) {
  const adj = new Map();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    adj.get(e.from)?.push(e);
    // undirected for demo
    adj.get(e.to)?.push({ from: e.to, to: e.from, d: e.d, type: e.type });
  });
  return adj;
}

export function shortestAccessiblePath(nodes, edges, start, goal, avoidStairs) {
  const adj = buildAdjacency(nodes, edges);

  const dist = {};
  const prev = {};
  const visited = new Set();

  nodes.forEach((n) => {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });
  dist[start] = 0;

  function penalty(edge) {
    if (edge.type === "stairs") return avoidStairs ? 1000 : 30;
    if (edge.type === "narrow") return 20;
    return 0;
  }

  while (true) {
    // pick unvisited node with smallest dist
    let u = null;
    let best = Infinity;
    for (const id of Object.keys(dist)) {
      if (!visited.has(id) && dist[id] < best) {
        best = dist[id];
        u = id;
      }
    }
    if (u === null) break;
    if (u === goal) break;

    visited.add(u);
    const neighbors = adj.get(u) || [];
    for (const edge of neighbors) {
      const alt = dist[u] + edge.d + penalty(edge);
      if (alt < dist[edge.to]) {
        dist[edge.to] = alt;
        prev[edge.to] = { from: u, edge };
      }
    }
  }

  // rebuild path
  const path = [];
  let cur = goal;
  while (cur && cur !== start) {
    const p = prev[cur];
    if (!p) break;
    path.push(p.edge);
    cur = p.from;
  }
  path.reverse();

  const reachable = path.length > 0 || start === goal;
  return { reachable, path };
}
