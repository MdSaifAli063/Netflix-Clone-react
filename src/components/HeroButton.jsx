import React from "react";

export default function HeroButton({ primary, text, icon, onClick }) {
  return (
    <button
      className="Button"
      data-primary={primary}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {text}
    </button>
  );
}