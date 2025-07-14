import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './../../context/ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PersonIcon from '@mui/icons-material/Person';
import axiosAuth from '../../api/axiosAuth.jsx';

const pagesGuest = ['Register', 'login'];
const pagesAuth = ['Cart'];

function Navbar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("userToken"));

  const { mode, toggleTheme } = React.useContext(ThemeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // إعدادات القائمة المنسدلة للمستخدم (معدلة حسب طلبك)
  const settings = isLoggedIn
    ? [
        { 
          name: 'Profile', 
          action: () => navigate('/profile') 
        },
        { 
          name: 'Logout', 
          action: handleLogout 
        }
      ]
    : [
        { 
          name: 'Login', 
          action: () => navigate('/login') 
        }
      ];

  const fetchCartItems = async () => {
    const { data } = await axiosAuth.get('/Carts');
    return data;
  };

  useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
    staleTime: 10000,
  });

  const data = queryClient.getQueryData(['cartItems']);
  const cartItems = data?.cartResponse?.length ?? 0;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout() {
    localStorage.removeItem("userToken");
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* شعار للشاشات الكبيرة */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* قائمة للشاشات الصغيرة */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={`/${page.toLowerCase()}`}
                >
                  <Typography textAlign="center">
                    {page === 'Cart' ? `Cart (${cartItems})` : page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* شعار للشاشات الصغيرة */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* قائمة للشاشات الكبيرة */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(isLoggedIn ? pagesAuth : pagesGuest).map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page === 'Cart' ? `Cart (${cartItems})` : page}
              </Button>
            ))}
          </Box>

          {/* الجزء الأيمن من النافبار */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {/* زر تغيير الثيم */}
            <IconButton onClick={toggleTheme} sx={{ color: 'white', mr: 1 }}>
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>

            {/* قائمة المستخدم المنسدلة */}
            <Tooltip title="User menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  alt="User Avatar" 
                  src={isLoggedIn ? "/static/images/avatar/2.jpg" : ""}
                  sx={{ bgcolor: isLoggedIn ? '' : 'secondary.main' }}
                >
                  {!isLoggedIn && <PersonIcon />}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting.name} 
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.action();
                  }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;