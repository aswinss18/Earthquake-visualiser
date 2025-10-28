# 🌍 Earthquake Visualizer

A modern, real-time earthquake visualization application built for geography students and seismology enthusiasts. Visualize and analyze recent earthquake activity around the world using data from the USGS Earthquake API.

## ✨ Features

- **Interactive World Map**: Real-time earthquake visualization with Leaflet
- **Location Services**: Find your location and see nearby earthquakes with distance calculations
- **Smart Filtering**: Filter by magnitude, depth, time period, and location
- **Detailed Analytics**: Statistics dashboard with charts and insights
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Updates**: Auto-refresh every 5 minutes with manual refresh option
- **Performance Optimized**: Marker clustering and efficient state management

## 🚀 Tech Stack

- **Frontend**: React 18+ with Vite
- **UI Framework**: Material-UI (MUI) v5 + Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Mapping**: Leaflet with react-leaflet
- **Data Source**: USGS Earthquake API
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/earthquake-visualizer.git
   cd earthquake-visualizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration (optional - defaults work out of the box)
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📍 Location Features

The application includes comprehensive location services to help you understand earthquake activity relative to your position:

### 🎯 Find My Location

- Click the location button (📍) on the map to find and mark your current position
- Your location is displayed with a blue marker and accuracy circle
- Location data is stored in the app state for the session

### 🌐 Nearby Earthquakes

- View earthquakes within a customizable radius of your location (10-500 km)
- Sort nearby earthquakes by distance, magnitude, or time
- See exact distance calculations for each earthquake
- Expandable panel shows up to 10 closest earthquakes with details

### 📏 Distance Calculations

- All earthquake markers show distance from your location in popups
- Distances displayed in meters (< 1km) or kilometers
- Uses the Haversine formula for accurate geographic calculations

### 🔒 Privacy & Permissions

- Location access requires browser permission
- Location data is only stored locally in your browser session
- No location data is sent to external servers

## 🏗️ Project Structure

```
earthquake-visualizer/
├── public/                  # Static assets
├── src/
│   ├── app/                # Redux store configuration
│   │   ├── store.js        # Main store setup
│   │   └── hooks.js        # Typed Redux hooks
│   ├── features/           # Feature-based modules
│   │   ├── earthquakes/    # Earthquake data management
│   │   │   ├── earthquakeAPI.js     # RTK Query API service
│   │   │   ├── earthquakeSlice.js   # Redux slice
│   │   │   └── earthquakeSelectors.js # Memoized selectors
│   │   ├── map/            # Map state management
│   │   │   └── mapSlice.js
│   │   └── filters/        # Filter state management
│   │       └── filterSlice.js
│   ├── utils/              # Helper functions
│   │   ├── constants.js    # App constants
│   │   ├── formatters.js   # Data formatting utilities
│   │   └── calculations.js # Statistics calculations
│   ├── theme/              # MUI theme configuration
│   │   └── muiTheme.js
│   ├── types/              # Type definitions
│   │   └── earthquake.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest

## 🌟 Development Phases

### ✅ Phase 1: Foundation (Complete)

- Redux store setup with RTK Query
- USGS API integration
- State management architecture
- Utility functions and type definitions
- MUI + Tailwind CSS integration

### 🚧 Phase 2: Interactive Map (Next)

- Leaflet map implementation
- Earthquake markers with clustering
- Map controls and interactions
- Real-time data visualization

### 📋 Phase 3: UI & Filters (Planned)

- Filter panel with advanced options
- Earthquake details panel
- Statistics dashboard
- Responsive design implementation

## 🎯 Key Features Implementation

### Real-time Data Fetching

```javascript
// RTK Query automatically handles caching, loading states, and errors
const { data, isLoading, error } = useGetEarthquakesQuery("day");
```

### Smart State Management

```javascript
// Memoized selectors for optimal performance
const filteredEarthquakes = useAppSelector(selectFilteredEarthquakes);
const statistics = useAppSelector(selectEarthquakeStatistics);
```

### Responsive Design

- Mobile-first approach with Tailwind CSS
- MUI components for complex interactions
- Optimized touch controls for mobile devices

## 🔌 API Integration

The app uses the USGS Earthquake API:

- **Endpoint**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/`
- **Data Format**: GeoJSON
- **Update Frequency**: Real-time
- **Coverage**: Global earthquake data

## 🎨 Design System

### Color Scheme (Earthquake Severity)

- 🟢 **Minor** (< 3.0): Green (`#4ade80`)
- 🟡 **Light** (3.0-4.9): Yellow (`#fbbf24`)
- 🟠 **Moderate** (5.0-6.9): Orange (`#f97316`)
- 🔴 **Major** (≥ 7.0): Red (`#ef4444`)

### Typography

- **Headings**: Inter/System fonts with proper hierarchy
- **Body**: Optimized for readability across devices
- **Data**: Monospace for precise numerical display

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/) for providing real-time earthquake data
- [OpenStreetMap](https://www.openstreetmap.org/) contributors for map tiles
- [Leaflet](https://leafletjs.com/) for the excellent mapping library
- [Material-UI](https://mui.com/) for the comprehensive component library

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-username/earthquake-visualizer/issues) page
2. Create a new issue with detailed information
3. Join our [Discussions](https://github.com/your-username/earthquake-visualizer/discussions)

---

**Built with ❤️ for the seismology and geography community**#   E a r t h q u a k e - v i s u a l i s e r 
 
 #   E a r t h q u a k e - v i s u a l i s e r 
 
 
