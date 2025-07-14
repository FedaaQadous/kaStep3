import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuth';
import { TextField, Button, Container, Typography, Alert, CircularProgress } from '@mui/material';

function ChangePassword() {

    const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

 
  const [errors, setErrors] = useState({});

  
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (passwordsData) => {
      return axiosAuth.patch('/Account/ChangePassword', {
        OldPassword: passwordsData.oldPassword,
        NewPassword: passwordsData.newPassword,
        ConfirmNewPassword: passwordsData.confirmPassword
      });
    },
    onSuccess: () => {
     
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  });

 
  const validate = () => {
    const newErrors = {};
    
    if (!passwords.oldPassword) newErrors.oldPassword = 'Current password is requiered';
    if (!passwords.newPassword) newErrors.newPassword = 'New password is requiered';
    if (passwords.newPassword.length < 6) newErrors.newPassword = 'min length>6';
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'not matched';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      mutate(passwords); 
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>
      
    
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.response?.data?.message || 'error'}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
       
        <TextField
          fullWidth
          label="current password"
          name="oldPassword"
          type="password"
          value={passwords.oldPassword}
          onChange={handleChange}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          sx={{ mb: 2 }}
        />
        
      
        <TextField
          fullWidth
          label="New password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={handleChange}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          sx={{ mb: 2 }}
        />
        
        
        <TextField
          fullWidth
          label="confirmPassword"
          name="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ mb: 2 }}
        />
        
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          size="large"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            ' save change'
          )}
        </Button>
      </form>
    </Container>
  );
}

export default ChangePassword;