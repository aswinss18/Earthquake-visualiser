/**
 * Landing Page Component
 * Modern landing page with user guide
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Public as EarthIcon,
  Timeline as AnalyticsIcon,
  Map as MapIcon,
  Notifications as AlertIcon,
  TrendingUp as TrendIcon,
  Security as SafetyIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const LandingPage = ({ onGetStarted }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedGuide, setExpandedGuide] = useState(false);

  const features = [
    {
      icon: <EarthIcon />,
      title: 'Real-time Data',
      description: 'Live earthquake data from USGS with automatic updates',
      color: '#3b82f6'
    },
    {
      icon: <MapIcon />,
      title: 'Interactive Maps',
      description: 'Visualize seismic activity on detailed interactive maps',
      color: '#10b981'
    },
    {
      icon: <AnalyticsIcon />,
      title: 'Advanced Analytics',
      description: 'Comprehensive statistics and trend analysis',
      color: '#8b5cf6'
    },
    {
      icon: <AlertIcon />,
      title: 'Smart Alerts',
      description: 'Get notified about significant seismic events',
      color: '#f59e0b'
    },
    {
      icon: <TrendIcon />,
      title: 'Historical Trends',
      description: 'Analyze patterns and trends in earthquake activity',
      color: '#ef4444'
    },
    {
      icon: <SafetyIcon />,
      title: 'Educational Focus',
      description: 'Perfect for students and seismology enthusiasts',
      color: '#06b6d4'
    }
  ];

  const guideSteps = [
    {
      title: 'Dashboard Overview',
      icon: <DashboardIcon />,
      description: 'Get a comprehensive overview of recent earthquake activity',
      steps: [
        'View real-time earthquake statistics and counts',
        'See recent significant earthquakes in your area',
        'Monitor global seismic activity trends',
        'Access quick filters for magnitude and time periods'
      ]
    },
    {
      title: 'Interactive Map',
      icon: <MapIcon />,
      description: 'Explore earthquakes on an interactive world map',
      steps: [
        'Click on earthquake markers to view detailed information',
        'Use zoom and pan controls to navigate the map',
        'Toggle different map layers (satellite, terrain, etc.)',
        'Filter earthquakes by magnitude, depth, and time range'
      ]
    },
    {
      title: 'Search & Filter',
      icon: <SearchIcon />,
      description: 'Find specific earthquakes using advanced filters',
      steps: [
        'Search by location, magnitude, or date range',
        'Apply multiple filters simultaneously',
        'Sort results by various criteria',
        'Export filtered data for analysis'
      ]
    },
    {
      title: 'Analytics & Trends',
      icon: <AnalyticsIcon />,
      description: 'Analyze earthquake patterns and statistics',
      steps: [
        'View magnitude distribution charts',
        'Analyze temporal patterns and trends',
        'Compare regional earthquake activity',
        'Generate custom reports and visualizations'
      ]
    },
    {
      title: 'Bookmarks & Alerts',
      icon: <BookmarkIcon />,
      description: 'Save interesting earthquakes and set up notifications',
      steps: [
        'Bookmark earthquakes for later reference',
        'Set up magnitude-based alert thresholds',
        'Receive notifications for significant events',
        'Manage your saved earthquake collection'
      ]
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Navigation Bar */}
      <Box
        sx={{
          borderBottom: '1px solid #e5e7eb',
          py: 2,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          bgcolor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EarthIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937' }}>
                Earthquake Visualizer
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                onClick={() => setExpandedGuide(!expandedGuide)}
                sx={{ color: '#6b7280', textTransform: 'none' }}
              >
                User Guide
              </Button>
              <Button
                variant="contained"
                onClick={onGetStarted}
                startIcon={<PlayIcon />}
                sx={{
                  bgcolor: '#3b82f6',
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': { bgcolor: '#2563eb' }
                }}
              >
                Launch App
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <div>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip 
                    label="Real-time Data" 
                    size="small" 
                    sx={{ bgcolor: '#dbeafe', color: '#1e40af', fontWeight: 500 }}
                  />
                  <Chip 
                    label="Educational" 
                    size="small" 
                    sx={{ bgcolor: '#dcfce7', color: '#166534', fontWeight: 500 }}
                  />
                </Stack>

                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: '#111827',
                    mb: 3,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1
                  }}
                >
                  Visualize Earth's
                  <Box component="span" sx={{ color: '#3b82f6', display: 'block' }}>
                    Seismic Activity
                  </Box>
                </Typography>
                
                <Typography
                  variant="h6"
                  paragraph
                  sx={{ 
                    mb: 4, 
                    lineHeight: 1.6,
                    color: '#6b7280',
                    fontWeight: 400,
                    maxWidth: 500
                  }}
                >
                  Explore real-time earthquake data from USGS with interactive maps, 
                  comprehensive analytics, and educational insights for students and researchers.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    startIcon={<PlayIcon />}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      bgcolor: '#3b82f6',
                      color: 'white',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.3)',
                      '&:hover': {
                        bgcolor: '#2563eb',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.4)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => setExpandedGuide(true)}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      borderColor: '#d1d5db',
                      color: '#374151',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        bgcolor: '#f9fafb'
                      }
                    }}
                  >
                    View Guide
                  </Button>
                </Stack>

                <Stack direction="row" spacing={4} sx={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
                    Live USGS Data
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3b82f6' }} />
                    No Registration Required
                  </Box>
                </Stack>
              </div>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1200}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 300, md: 500 },
                  position: 'relative'
                }}
              >
                {/* Background decoration */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                    animation: 'pulse 4s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
                      '50%': { transform: 'scale(1.05)', opacity: 0.4 }
                    }
                  }}
                />
                
                {/* Main earth visualization */}
                <Box
                  sx={{
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    zIndex: 2
                  }}
                >
                  <EarthIcon sx={{ fontSize: 120, color: '#3b82f6' }} />
                  
                  {/* Floating elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: '#ef4444',
                      animation: 'bounce 2s ease-in-out infinite',
                      '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-10px)' }
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 30,
                      left: 30,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#f59e0b',
                      animation: 'bounce 2s ease-in-out infinite 0.5s'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 60,
                      left: 10,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#10b981',
                      animation: 'bounce 2s ease-in-out infinite 1s'
                    }}
                  />
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* User Guide Section */}
      {expandedGuide && (
        <Box sx={{ bgcolor: 'white', py: 8, borderTop: '1px solid #e5e7eb' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                color: '#111827'
              }}
            >
              User Guide
            </Typography>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ 
                mb: 6, 
                color: '#6b7280',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Learn how to make the most of the Earthquake Visualizer with this comprehensive guide
            </Typography>

            <Grid container spacing={3}>
              {guideSteps.map((step, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Accordion
                    sx={{
                      boxShadow: 'none',
                      border: '1px solid #e5e7eb',
                      borderRadius: 2,
                      '&:before': { display: 'none' },
                      mb: 2
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          alignItems: 'center',
                          gap: 2
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: '#f3f4f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {React.cloneElement(step.icon, { sx: { fontSize: 20, color: '#3b82f6' } })}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {step.steps.map((stepItem, stepIndex) => (
                          <ListItem key={stepIndex} sx={{ pl: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  bgcolor: '#3b82f6'
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText 
                              primary={stepItem}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: '#4b5563'
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Features Section */}
      <Box sx={{ bgcolor: '#fafafa', py: 12 }}>
        <Container maxWidth="lg">
          <Fade in timeout={1500}>
            <div>
              <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                gutterBottom
                sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  color: '#111827'
                }}
              >
                Powerful Features
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ 
                  mb: 8, 
                  color: '#6b7280',
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Everything you need to understand and visualize seismic activity around the world
              </Typography>
            </div>
          </Fade>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in timeout={1500 + index * 200}>
                  <div>
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                        },
                        borderRadius: 3,
                        border: 'none',
                        bgcolor: 'white',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        overflow: 'visible'
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Box 
                          sx={{ 
                            mb: 3,
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            bgcolor: `${feature.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto'
                          }}
                        >
                          {React.cloneElement(feature.icon, { 
                            sx: { fontSize: 32, color: feature.color } 
                          })}
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{ 
                            fontWeight: 600,
                            color: '#111827',
                            mb: 2
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ 
                            lineHeight: 1.6,
                            color: '#6b7280'
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Footer */}
      <Box
        sx={{
          py: 8,
          borderTop: '1px solid #e5e7eb',
          bgcolor: '#111827'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EarthIcon sx={{ fontSize: 28, color: '#3b82f6' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                  Earthquake Visualizer
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#9ca3af', lineHeight: 1.6 }}
              >
                Real-time earthquake visualization and analysis platform for educational purposes.
                Data provided by USGS Earthquake Hazards Program.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#9ca3af', mb: 2 }}
                >
                  Built for students, researchers, and seismology enthusiasts
                </Typography>
                <Stack direction="row" spacing={2} sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Chip 
                    label="Open Source" 
                    size="small" 
                    sx={{ bgcolor: '#374151', color: '#d1d5db' }}
                  />
                  <Chip 
                    label="Educational" 
                    size="small" 
                    sx={{ bgcolor: '#374151', color: '#d1d5db' }}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: '#374151' }} />
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: '#6b7280' }}
          >
            © 2024 Earthquake Visualizer. Built with React and Material-UI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;