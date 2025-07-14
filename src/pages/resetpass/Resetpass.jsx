import React from 'react';
import {Box,TextField,Button,Typography,InputAdornment} from '@mui/material';
import {Email as EmailIcon,Lock as LockIcon, Code as CodeIcon} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Resetpass() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const sendCode = async (values) => {
    const response = await axios.patch('https://mytshop.runasp.net/api/Account/SendCode', values);
    navigate('/Login');
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
        backgroundPosition: 'center'
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
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3
          }}>
            KA STORE
          </Typography>
          
          <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
            Reset Password
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit(sendCode)}>
            <TextField
              {...register('email')}
              label="Email"
              type="email"
              fullWidth
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
              {...register('code')}
              label="Code"
              type="text"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CodeIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              {...register('password')}
              label="New Password"
              type="password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              {...register('ConfirmPassword')}
              label="Confirm Password"
              type="password"
              fullWidth
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
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Resetpass;