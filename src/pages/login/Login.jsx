import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axiosAuth from '../../api/axiosAuth.jsx';
import {Box,TextField,Button,Typography,CircularProgress,InputAdornment,Snackbar,Alert,} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

  const loginMutation = useMutation({
    mutationFn: (loginData) => axiosAuth.post('Account/Login', loginData),
    onSuccess: (response) => {
      localStorage.setItem("userToken", response.data.token);
      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => navigate('/'), 1000);
    },
    onError: (error) => {
      console.error('Login error:', error);
      setSnackbar({ open: true, message: 'Login failed! Check your credentials.', severity: 'error' });
    }
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 3, fontWeight: 'bold' }}
        >
          KA STORE
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <Box sx={{ m: 1, textAlign: 'right' }}>
            <Link to="/forgotpassword" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Forget Password?
            </Link>
          </Box>
        </form>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
