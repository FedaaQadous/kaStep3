import axios from 'axios';
import { React } from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Box,CardMedia,Chip,Rating,useTheme} from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../shared/Loader';
import axiosAuth from '../../api/axiosAuth.jsx'

function Products() {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  
  const fetchProducts = async () => {
    const { data } =  await axiosAuth.get('products');
     
    return data;
  };

  const { error, isError, isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <Loader />;
  
  const products = data?.data ?? [];

  return (
    <Box sx={{ 
      padding: '40px 20px',
      backgroundColor: '#f8f9fa'
    }}>
      <Typography variant="h4" sx={{
        textAlign: 'center',
        mb: 4,
        fontWeight: 'bold',
        color: 'text.primary',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '4px',
          backgroundColor: primaryColor,
          borderRadius: '2px'
        }
      }}>
        Our Products
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.mainImg}
                  alt={product.name}
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                  }}
                />
                {product.discount && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    color="error"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{
                  fontWeight: 600,
                  height: '64px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.name}
                </Typography>
                
                <Rating
                  value={product.rating || 4}
                  precision={0.5}
                  readOnly
                  sx={{ mb: 1 }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${product.price}
                  </Typography>
                  {product.originalPrice && (
                    <Typography variant="body2" sx={{ 
                      textDecoration: 'line-through',
                      color: 'text.secondary'
                    }}>
                      ${product.originalPrice}
                    </Typography>
                  )}
                </Box>
              </CardContent>

              <CardActions sx={{ 
                justifyContent: 'center',
                paddingBottom: '16px'
              }}>
                <Button
                  component={Link}
                  to={`/product/${product.id}`}
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products;