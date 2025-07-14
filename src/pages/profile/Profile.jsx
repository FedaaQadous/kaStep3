import * as React from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container, Toolbar, Avatar, Typography, Divider } from '@mui/material';
import { Person, ShoppingBag, Lock, Logout } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuth';
import Loader from '../../components/shared/Loader.jsx'
const drawerWidth = 240;

export default function Profile() {
  const navigate = useNavigate();

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data } = await axiosAuth.get('/Account/userinfo');
      return data;
    }
  });

  if (isLoading) return <Loader/>;
  if (error) return <p>Error:{error.message}</p>;

  const menuItems = [
    { text: 'My Profile', icon: <Person />, path: 'info' },
    { text: 'My Orders', icon: <ShoppingBag />, path: 'orders' },
    { text: 'Change Password', icon: <Lock />, path: 'change-password' },
    { text: 'Log out', icon: <Logout />, action: handleLogout }
  ];

  function handleLogout() {
    localStorage.removeItem("userToken");
    navigate('/login');
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      <CssBaseline />
      
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#ffffff',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            height: 'calc(100vh - 64px)', 
            top: '64px', 
            position: 'static',
            overflowY: 'auto',
            '&::-webkit-scrollbar': { 
              width: '0.4em', },

            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar 
            sx={{ 
              width: 60,
              height: 60, 
              mb: 1,
              bgcolor: 'primary.main',
              fontSize: '1.5rem'
            }}
          >
            {userData?.firstName?.charAt(0)}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {userData?.firstName} {userData?.lastName}
          </Typography>
          
        </Box>
        
        <Divider sx={{ my: 0.5 }} />
        
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => item.action ? item.action() : navigate(item.path)}
                sx={{
                  borderRadius: '6px',
                  py: 1,
                  '&:hover': { backgroundColor: '#f0f0f0' },
                  '&.Mui-selected': { 
                    backgroundColor: 'primary.light',
                    color: 'primary.main'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: '36px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: 'medium',
                    fontSize: '0.9rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

     
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          marginLeft: `${drawerWidth}px`, 
          width: `calc(100% - ${drawerWidth}px)`,
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          position: 'relative',
          top: '64px'
        }}
      >
        <Container maxWidth="lg" sx={{ bgcolor: '#fff', p: 2, borderRadius: '8px' }}>
          <Outlet context={{ userData }} />
        </Container>
      </Box>
    </Box>
  );
}