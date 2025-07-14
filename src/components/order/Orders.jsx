import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box,Button,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Collapse,} from '@mui/material';
import axiosAuth from '../../api/axiosAuth'; 
import Loader from '../../components/shared/Loader.jsx'


const fetchOrders = async () => {
  const response = await axiosAuth.get('/Orders');
  console.log( response.data);
  return response.data;
};

function Orders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const [openId, setOpenId] = useState(null); 

  if (isLoading) return <Loader/>
  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <React.Fragment key={order.id}>
              <TableRow>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() =>
                      setOpenId(openId === order.id ? null : order.id)
                    }
                  >
                    {openId === order.id ? 'Hide' : 'Details'}
                  </Button>
                </TableCell>
              </TableRow>

              {openId === order.id && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1">
                          <strong>ID:</strong> {order.id}
                        </Typography>
                        <Typography variant="subtitle1">
                          <strong>Shipped Date:</strong>{' '}
                          {order.shippedDate
                            ? new Date(order.shippedDate).toLocaleDateString()
                            : 'Not available'}
                        </Typography>
                        <Typography variant="subtitle1">
                          <strong>Total Price:</strong> ${order.totalPrice}
                        </Typography>
                        <Typography variant="subtitle1">
                          <strong>Payment Method:</strong>{' '}
                          {order.paymentMethodType}
                        </Typography>
                        <Typography variant="subtitle1">
                          <strong>Carrier:</strong>{' '}
                          {order.carrier || 'Not specified'}
                        </Typography>
                        <Typography variant="subtitle1">
                          <strong>Tracking Number:</strong>{' '}
                          {order.trackingNumber || 'Not available'}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
