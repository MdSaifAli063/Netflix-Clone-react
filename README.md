# 🎬 Netflix Clone (React)

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/react-v18-blue) ![TMDB API](https://img.shields.io/badge/TMDB-API-required-yellow)

A lightweight, responsive Netflix-style UI built with React. Browse discover lists, search TMDB, switch user profiles and enjoy Netflix-like navigation and footer components.

---

## ✨ Features

- Header with logo, navigation, search and profile menu
- Hero section with CTA buttons
- Title lists fetched from TMDB (discover + search)
- Responsive Item tiles with overlay and list toggle
- User profiles persisted in localStorage (add/switch)
- Footer with links and language selector
- Safe fallbacks for missing images/data and keyboard accessibility

## 📸 Preview

Quick local preview

- Start the dev server:
  ```
  npm run dev
  # or
  npm start
  ```
- Open the app at the URL shown by your dev server (commonly http://localhost:3000).

Screenshots

- Homepage / Hero
  ![Homepage preview](https://via.placeholder.com/1000x360?text=Netflix+Clone+Home)
- Search results
  ![Search preview](https://via.placeholder.com/1000x360?text=Search+Results+Preview)
- Profile menu
  ![Profile preview](https://via.placeholder.com/420x240?text=Profile+Menu)

GIF demo

- Short demo (placeholder GIF):  
  ![Demo GIF](https://via.placeholder.com/900x300?text=Demo+GIF+Placeholder)

How to preview a title in the app

1. Use the search box in the header to find a movie or TV show (the app queries TMDB).
2. Hover any Item tile to reveal its overlay (title, rating, plot).
3. Click the circular ListToggle (top-right of the tile) to toggle the quick action state.
4. Switch user profiles from the top-right profile menu to see profile persistence.

Notes

- The images above are placeholders — replace them with real screenshots or GIFs from your local runs or hosted demo.
- If you want, I can add a small "Preview" component in-app that opens a modal with larger artwork and details for a clicked Item.

## 🔧 Prerequisites

- Node.js >= 14
- npm or yarn
- TMDB API Key (https://www.themoviedb.org/)

## 🚀 Quick start

1. Clone the repo:
   ```
   git clone <your-repo-url>
   cd "d:\Netflix Clone React\Netflix-clone"
   ```
2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```
3. Configure TMDB API key:

   - Preferred: create a `.env` in project root:
     ```
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
     ```
   - Update App.jsx to read the env variable (replace the hard-coded key):
     ```js
     const apiKey = process.env.REACT_APP_TMDB_API_KEY || "<fallback_key>";
     ```
   - Restart the dev server after adding `.env`.

4. Run the app:
   ```
   npm run dev
   # or
   npm start
   ```

## 🗂 Important files

- src/App.jsx — main layout, search handler, footer
- src/components/Header.jsx — logo, nav, search, profile
- src/components/TitleList.jsx — TMDB fetch + Item rendering
- src/components/Item.jsx — tile, overlay, ListToggle
- src/components/UserProfile.jsx — profile menu & persistence
- src/App.css, src/index.css — styling

## 🛠 Notes

- TitleList appends the `api_key` to requests; ensure the API key is valid.
- For production, avoid embedding API keys in client-side code — use env variables or a server-side proxy.
- The profile menu stores profiles in localStorage keys: `nc_profiles` and `nc_current`.

## ♿ Accessibility

- Navigation and profile controls are keyboard accessible.
- Buttons include ARIA attributes where applicable.

## 🤝 Contributing

Contributions welcome. Open an issue or submit a PR. Keep changes focused and document major changes in the PR.

## 📄 License

MIT

---

If you'd like, I can:

- Wire the environment variable into App.jsx for you,
- Split Footer and UserProfile into separate components,
- Add a demo GIF or deploy instructions.
