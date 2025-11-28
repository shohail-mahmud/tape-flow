# TapeFlow 🎵

A retro-inspired YouTube audio player with a vintage cassette tape aesthetic. Stream YouTube audio or play local files with beautiful themes and smooth animations.

![TapeFlow](https://img.shields.io/badge/Built%20with-React%20%26%20TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎬 **YouTube Audio Streaming** - Stream audio from YouTube using privacy-focused APIs (Piped/Invidious)
- 📁 **Local File Support** - Play MP3, WAV, OGG, FLAC, and M4A files
- 🎨 **5 Beautiful Themes** - Dark, Light, Sunset, Ocean, and Forest
- 📝 **Playlist Management** - Create and manage your audio playlists
- ⬇️ **Download Tracks** - Save audio for offline listening
- ⌨️ **Keyboard Shortcuts** - Space to play/pause, N for next, P for previous
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop

## 🚀 Live Demo

**Lovable Project**: https://lovable.dev/projects/87e5e336-1cad-4897-8e60-17ec8f45e888

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **APIs**: Piped API, Invidious API (no API keys required)

## 📦 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy TapeFlow is using Vercel's free tier:

1. **Fork or Clone the Repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install Vercel CLI** (optional)
   ```sh
   npm i -g vercel
   ```

3. **Deploy**
   - **Option A**: Push to GitHub and import in [Vercel Dashboard](https://vercel.com/new)
   - **Option B**: Run `vercel` in your project directory

4. **Configuration**
   - The project includes a `vercel.json` for optimal configuration
   - No environment variables needed (all APIs are public)
   - Build command: `npm run build`
   - Output directory: `dist`

### Deploy to Other Platforms

**Netlify**:
```sh
npm run build
# Deploy the 'dist' folder
```

**GitHub Pages**:
1. Update `vite.config.ts` to set the correct `base` path
2. Run `npm run build`
3. Deploy the `dist` folder to `gh-pages` branch

**Self-Hosted**:
```sh
npm run build
# Serve the 'dist' folder with any static file server
```

## 🔧 Development

### Prerequisites

- Node.js 18+ and npm

### Local Setup

There are several ways to work on this project:

**1. Use Lovable** (Recommended for quick edits)

Simply visit the [Lovable Project](https://lovable.dev/projects/87e5e336-1cad-4897-8e60-17ec8f45e888) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**2. Use your preferred IDE**

Work locally using your own IDE. Changes pushed to GitHub will sync to Lovable automatically.

Requirements: Node.js 18+ & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**3. Edit directly in GitHub**

- Navigate to the file, click "Edit" (pencil icon), make changes, and commit

**4. Use GitHub Codespaces**

- Click "Code" → "Codespaces" → "New codespace"
- Edit in the cloud IDE and commit when done

## ⚙️ API Information

TapeFlow uses **free, public APIs** that require **no API keys or authentication**:

### Piped API
- Privacy-focused YouTube proxy
- Endpoints: pipedapi.kavin.rocks, api.piped.yt
- Open source: [github.com/TeamPiped/Piped](https://github.com/TeamPiped/Piped)

### Invidious API
- Alternative YouTube frontend
- Multiple public instances
- Open source: [github.com/iv-org/invidious](https://github.com/iv-org/invidious)

**Privacy**: Both APIs act as proxies, fetching YouTube data without tracking users. All API calls are made client-side from the browser.

## ⌨️ Keyboard Shortcuts

- `Space` - Play/Pause
- `N` - Next track
- `P` - Previous track
- `→` - Seek forward
- `←` - Seek backward

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Developer

Created by [@shohailmahmud09](https://instagram.com/shohailmahmud09)

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- APIs: Piped & Invidious projects

---

**⭐ Star this repo if you find it useful!**
