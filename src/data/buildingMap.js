// A tiny demo indoor map graph.
// Nodes: entrances, hallways, elevator, stairs, rooms.
// Edges include accessibility metadata.

export const NODES = [
  { id: "entrance", label: "Main Entrance" },
  { id: "hallA", label: "Hallway A" },
  { id: "elevator1", label: "Elevator" },
  { id: "stairs1", label: "Stairs" },
  { id: "hallB", label: "Hallway B" },
  { id: "room210", label: "Room 210" },
  { id: "restroom", label: "Accessible Restroom" },
];

export const EDGES = [
  // from, to, distanceMeters, type
  { from: "entrance", to: "hallA", d: 25, type: "accessible" },
  { from: "hallA", to: "elevator1", d: 18, type: "accessible" },
  { from: "hallA", to: "stairs1", d: 10, type: "stairs" },
  { from: "elevator1", to: "hallB", d: 12, type: "accessible" },
  { from: "stairs1", to: "hallB", d: 8, type: "stairs" },
  { from: "hallB", to: "room210", d: 20, type: "accessible" },
  { from: "hallB", to: "restroom", d: 15, type: "accessible" },
];
