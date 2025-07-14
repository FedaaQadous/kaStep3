 import { FormControl, Typography , Box , Button , Card ,RadioGroup , FormControlLabel , Radio } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
 
 function Cheakout() {

  const[paymentMethod,setPaymentMethod]=useState('Visa');
  const handlePaymentMethod =(event)=> {
    setPaymentMethod(event.target.value)
    
  }

  const handlePay = async ()=>{
    const token =localStorage.getItem("userToken");
    const response =await axios.post(`https://mytshop.runasp.net/api/CheckOuts/Pay`,{
      PaymentMethod :paymentMethod,},
      {
        headers:{
        Authorization:`Bearer ${token}`
      }
    }
    )


    if(paymentMethod =='Visa'){
      location.href=response.data.url
    }
  }
  

   return (
    <Box>
      <Card sx={{p:4}}>
        <Typography variant='h3'>Checkout</Typography>
        <FormControl>
          <Typography variant='h4'>select payment method</Typography>
          <RadioGroup value={paymentMethod} onChange={handlePaymentMethod}>
    <FormControlLabel value="Visa" control={<Radio />} label="visa" />
    <FormControlLabel value="Cash" control={<Radio />} label="Cash On Delivery" />
    
  </RadioGroup>
        </FormControl>
        <Button onClick={handlePay} fullWidth variant="contained">Confirm Payment</Button>
      </Card>
    </Box>
   )
 }
 
 export default Cheakout