import React, { useState, useEffect, useRef } from "react";

export default function UserProfile() {
  const initial = [
    {
      name: "Jack Oliver",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/profile/profile-512_1.jpg",
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

  const [profiles, setProfiles] = useState(() => {
    try {
      const stored = localStorage.getItem("nc_profiles");
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const i = localStorage.getItem("nc_current");
      return i ? Number(i) : 0;
    } catch {
      return 0;
    }
  });
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("nc_profiles", JSON.stringify(profiles));
    } catch {}
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem("nc_current", String(currentIndex));
    } catch {}
  }, [currentIndex]);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function handleSelect(i) {
    setCurrentIndex(i);
    setOpen(false);
  }

  function handleAdd() {
    const name = prompt("Profile name:");
    if (!name) return;
    const img =
      prompt("Image URL (leave blank to use generated avatar):") ||
      `https://i.pravatar.cc/96?u=${Date.now()}`;
    setProfiles((p) => [...p, { name, img }]);
    setCurrentIndex(profiles.length); // new index
    setOpen(false);
  }

  return (
    <div className={`UserProfile ${open ? "open" : ""}`} ref={ref}>
      <div
        className="User"
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="name">{profiles[currentIndex]?.name || "Profile"}</div>
        <div className="image">
          <img
            src={profiles[currentIndex]?.img || "https://i.pravatar.cc/96"}
            alt={profiles[currentIndex]?.name || "Profile"}
          />
        </div>
      </div>

      <div className="UserProfile-menu" style={{ display: open ? "block" : "none" }}>
        <div className="UserProfileSwitch">
          <ul>
            {profiles.map((p, i) => (
              <li key={i} onClick={() => handleSelect(i)} role="button" tabIndex={0}>
                <div className="UserProfile-image">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="UserProfile-name">{p.name}</div>
              </li>
            ))}
            <li onClick={handleAdd} role="button" tabIndex={0} style={{ cursor: "pointer" }}>
              <div className="UserProfile-image">
                <img src="https://via.placeholder.com/96?text=+" alt="Add" />
              </div>
              <div className="UserProfile-name">Add profile</div>
            </li>
          </ul>
        </div>

        <div className="UserNavigation">
          <ul>
            <li>Your Account</li>
            <li>Help Center</li>
            <li>Sign out of Netflix</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
