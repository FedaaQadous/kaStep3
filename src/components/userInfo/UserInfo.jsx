import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuth';
import {Box,Paper,Typography,TextField,Button,Divider,CircularProgress,Alert,} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';

const UserInfo = () => {
  const { data: userInfo, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data } = await axiosAuth.get('/Account/userinfo');
      return data;
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (updatedData) => axiosAuth.put('/Account/update', updatedData),
  });

  const [editMode, setEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  React.useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setEditMode(false);
  };

 if (isLoading) return <Loader/>;
  if (error) return <p>Error:{error.message}</p>;

  return (
    <Paper
      elevation={0}
      sx={{
        
        p: 2,
        maxWidth: 648,
        mx: 'auto',
        border: '1px solid #90caf9',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          fontSize: '1.5rem',
        }}
      >
        My Profile
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              color: '#666',
              mb: 1,
            }}
          >
            First Name
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              name="firstName"
              size="small"
              value={formData.firstName}
              onChange={handleChange}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem' }}
            >
              {userInfo.firstName}
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              color: '#666',
              mb: 1,
            }}
          >
            Last Name
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              name="lastName"
              size="small"
              value={formData.lastName}
              onChange={handleChange}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem' }}
            >
              {userInfo.lastName}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Email */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 'bold',
            color: '#666',
            mb: 1,
          }}
        >
          Email
        </Typography>
        {editMode ? (
          <TextField
            fullWidth
            name="email"
            size="small"
            value={formData.email}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            {userInfo.email}
          </Typography>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 'bold',
            color: '#666',
            mb: 1,
          }}
        >
          Password
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.1rem',
            letterSpacing: '2px',
          }}
        >
          **********
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {editMode ? (
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: '4px',
            }}
            disabled={isUpdating}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setEditMode(true)}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: '4px',
            }}
          >
            Edit
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default UserInfo;
