/**
 * Interactive Map Page - Full-screen map view with controls
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  useTheme
} from '@mui/material';
import {
  Layers as LayersIcon,
  MyLocation as MyLocationIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  FilterList as FilterIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';
import { useAppSelector } from '../app/hooks.js';
import { useGetEarthquakesQuery } from '../features/earthquakes/earthquakeAPI.js';
import LeafletMap from '../components/Map/LeafletMap.jsx';
import FilterPanel from '../components/Filters/FilterPanel.jsx';
import NearbyEarthquakes from '../components/Location/NearbyEarthquakes.jsx';

const MapPage = ({ onEarthquakeSelect }) => {
  const theme = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mapLayer, setMapLayer] = useState('openstreetmap');

  const timePeriod = useAppSelector(state => state.filters.timePeriod);

  const {
    data: earthquakeData,
    error,
    isLoading
  } = useGetEarthquakesQuery(timePeriod, {
    pollingInterval: 300000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  const handleLayerChange = (event, newLayer) => {
    if (newLayer !== null) {
      setMapLayer(newLayer);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Page Header */}
      {!isFullscreen && (
        <Box sx={{ p: 2, pb: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Interactive Map
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explore earthquake activity with detailed geographic visualization
          </Typography>
        </Box>
      )}

      {/* Map Container */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        position: 'relative',
        m: isFullscreen ? 0 : 2,
        mt: isFullscreen ? 0 : 1,
        borderRadius: isFullscreen ? 0 : 2,
        overflow: 'hidden'
      }}>
        {/* Filters Panel */}
        {showFilters && (
          <Card sx={{
            width: 320,
            height: '100%',
            zIndex: 1000,
            position: 'absolute',
            left: 0,
            top: 0
          }}>
            <CardContent sx={{ height: '100%', overflow: 'auto' }}>
              <FilterPanel />
            </CardContent>
          </Card>
        )}

        {/* Main Map */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <LeafletMap
            height="100%"
            isLoading={isLoading}
            error={error}
            onEarthquakeSelect={onEarthquakeSelect}
            mapLayer={mapLayer}
          />

          {/* Map Controls */}
          <Box sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            zIndex: 1000
          }}>
            {/* Layer Selector */}
            <Card>
              <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                <ToggleButtonGroup
                  value={mapLayer}
                  exclusive
                  onChange={handleLayerChange}
                  orientation="vertical"
                  size="small"
                >
                  <ToggleButton value="openstreetmap">
                    <Tooltip title="Street Map">
                      <LayersIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="satellite">
                    <Tooltip title="Satellite">
                      <LayersIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="terrain">
                    <Tooltip title="Terrain">
                      <LayersIcon />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Tooltip title={showFilters ? "Hide Filters" : "Show Filters"}>
                    <IconButton
                      onClick={() => setShowFilters(!showFilters)}
                      color={showFilters ? "primary" : "default"}
                    >
                      <FilterIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="My Location">
                    <IconButton>
                      <MyLocationIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                    <IconButton onClick={toggleFullscreen}>
                      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Map Info */}
          {!isFullscreen && (
            <Card sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              zIndex: 1000,
              minWidth: 200
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="body2" fontWeight={600}>
                  Map Information
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Layer: {mapLayer.charAt(0).toUpperCase() + mapLayer.slice(1)}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Total Earthquakes: {earthquakeData?.earthquakes?.length || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Period: {timePeriod}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Nearby Earthquakes Panel */}
          {!isFullscreen && (
            <Box sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 1000,
              width: 320,
              maxHeight: '60vh',
              overflow: 'auto'
            }}>
              <NearbyEarthquakes onEarthquakeSelect={onEarthquakeSelect} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MapPage;