import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  InputAdornment,
  Link
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forgotpass() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const reset = async (values) => {
    try {
      const response = await axios.post('https://mytshop.runasp.net/api/Account/ForgotPassword', values);
      navigate('/resetpass');
    } catch (error) {
      console.error('Password reset request failed:', error);
    }
  };

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
            Forgot Password
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter your email to receive a password reset code
          </Typography>
          
          <Divider sx={{ mb: 3 }}>OR</Divider>
          
          <Box component="form" onSubmit={handleSubmit(reset)}>
            <TextField
              {...register('email')}
              label="Email Address"
              type="email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
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
              sx={{ 
                mb: 2,
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              Send Reset Code
            </Button>
            
            <Typography variant="body2" align="center">
              Remember your password?{' '}
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

export default Forgotpass;