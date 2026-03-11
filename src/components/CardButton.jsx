import React from "react";

export default function CardButton({ title, desc, onClick }) {
  return (
    <button className="cardBtn" onClick={onClick} aria-label={title}>
      <h2>{title}</h2>
      <p>{desc}</p>
    </button>
  );
}
