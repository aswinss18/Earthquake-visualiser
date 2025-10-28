/**
 * Interactive Leaflet Map Component
 */

import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Box, Paper, Fab, Tooltip, Typography, Snackbar, Alert } from '@mui/material';
import { 
  MyLocation as MyLocationIcon, 
  Layers as LayersIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import { useAppSelector, useAppDispatch } from '../../app/hooks.js';
import { selectFilteredEarthquakes } from '../../features/earthquakes/earthquakeSelectors.js';
import { 
  updateMapView, 
  setLocationLoading, 
  setUserLocation, 
  setLocationError,
  toggleUserLocation
} from '../../features/map/mapSlice.js';
import EarthquakeMarkers from './EarthquakeMarkers.jsx';
import UserLocationMarker from './UserLocationMarker.jsx';


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
const UserLocationControl = ({ onLocationSuccess }) => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const { isLocating, userLocation, locationError } = useAppSelector(state => state.map);

  const locateUser = () => {
    if (!navigator.geolocation) {
      dispatch(setLocationError('Geolocation is not supported by this browser.'));
      return;
    }

    dispatch(setLocationLoading(true));
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        // Update Redux state with location
        dispatch(setUserLocation({ 
          lat: latitude, 
          lng: longitude, 
          accuracy: accuracy 
        }));
        
        // Center map on user location
        map.setView([latitude, longitude], 10);
        
        // Show success notification
        if (onLocationSuccess) {
          onLocationSuccess();
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Unable to get your location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred while retrieving location.';
            break;
        }
        
        dispatch(setLocationError(errorMessage));
      },
      { 
        timeout: 15000, 
        enableHighAccuracy: true,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return (
    <Box sx={{ position: 'absolute', bottom: 80, right: 16, zIndex: 1000 }}>
      <Tooltip title={
        locationError ? locationError : 
        userLocation ? "Location found - click to refresh" : 
        "Find my location"
      }>
        <Fab
          size="small"
          color={userLocation ? "success" : "primary"}
          onClick={locateUser}
          disabled={isLocating}
          sx={{
            bgcolor: userLocation ? 'success.main' : 'background.paper',
            color: userLocation ? 'white' : 'primary.main',
            '&:hover': { 
              bgcolor: userLocation ? 'success.dark' : 'primary.main', 
              color: 'white' 
            },
            animation: isLocating ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' }
            }
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
  const dispatch = useAppDispatch();
  const earthquakes = useAppSelector(selectFilteredEarthquakes);
  const mapState = useAppSelector(state => state.map);
  const [tileLayer, setTileLayer] = useState('openstreetmap');
  const [showLocationSuccess, setShowLocationSuccess] = useState(false);


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
        
        {/* User Location Marker */}
        {mapState.showUserLocation && mapState.userLocation && (
          <UserLocationMarker location={mapState.userLocation} />
        )}



        {/* Map Controls */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Location Visibility Toggle */}
          {mapState.userLocation && (
            <Tooltip title={mapState.showUserLocation ? "Hide my location" : "Show my location"}>
              <Fab
                size="small"
                color={mapState.showUserLocation ? "primary" : "default"}
                onClick={() => dispatch(toggleUserLocation())}
                sx={{
                  bgcolor: mapState.showUserLocation ? 'primary.main' : 'background.paper',
                  color: mapState.showUserLocation ? 'white' : 'text.secondary',
                  '&:hover': { 
                    bgcolor: mapState.showUserLocation ? 'primary.dark' : 'action.hover'
                  }
                }}
              >
                {mapState.showUserLocation ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </Fab>
            </Tooltip>
          )}

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

        <UserLocationControl onLocationSuccess={() => setShowLocationSuccess(true)} />
        
        {/* Location Error Notification */}
        {mapState.locationError && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => dispatch(setLocationError(null))}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert 
              severity="error" 
              onClose={() => dispatch(setLocationError(null))}
              sx={{ minWidth: 300 }}
            >
              {mapState.locationError}
            </Alert>
          </Snackbar>
        )}
        
        {/* Location Success Notification */}
        {showLocationSuccess && (
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={() => setShowLocationSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert 
              severity="success" 
              onClose={() => setShowLocationSuccess(false)}
              sx={{ minWidth: 300 }}
            >
              Location found! Your position is now marked on the map.
            </Alert>
          </Snackbar>
        )}
      </MapContainer>



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