/**
 * Redux slice for map state management
 */

import { createSlice } from '@reduxjs/toolkit';
import { MAP_CONFIG } from '../../utils/constants.js';

/**
 * Initial state for map slice
 */
const initialState = {
  // Map view state
  center: { lat: MAP_CONFIG.DEFAULT_CENTER[0], lng: MAP_CONFIG.DEFAULT_CENTER[1] },
  zoom: MAP_CONFIG.DEFAULT_ZOOM,
  bounds: null,
  
  // Map instance reference (non-serializable, handled carefully)
  mapInstance: null,
  
  // Layer visibility
  showSatelliteLayer: false,
  showTerrainLayer: false,
  
  // Map interaction state
  isInteracting: false,
  lastInteraction: null,
  
  // Marker clustering
  clusteringEnabled: true,
  clusterRadius: 80,
  
  // Map controls
  showZoomControl: true,
  showScaleControl: true,
  showAttributionControl: true,
  
  // Performance settings
  maxMarkersVisible: 1000,
  renderOptimization: true,
};

/**
 * Map slice with reducers and actions
 */
const mapSlice = createSlice({
  name: 'map',
  initialState,
  
  reducers: {
    /**
     * Update map center and zoom
     */
    updateMapView: (state, action) => {
      const { center, zoom, bounds } = action.payload;
      if (center) state.center = center;
      if (zoom !== undefined) state.zoom = zoom;
      if (bounds) state.bounds = bounds;
      state.lastInteraction = Date.now();
    },

    /**
     * Set map instance reference
     */
    setMapInstance: (state, action) => {
      // Note: This is non-serializable but needed for map operations
      state.mapInstance = action.payload;
    },

    /**
     * Update layer visibility
     */
    toggleLayer: (state, action) => {
      const { layer, visible } = action.payload;
      switch (layer) {
        case 'satellite':
          state.showSatelliteLayer = visible !== undefined ? visible : !state.showSatelliteLayer;
          break;
        case 'terrain':
          state.showTerrainLayer = visible !== undefined ? visible : !state.showTerrainLayer;
          break;
        default:
          break;
      }
    },

    /**
     * Set map interaction state
     */
    setMapInteracting: (state, action) => {
      state.isInteracting = action.payload;
      if (action.payload) {
        state.lastInteraction = Date.now();
      }
    },

    /**
     * Update clustering settings
     */
    updateClusteringSettings: (state, action) => {
      const { enabled, radius } = action.payload;
      if (enabled !== undefined) state.clusteringEnabled = enabled;
      if (radius !== undefined) state.clusterRadius = radius;
    },

    /**
     * Toggle map controls visibility
     */
    toggleMapControls: (state, action) => {
      const { control, visible } = action.payload;
      switch (control) {
        case 'zoom':
          state.showZoomControl = visible !== undefined ? visible : !state.showZoomControl;
          break;
        case 'scale':
          state.showScaleControl = visible !== undefined ? visible : !state.showScaleControl;
          break;
        case 'attribution':
          state.showAttributionControl = visible !== undefined ? visible : !state.showAttributionControl;
          break;
        default:
          break;
      }
    },

    /**
     * Update performance settings
     */
    updatePerformanceSettings: (state, action) => {
      const { maxMarkersVisible, renderOptimization } = action.payload;
      if (maxMarkersVisible !== undefined) state.maxMarkersVisible = maxMarkersVisible;
      if (renderOptimization !== undefined) state.renderOptimization = renderOptimization;
    },

    /**
     * Fit map to earthquake bounds
     */
    fitToBounds: (state, action) => {
      const { bounds, padding } = action.payload;
      state.bounds = bounds;
      // The actual map fitting will be handled by the map component
    },

    /**
     * Reset map to default view
     */
    resetMapView: (state) => {
      state.center = { lat: MAP_CONFIG.DEFAULT_CENTER[0], lng: MAP_CONFIG.DEFAULT_CENTER[1] };
      state.zoom = MAP_CONFIG.DEFAULT_ZOOM;
      state.bounds = null;
      state.lastInteraction = Date.now();
    },

    /**
     * Zoom to specific earthquake
     */
    zoomToEarthquake: (state, action) => {
      const { coordinates, zoom = 8 } = action.payload;
      if (coordinates && coordinates.lat && coordinates.lng) {
        state.center = { lat: coordinates.lat, lng: coordinates.lng };
        state.zoom = zoom;
        state.lastInteraction = Date.now();
      }
    },
  },
});

// Export actions
export const {
  updateMapView,
  setMapInstance,
  toggleLayer,
  setMapInteracting,
  updateClusteringSettings,
  toggleMapControls,
  updatePerformanceSettings,
  fitToBounds,
  resetMapView,
  zoomToEarthquake,
} = mapSlice.actions;

// Export reducer
export default mapSlice.reducer;