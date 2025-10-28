/**
 * Interactive Leaflet Map Component
 */

import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Box, Paper, Fab, Tooltip, Typography, Switch, FormControlLabel } from '@mui/material';
import { MyLocation as MyLocationIcon, Layers as LayersIcon, Public as PublicIcon } from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import { useAppSelector, useAppDispatch } from '../../app/hooks.js';
import { selectFilteredEarthquakes } from '../../features/earthquakes/earthquakeSelectors.js';
import { updateMapView } from '../../features/map/mapSlice.js';
import EarthquakeMarkers from './EarthquakeMarkers.jsx';
import TectonicPlatesOverlay from './TectonicPlatesOverlay.jsx';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map event handler component
const MapEventHandler = () => {
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const center = map.getCenter();
      const zoom = map.getZoom();
      
      dispatch(updateMapView({
        center: { lat: center.lat, lng: center.lng },
        zoom: zoom,
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        }
      }));
    },
    zoomend: () => {
      const zoom = map.getZoom();
      dispatch(updateMapView({ zoom }));
    }
  });

  return null;
};

// User location component
const UserLocationControl = () => {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);

  const locateUser = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = [latitude, longitude];
        map.setView(location, 8);
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLocating(false);
        alert('Unable to get your location. Please check your browser settings.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <Box sx={{ position: 'absolute', bottom: 80, right: 16, zIndex: 1000 }}>
      <Tooltip title="Find my location">
        <Fab
          size="small"
          color="primary"
          onClick={locateUser}
          disabled={isLocating}
          sx={{
            bgcolor: 'background.paper',
            color: 'primary.main',
            '&:hover': { bgcolor: 'primary.main', color: 'white' }
          }}
        >
          <MyLocationIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

const LeafletMap = ({ height = '500px' }) => {
  const mapRef = useRef(null);
  const earthquakes = useAppSelector(selectFilteredEarthquakes);
  const mapState = useAppSelector(state => state.map);
  const [tileLayer, setTileLayer] = useState('openstreetmap');
  const [showTectonicPlates, setShowTectonicPlates] = useState(true);

  const tileLayerOptions = {
    openstreetmap: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri'
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap contributors'
    }
  };

  const toggleTileLayer = () => {
    const layers = Object.keys(tileLayerOptions);
    const currentIndex = layers.indexOf(tileLayer);
    const nextIndex = (currentIndex + 1) % layers.length;
    setTileLayer(layers[nextIndex]);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        position: 'relative', 
        height,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <MapContainer
        ref={mapRef}
        center={[mapState.center.lat, mapState.center.lng]}
        zoom={mapState.zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          url={tileLayerOptions[tileLayer].url}
          attribution={tileLayerOptions[tileLayer].attribution}
        />
        
        <MapEventHandler />
        <EarthquakeMarkers earthquakes={earthquakes} />

        {/* Tectonic Plates Overlay */}
        <TectonicPlatesOverlay visible={showTectonicPlates} />

        {/* Map Controls */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Tectonic Plates Toggle */}
          <Paper
            elevation={2}
            sx={{
              px: 1.5,
              py: 0.5,
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={showTectonicPlates}
                  onChange={(e) => setShowTectonicPlates(e.target.checked)}
                  size="small"
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PublicIcon fontSize="small" />
                  <Typography variant="caption" fontWeight={500}>
                    Tectonic Plates
                  </Typography>
                </Box>
              }
              sx={{ m: 0 }}
            />
          </Paper>

          {/* Map Layer Toggle */}
          <Tooltip title="Change map layer">
            <Fab
              size="small"
              color="primary"
              onClick={toggleTileLayer}
              sx={{
                bgcolor: 'background.paper',
                color: 'primary.main',
                '&:hover': { bgcolor: 'primary.main', color: 'white' }
              }}
            >
              <LayersIcon />
            </Fab>
          </Tooltip>
        </Box>

        <UserLocationControl />
      </MapContainer>

      {/* Map Legend - Now integrated into TectonicPlatesOverlay */}

      {/* Loading overlay */}
      {earthquakes.length === 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1000
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Loading earthquake data...
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default LeafletMap;