import React, { useState, useEffect, useRef } from "react";

const DEFAULT_PROFILES = [
  {
    name: "Jack Oliver",
    img: "https://i.pravatar.cc/96?u=jack",
  },
  {
    name: "Alexander",
    img: "https://i.pravatar.cc/96?u=alex",
  },
  {
    name: "Mattias",
    img: "https://i.pravatar.cc/96?u=mattias",
  },
];

export default function UserProfile() {
  const [profiles, setProfiles] = useState(DEFAULT_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleSelect(i) {
    setCurrentIndex(i);
    setOpen(false);
  }

  function handleAddProfile() {
    const name = prompt("Enter profile name:");
    if (!name) return;
    const img = `https://i.pravatar.cc/96?u=${Date.now()}`;
    setProfiles((prev) => [...prev, { name, img }]);
    setCurrentIndex(profiles.length);
    setOpen(false);
  }

  const current = profiles[currentIndex];

  return (
    <div
      className={`UserProfile ${open ? "open" : ""}`}
      ref={ref}
    >
      {/* Current user trigger */}
      <div
        className="User"
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
        }}
      >
        <div className="image">
          <img
            src={current?.img || "https://i.pravatar.cc/96"}
            alt={current?.name || "Profile"}
          />
        </div>
        <span className="caret">▾</span>
      </div>

      {/* Dropdown menu */}
      <div className="UserProfile-menu">

        {/* Profile switcher */}
        <div className="UserProfileSwitch">
          {profiles.map((p, i) => (
            <div
              key={i}
              className="UserProfile-menu-item"
              onClick={() => handleSelect(i)}
              role="button"
              tabIndex={0}
            >
              <img src={p.img} alt={p.name} />
              <span>{p.name}</span>
            </div>
          ))}
          <div
            className="UserProfile-menu-item"
            onClick={handleAddProfile}
            role="button"
            tabIndex={0}
          >
            <img
              src="https://via.placeholder.com/28?text=%2B"
              alt="Add profile"
            />
            <span>Add Profile</span>
          </div>
        </div>

        <hr className="UserProfile-menu-divider" />

        {/* User navigation */}
        <div className="UserNavigation">
          <div className="UserProfile-menu-item">Manage Profiles</div>
          <div className="UserProfile-menu-item">Account</div>
          <div className="UserProfile-menu-item">Help Center</div>
        </div>

        <hr className="UserProfile-menu-divider" />
        <div
          className="UserProfile-menu-item"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
}