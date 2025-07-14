import React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import {
  Instagram,
  Facebook,
  Twitter,
  YouTube,
  Phone,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import styles from './Footer.module.css';

function Footer() {
  return (
    <Box className={styles.footerWrapper}>
      <Box className={styles.footerTop}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className={styles.footerTitle}>Follow Us</Typography>
            <Box className={styles.socialIcons}>
              <IconButton><Instagram /></IconButton>
              <IconButton><Facebook /></IconButton>
              <IconButton><Twitter /></IconButton>
              <IconButton><YouTube /></IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" className={styles.footerTitle}>Our Product</Typography>
            <ul className={styles.footerList}>
              <li>All Products</li>
              <li>Laptops</li>
              <li>Headphones</li>
              <li>Smartphones</li>
              <li>PlayStation</li>
              <li>Smartwatch</li>
            </ul>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" className={styles.footerTitle}>Links</Typography>
            <ul className={styles.footerList}>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund & Return Policy</li>
            </ul>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" className={styles.footerTitle}>Site Pages</Typography>
            <ul className={styles.footerList}>
              <li>Homepage</li>
              <li>About KA Store</li>
              <li>Shop</li>
              <li>Contact Us</li>
            </ul>
          </Grid>
        </Grid>
      </Box>

      <Divider className={styles.divider} />

      <Box className={styles.footerBottom}>
        <Box className={styles.footerLeft}>
          <AccessTime fontSize="small" />
          <Typography>Sunday to Thursday | 09 AM — 07 PM</Typography>
          <IconButton><Phone /></IconButton>
          <Button variant="contained" className={styles.locationBtn} startIcon={<LocationOn />}>
            Location
          </Button>
        </Box>
        <Typography className={styles.copyRight}>
          KA Store © 2025 | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
