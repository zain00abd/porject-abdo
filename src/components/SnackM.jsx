"use client"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const SnackM = () => {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  
  const handleClose = () => {
    setState({ ...state, open: false });
  };



  return (
    <Box sx={{ width: 300 }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
  <Alert
  
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    تم بنجاح اضافة الكميات الى المخزن
  </Alert>
</Snackbar>
    </Box>
  );
}

export default SnackM;
