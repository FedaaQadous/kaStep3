import {
  Box, CardContent, CardMedia, Grid, Typography,
  Card, IconButton, Button, Divider
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Loader from '../../components/shared/Loader';
import axiosAuth from '../../api/axiosAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function Cart() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const res = await axiosAuth.get('/Carts');
      return res.data;
    },
    staleTime: 0,
  });

  const increaseMutation = useMutation({
    mutationFn: (id) => axiosAuth.patch(`/Carts/increaseCount/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['cartItems']),
  });

  const decreaseMutation = useMutation({
    mutationFn: (id) => axiosAuth.patch(`/Carts/decreaseCount/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['cartItems']),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosAuth.delete(`/Carts/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['cartItems']),
  });

  const clearCartMutation = useMutation({
    mutationFn: () => axiosAuth.delete('/Carts/clearCart'),
    onSuccess: () => queryClient.invalidateQueries(['cartItems']),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error... {error.message}</p>;

  const totalItems = data.cartResponse.reduce((total, item) => total + item.count, 0);
  const totalPrice = data.cartResponse.reduce((total, item) => total + (item.price * item.count), 0);

  const recommendedProducts = Array(4).fill({
    name: "Product Name",
    description: "Product Description",
    price: "00.00$",
    image: "/categorys.png",
  });

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">Shopping Cart</Typography>

      <Button
        variant="outlined"
        color="error"
        onClick={() => clearCartMutation.mutate()}
        sx={{ mb: 3 }}
      >
        Clear Cart
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {data.cartResponse.map((product) => (
            <Card key={product.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                image="/categorys.png"
                alt={product.name}
                sx={{ width: 150, height: 150, objectFit: 'contain', borderRadius: 2, mr: 3 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                <Typography variant="body1" color="text.secondary">${product.price}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => decreaseMutation.mutate(product.id)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => increaseMutation.mutate(product.id)}>
                  <AddIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deleteMutation.mutate(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Order Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>Total Items: {totalItems}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Total Price: ${totalPrice.toFixed(2)}</Typography>
            <Button variant="contained" fullWidth component={Link} to="/checkout" sx={{ borderRadius: 2 }}>
              Process to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Recommended Products */}
      <Box mt={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">Recommended for you</Typography>
          <Button size="small" sx={{ textTransform: 'none' }}>See all</Button>
        </Box>
        <Grid container spacing={2}>
          {recommendedProducts.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ position: 'relative', boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ height: 180, objectFit: 'cover' }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: '#fff',
                    zIndex: 1,
                  }}
                >
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
                <CardContent>
                  <Typography fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                  <Typography variant="subtitle2" color="text.primary">{item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Cart;
