import React from "react";

export default function HeroButton({ primary, text }) {
  return (
    <a href="#" className="Button" data-primary={primary}>
      {text}
    </a>
  );
}
