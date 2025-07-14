import React from 'react';
import { useParams } from 'react-router';
import Loader from '../../components/shared/Loader';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosAuth from '../../api/axiosAuth.jsx';

function Product() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const fetchProduct = async () => {
    const { data } = await axiosAuth.get(`/products/${id}`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProduct,
    staleTime: 5000,
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId) => axiosAuth.post(`/Carts/${productId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
    onError: (error) => {
      console.error('Error:', error.message);
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{data.name}</Typography>
        <Typography variant="body1" gutterBottom>{data.description}</Typography>
        <Typography variant="h6" color="primary" gutterBottom>Price: ${data.price}</Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => addToCartMutation.mutate(data.id)}
          disabled={addToCartMutation.isPending}
        >
          {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default Product;
