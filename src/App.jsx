/**
 * Main Application Component - Complete Earthquake Visualizer
 */

import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import { useAppSelector, useAppDispatch } from './app/hooks.js';
import { useGetEarthquakesQuery } from './features/earthquakes/earthquakeAPI.js';
import { updateLastRefresh } from './features/earthquakes/earthquakeSlice.js';

// Import components
import Header from './components/Layout/Header.jsx';
import StatisticsCards from './components/Statistics/StatisticsCards.jsx';
import LeafletMap from './components/Map/LeafletMap.jsx';
import FilterPanel from './components/Filters/FilterPanel.jsx';
import DetailsPanel from './components/Details/DetailsPanel.jsx';

/**
 * Main App Component
 */
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  
  // Redux state
  const timePeriod = useAppSelector(state => state.filters.timePeriod);
  const earthquakeUI = useAppSelector(state => state.earthquakes);
  
  // Local state
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Fetch earthquake data
  const {
    data: earthquakeData,
    error,
    isLoading,
    refetch
  } = useGetEarthquakesQuery(timePeriod, {
    pollingInterval: earthquakeUI.autoRefresh ? earthquakeUI.refreshInterval : 0,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  // Auto-refresh effect
  useEffect(() => {
    if (earthquakeData) {
      dispatch(updateLastRefresh());
    }
  }, [earthquakeData, dispatch]);

  // Handle manual refresh
  const handleRefresh = () => {
    refetch();
  };

  // Handle settings
  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'grey.50',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Header 
          onRefresh={handleRefresh}
          onSettingsOpen={handleSettingsOpen}
        />

        {/* Main Content */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            flex: 1,
            py: 3,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Statistics Cards */}
          <StatisticsCards isLoading={isLoading} />

          {/* Main Layout */}
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            flex: 1,
            flexDirection: { xs: 'column', lg: 'row' },
            minHeight: 0 // Important for proper flex behavior
          }}>
            {/* Filter Panel */}
            <Box sx={{ 
              width: { lg: 320 },
              flexShrink: 0,
              order: { xs: 2, lg: 1 }
            }}>
              <FilterPanel />
            </Box>

            {/* Map Container */}
            <Box sx={{ 
              flex: 1,
              minHeight: { xs: '400px', md: '500px', lg: '600px' },
              order: { xs: 1, lg: 2 }
            }}>
              <LeafletMap 
                height="100%" 
                isLoading={isLoading}
                error={error}
              />
            </Box>

            {/* Details Panel */}
            <Box sx={{ 
              width: { lg: 320 },
              flexShrink: 0,
              order: { xs: 3, lg: 3 }
            }}>
              <DetailsPanel />
            </Box>
          </Box>
        </Container>

        {/* Settings Dialog - TODO: Implement settings modal */}
        {/* <SettingsDialog 
          open={settingsOpen}
          onClose={handleSettingsClose}
        /> */}
      </Box>
    </>
  );
}

export default App;