import React from "react";

export default function UserProfile() {
  return (
    <div className="UserProfile">
      <div className="User">
        <div className="name">Jack Oliver</div>
        <div className="image">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/profile/profile-512_1.jpg"
            alt="User"
          />
        </div>
      </div>

      <div className="UserProfile-menu">
        <div className="UserProfileSwitch">
          <ul>
            <li>
              <div className="UserProfile-image">
                <img src="http://lorempixel.com/96/96" alt="Profile" />
              </div>
              <div className="UserProfile-name">Alexander</div>
            </li>

            <li>
              <div className="UserProfile-image">
                <img src="http://lorempixel.com/96/96" alt="Profile" />
              </div>
              <div className="UserProfile-name">Mattias</div>
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
