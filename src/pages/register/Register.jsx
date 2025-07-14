import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosAuth from '../../api/axiosAuth.jsx'
import {Box,TextField,Button,Typography,Divider,Grid,InputAdornment,Link,CircularProgress} from '@mui/material';
import {Person as PersonIcon,Email as EmailIcon,Lock as LockIcon,Facebook as FacebookIcon,Apple as AppleIcon,Google as GoogleIcon} from '@mui/icons-material';

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerMutation = useMutation({
    mutationFn: (userData) => axiosAuth.post('Account/register', userData),
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('Registration error:', error);
    }
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  if (registerMutation.isLoading) return <CircularProgress />;
  if (registerMutation.isError) return <p>Error: {registerMutation.error.message}</p>;

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      
      <Box sx={{
        width: { xs: 0, md: '50%' },
        backgroundImage: 'url(/frameregister.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px'
      }} />
      
    
      <Box sx={{
        width: { xs: '100%', md: '50%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}>
        <Box sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3
            }}
          >
            KA STORE
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 1 }}>
            Create New Account
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Join us to track orders, save favorites, and get special offers.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mb: 3,
            flexWrap: 'wrap'
          }}>
            <Button 
              variant="outlined" 
              startIcon={<FacebookIcon color="primary" />}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              Facebook
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<GoogleIcon color="error" />}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              Google
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<AppleIcon />}
              sx={{ width: { xs: '100%', md: 'auto' } }}
            >
              Apple ID
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }}>OR</Divider>
          
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', { required: 'First name is required' })}
                  label="First Name"
                  type="text"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', { required: 'Last name is required' })}
                  label="Last Name"
                  type="text"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            
            <TextField
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              label="Email Address"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message || "Must be at least 8 characters long"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={registerMutation.isLoading}
              sx={{ 
                mb: 2,
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              {registerMutation.isLoading ? <CircularProgress size={24} /> : 'Create New Account'}
            </Button>
            
            <Typography variant="body2" align="center">
              Already have an Account?{' '}
              <Link 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }} 
                underline="hover"
                color="primary"
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;