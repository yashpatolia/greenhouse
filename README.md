# 🌱 Greenhouse Garden Optimizer

A modern web application for optimizing crop layouts in greenhouse gardens with mutation mechanics. Maximize your crop mutations with intelligent placement suggestions powered by a custom optimization algorithm.

## Features

### 🎯 Core Functionality
- **10×10 Interactive Grid**: Click cells to lock/unlock plots
- **Cross Pattern Start**: Default unlocked layout (center 4×4 with corners cut)
- **Smart Optimization**: Algorithm-driven crop placement for maximum mutations
- **Real-time Feedback**: Instant visual updates showing optimal placements

### 🎃 Mutation System
- **Gloomgourd Mutation**: Requires 1 Melon + 1 Pumpkin adjacent (orthogonal or diagonal)
- **Visual Indicators**: Clear highlighting of mutation-ready spots
- **Extensible Design**: Easy to add new crops and mutation rules

### 🍪 Privacy-First Data Storage
- **Cookie Consent**: Clear opt-in/opt-out with banner on first visit
- **Persistent State**: Save unlocked plot configuration across sessions
- **Full Control**: Clear all data anytime via settings
- **Session Mode**: Works perfectly without cookies

### 🎨 Modern UI/UX
- **Minimalistic Design**: Clean, modern aesthetic with sage green & earth tones
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Smooth Interactions**: Hover effects, animations, and visual feedback
- **Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation

## Tech Stack

- **Frontend**: React 18+ with hooks (useState, useEffect)
- **Build Tool**: Vite for fast dev server and optimized builds
- **Styling**: Tailwind CSS 3+ with custom theme
- **State Management**: React Context + local state (no Redux overhead)
- **Storage**: js-cookie library for consent-compliant cookie management
- **Code Quality**: ESLint + Prettier with TypeScript-ready configuration

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd greenhouse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage Guide

### 1. Cookie Consent
On first visit, you'll see a cookie consent banner. Accept to save your grid state across sessions, or decline for session-only mode.

### 2. Customize Your Grid
- Click any cell to toggle between locked 🔒 and unlocked ⬜ states
- Start with the cross pattern or create your own layout
- Reset anytime using the "Reset Grid" button

### 3. Select Crop
- Currently supports **Gloomgourd** mutation
- View mutation requirements in the info panel
- See real-time mutation spot count

### 4. Optimize Layout
The app automatically calculates and displays:
- **🍈 Melons**: Optimal placement shown in green
- **🎃 Pumpkins**: Optimal placement shown in orange
- **✨ Mutation Spots**: Ready for Gloomgourd (purple, glowing)

### 5. Manage Settings
Click the ⚙️ Settings button to:
- View cookie status
- Clear all saved data
- Reset preferences

## Algorithm Details

### Optimization Strategy
The placement algorithm uses a **greedy approach** to maximize mutation spots:

1. **Input**: Unlocked cell coordinates + selected crop (Gloomgourd)
2. **Process**:
   - Identify all empty unlocked cells
   - For each cell, calculate potential mutation spots if it were a Melon or Pumpkin
   - Alternately place Melons and Pumpkins in positions with highest potential
   - Stop when no more improvements possible
3. **Output**: Arrays of Melon positions, Pumpkin positions, and mutation spot coordinates

### Performance
- Grid calculations: **<100ms** (typically 10-50ms)
- Optimized for grids up to 20×20
- Linear or better complexity scaling

### Adjacency Rules
For Gloomgourd mutation, adjacent means all 8 surrounding cells:
```
[TL][T][TR]
[L] [X] [R]
[BL][B][BR]
```

## Project Structure

```
greenhouse/
├── src/
│   ├── components/       # React components
│   │   ├── Cell.jsx         # Individual grid cell
│   │   ├── Grid.jsx         # 10×10 grid container
│   │   ├── CropSelector.jsx # Crop selection UI
│   │   ├── MutationInfo.jsx # Mutation requirements display
│   │   ├── CookieConsent.jsx # Cookie banner
│   │   ├── SettingsPanel.jsx # Settings modal
│   │   └── Legend.jsx        # Grid symbol legend
│   ├── data/             # Configuration data
│   │   └── crops.js         # Crop definitions
│   ├── utils/            # Utilities
│   │   └── optimizer.js     # Optimization algorithm
│   ├── App.jsx           # Main application
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind theme
├── eslint.config.js      # ESLint rules
└── README.md             # This file
```

## Extending the System

### Adding New Crops

1. **Define crop in `src/data/crops.js`**:
```javascript
export const CROPS = {
  gloomgourd: { /* existing */ },
  newcrop: {
    id: 'newcrop',
    name: 'New Crop',
    description: 'Description',
    color: '#HEXCODE',
    icon: '🌾',
    requirements: [
      { crop: 'crop1', icon: '🌱', color: '#COLOR1' },
      { crop: 'crop2', icon: '🌿', color: '#COLOR2' }
    ],
    mutationDescription: 'Requires X + Y adjacent',
    adjacency: 'orthogonal only' // or 'diagonal only'
  }
}
```

2. **Update optimizer algorithm** in `src/utils/optimizer.js` to handle new mutation rules

3. **Add visual assets** (colors, icons) in the crops data structure

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please follow the constitution principles defined in `.specify/memory/constitution.md`:

1. **User Experience First**: Maintain intuitive, minimalistic design
2. **Privacy Control**: Ensure user data control and transparency
3. **Algorithm-Driven**: Keep logic testable and separated from UI
4. **Modular Extensibility**: Make additions without refactoring
5. **Visual Clarity**: Maintain WCAG 2.1 AA compliance
6. **Performance**: Keep calculations under 50ms for 10×10 grids
7. **Clean Architecture**: Follow established React + Tailwind patterns

## Support

For issues, questions, or feature requests, please open an issue on the repository.

---

**Built with ❤️ for greenhouse garden enthusiasts**
