/**
 * Application Header Component
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../app/hooks.js';
import { selectEarthquakeUI } from '../../features/earthquakes/earthquakeSelectors.js';
import { updateLastRefresh } from '../../features/earthquakes/earthquakeSlice.js';

const Header = ({ onRefresh, onSettingsOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const earthquakeUI = useAppSelector(selectEarthquakeUI);

  const handleRefresh = () => {
    dispatch(updateLastRefresh());
    onRefresh?.();
  };

  const getStatusColor = () => {
    if (earthquakeUI.error) return 'error';
    if (earthquakeUI.isLoading) return 'warning';
    return 'success';
  };

  const getStatusText = () => {
    if (earthquakeUI.error) return 'Error';
    if (earthquakeUI.isLoading) return 'Loading';
    return 'Live';
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            🌍 Earthquake Visualizer
          </Typography>
          
          {!isMobile && (
            <Typography
              variant="body2"
              sx={{ 
                ml: 2, 
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Real-time seismic monitoring
            </Typography>
          )}
        </Box>

        {/* Status and Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Connection Status */}
          <Chip
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
            variant="outlined"
            sx={{ 
              fontWeight: 500,
              display: { xs: 'none', sm: 'flex' }
            }}
          />

          {/* Last Updated */}
          {earthquakeUI.lastRefresh && !isMobile && (
            <Box sx={{ textAlign: 'right', mr: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Updated
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {new Date(earthquakeUI.lastRefresh).toLocaleTimeString()}
              </Typography>
            </Box>
          )}

          {/* Refresh Button */}
          <Tooltip title="Refresh data">
            <IconButton
              onClick={handleRefresh}
              disabled={earthquakeUI.isLoading}
              color="primary"
              sx={{
                animation: earthquakeUI.isLoading ? 'spin 1s linear infinite' : 'none',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          {/* Settings Button */}
          <Tooltip title="Settings">
            <IconButton onClick={onSettingsOpen} color="primary">
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Info Button */}
          <Tooltip title="About">
            <IconButton color="primary">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;