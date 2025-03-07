"use client"; // Ensures styles work correctly on the client side

import React from "react";
import { Box, List, Drawer, ThemeProvider, createTheme, CssBaseline, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { MENU_ITEMS } from "./constants/menu";
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function ThemeRegistry(props: { children: React.ReactNode }) {
  const { children } = props;
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 260,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 260, boxSizing: 'border-box' },
          }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight='800' letterSpacing={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
              <ShowChartIcon sx={{ color: '#2e7d32' }} />
              <span style={{ color: '#2e7d32' }}>Cash</span>
              <span style={{ color: '#5d4037' }}>Flow</span>
            </Typography>
          </Toolbar>
          <Box sx={{ overflow: 'auto' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexDirection: 'column' }}>
                <Box
                  component="img"
                  src="https://avatars.githubusercontent.com/u/12746886?v=4"
                  alt="User Avatar"
                  sx={{
                    width: 75,
                    height: 75,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    mr: 2
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" align="center">Muthupandi Velmurugan</Typography>
                  <Typography variant="body2" color="text.secondary" align="center">pearlpandzz@gmail.com</Typography>
                </Box>
              </Box>
              <Box sx={{ 
                p: 1.5, 
                bgcolor: 'primary.main', 
                borderRadius: 1,
                color: 'white'
              }}>
                <Typography variant="caption">Current Balance</Typography>
                <Typography variant="h6" fontWeight="bold">$5,240.00</Typography>
              </Box>
            </Box>
            <List>
              {MENU_ITEMS.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => router.push(item.path)}>
                    <ListItemIcon>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
