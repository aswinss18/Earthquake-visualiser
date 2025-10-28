/**
 * Landing Page Component
 * Modern landing page with user guide
 */

import React from "react";
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
  Divider,
} from "@mui/material";
import {
  Public as EarthIcon,
  Timeline as AnalyticsIcon,
  Map as MapIcon,
  Notifications as AlertIcon,
  TrendingUp as TrendIcon,
  Security as SafetyIcon,
  PlayArrow as PlayIcon,
} from "@mui/icons-material";
import SimpleGlobe3D from "../components/SimpleGlobe3D";

const LandingPage = ({ onGetStarted, onShowUserGuide }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Floating objects animation keyframes
  const floatingAnimation = {
    '@keyframes float1': {
      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
      '50%': { transform: 'translateY(-20px) rotate(180deg)' },
    },
    '@keyframes float2': {
      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
      '50%': { transform: 'translateY(-15px) rotate(-180deg)' },
    },
    '@keyframes float3': {
      '0%, 100%': { transform: 'translateY(0px) scale(1)' },
      '50%': { transform: 'translateY(-25px) scale(1.1)' },
    },
    '@keyframes pulse': {
      '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
      '50%': { opacity: 1, transform: 'scale(1.05)' },
    },
    '@keyframes drift': {
      '0%': { transform: 'translateX(0px) translateY(0px)' },
      '25%': { transform: 'translateX(10px) translateY(-10px)' },
      '50%': { transform: 'translateX(-5px) translateY(-20px)' },
      '75%': { transform: 'translateX(-10px) translateY(-10px)' },
      '100%': { transform: 'translateX(0px) translateY(0px)' },
    },
  };

  const features = [
    {
      icon: <EarthIcon />,
      title: "Real-time Data",
      description: "Live earthquake data from USGS with automatic updates",
      color: "#3b82f6",
    },
    {
      icon: <MapIcon />,
      title: "Interactive Maps",
      description: "Visualize seismic activity on detailed interactive maps",
      color: "#10b981",
    },
    {
      icon: <AnalyticsIcon />,
      title: "Advanced Analytics",
      description: "Comprehensive statistics and trend analysis",
      color: "#8b5cf6",
    },
    {
      icon: <AlertIcon />,
      title: "Smart Alerts",
      description: "Get notified about significant seismic events",
      color: "#f59e0b",
    },
    {
      icon: <TrendIcon />,
      title: "Historical Trends",
      description: "Analyze patterns and trends in earthquake activity",
      color: "#ef4444",
    },
    {
      icon: <SafetyIcon />,
      title: "Educational Focus",
      description: "Perfect for students and seismology enthusiasts",
      color: "#06b6d4",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        ...floatingAnimation,
      }}
    >
      {/* Floating Background Objects */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          bgcolor: "rgba(59, 130, 246, 0.1)",
          animation: "float1 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "8%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: "rgba(16, 185, 129, 0.15)",
          animation: "float2 8s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "3%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "rgba(139, 92, 246, 0.08)",
          animation: "float3 10s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "15%",
          width: 50,
          height: 50,
          borderRadius: "50%",
          bgcolor: "rgba(245, 158, 11, 0.12)",
          animation: "pulse 4s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "85%",
          width: 35,
          height: 35,
          borderRadius: "50%",
          bgcolor: "rgba(239, 68, 68, 0.1)",
          animation: "drift 12s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "85%",
          left: "20%",
          width: 25,
          height: 25,
          borderRadius: "50%",
          bgcolor: "rgba(6, 182, 212, 0.15)",
          animation: "float1 7s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      
      {/* Seismic Wave Rings */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "25%",
          width: 120,
          height: 120,
          border: "2px solid rgba(59, 130, 246, 0.2)",
          borderRadius: "50%",
          animation: "pulse 8s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "75%",
          right: "5%",
          width: 90,
          height: 90,
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: "50%",
          animation: "float2 9s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      
      {/* Geometric patterns */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "15%",
          width: 0,
          height: 0,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "25px solid rgba(245, 158, 11, 0.15)",
          animation: "float3 7s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "30%",
          width: 30,
          height: 30,
          bgcolor: "rgba(139, 92, 246, 0.1)",
          transform: "rotate(45deg)",
          animation: "drift 9s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      

      {/* Navigation Bar */}
      <Box
        sx={{
          borderBottom: "1px solid #e5e7eb",
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(10px)",
          bgcolor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EarthIcon sx={{ fontSize: 32, color: "#3b82f6" }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#1f2937" }}
              >
                Earthquake Visualizer
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="text"
                onClick={onShowUserGuide}
                sx={{ color: "#6b7280", textTransform: "none" }}
              >
                User Guide
              </Button>
              <Button
                variant="contained"
                onClick={onGetStarted}
                startIcon={<PlayIcon />}
                sx={{
                  bgcolor: "#3b82f6",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  "&:hover": { bgcolor: "#2563eb" },
                }}
              >
                Launch App
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}>

        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <div>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip
                    label="Real-time Data"
                    size="small"
                    sx={{
                      bgcolor: "#dbeafe",
                      color: "#1e40af",
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    label="Educational"
                    size="small"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#166534",
                      fontWeight: 500,
                    }}
                  />
                </Stack>

                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: "#111827",
                    mb: 3,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                  }}
                >
                  Visualize Earth's
                  <Box
                    component="span"
                    sx={{ color: "#3b82f6", display: "block" }}
                  >
                    Seismic Activity
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  paragraph
                  sx={{
                    mb: 4,
                    lineHeight: 1.6,
                    color: "#6b7280",
                    fontWeight: 400,
                    maxWidth: 500,
                  }}
                >
                  Explore real-time earthquake data from USGS with interactive
                  maps, comprehensive analytics, and educational insights for
                  students and researchers.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mb: 6 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onGetStarted}
                    startIcon={<PlayIcon />}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      bgcolor: "#3b82f6",
                      color: "white",
                      textTransform: "none",
                      boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.3)",
                      "&:hover": {
                        bgcolor: "#2563eb",
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.4)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={onShowUserGuide}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      borderColor: "#d1d5db",
                      color: "#374151",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#9ca3af",
                        bgcolor: "#f9fafb",
                      },
                    }}
                  >
                    View Guide
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ color: "#9ca3af", fontSize: "0.875rem" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#10b981",
                      }}
                    />
                    Live USGS Data
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#3b82f6",
                      }}
                    />
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 400, md: 500 },
                  position: "relative",
                }}
              >
                {/* Background decoration with floating elements */}
                <Box
                  sx={{
                    position: "absolute",
                    width: 450,
                    height: 450,
                    borderRadius: "50%",
                  }}
                />
                
                {/* Floating seismic indicators around globe */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#ef4444",
                    animation: "pulse 3s ease-in-out infinite",
                    boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "20%",
                    right: "15%",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#f59e0b",
                    animation: "float1 4s ease-in-out infinite",
                    boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "25%",
                    left: "20%",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: "#10b981",
                    animation: "float2 5s ease-in-out infinite",
                    boxShadow: "0 0 18px rgba(16, 185, 129, 0.4)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    right: "25%",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "#3b82f6",
                    animation: "drift 6s ease-in-out infinite",
                    boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
                  }}
                />

                {/* 3D Globe */}
                <Box
                  sx={{
                    width: { xs: 350, md: 400 },
                    height: { xs: 350, md: 400 },
                    position: "relative",
                    zIndex: 2,
                    overflow: "hidden",
                    borderRadius: "40%",
                  }}
                >
                  <SimpleGlobe3D />
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: "#fafafa", py: 12, position: "relative" }}>
        {/* Additional floating elements for features section */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "2%",
            width: 30,
            height: 30,
            borderRadius: "50%",
            bgcolor: "rgba(139, 92, 246, 0.1)",
            animation: "float3 8s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            right: "5%",
            width: 45,
            height: 45,
            borderRadius: "50%",
            bgcolor: "rgba(59, 130, 246, 0.08)",
            animation: "pulse 6s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
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
                  color: "#111827",
                }}
              >
                Powerful Features
              </Typography>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{
                  mb: 8,
                  color: "#6b7280",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                Everything you need to understand and visualize seismic activity
                around the world
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
                        height: "100%",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                        },
                        borderRadius: 3,
                        border: "none",
                        bgcolor: "white",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        overflow: "visible",
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: "center" }}>
                        <Box
                          sx={{
                            mb: 3,
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            bgcolor: `${feature.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                          }}
                        >
                          {React.cloneElement(feature.icon, {
                            sx: { fontSize: 32, color: feature.color },
                          })}
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            color: "#111827",
                            mb: 2,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.6,
                            color: "#6b7280",
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
          borderTop: "1px solid #e5e7eb",
          bgcolor: "#111827",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle floating elements in footer */}
        <Box
          sx={{
            position: "absolute",
            top: "30%",
            left: "10%",
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: "rgba(59, 130, 246, 0.2)",
            animation: "float1 10s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: 15,
            height: 15,
            borderRadius: "50%",
            bgcolor: "rgba(16, 185, 129, 0.15)",
            animation: "drift 8s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <EarthIcon sx={{ fontSize: 28, color: "#3b82f6" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "white" }}
                >
                  Earthquake Visualizer
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#9ca3af", lineHeight: 1.6 }}
              >
                Real-time earthquake visualization and analysis platform for
                educational purposes. Data provided by USGS Earthquake Hazards
                Program.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant="body2" sx={{ color: "#9ca3af", mb: 2 }}>
                  Built for students, researchers, and seismology enthusiasts
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: { xs: "flex-start", md: "flex-end" } }}
                >
                  <Chip
                    label="Open Source"
                    size="small"
                    sx={{ bgcolor: "#374151", color: "#d1d5db" }}
                  />
                  <Chip
                    label="Educational"
                    size="small"
                    sx={{ bgcolor: "#374151", color: "#d1d5db" }}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: "#374151" }} />
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: "#6b7280" }}
          >
            © 2024 Earthquake Visualizer. Built with React and Material-UI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
