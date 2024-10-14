"use client"
import React from 'react';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, Grid, Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// إنشاء Cache لدعم RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// إعداد الـ Theme مع اتجاه RTL
const darkTheme = createTheme({
  direction: 'rtl', // إضافة اتجاه من اليمين إلى اليسار
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // اللون الأزرق
    },
    secondary: {
      main: '#f48fb1', // اللون الرمادي
    },
    background: {
      paper: '#424242', // الخلفية الداكنة
    },
  },
  typography: {
    fontFamily: 'Tajawal, Arial, sans-serif', // تحديد خط مناسب للغة العربية
  },
});

export default function ProductForm() {
  const [category, setCategory] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [quantity, setQuantity] = React.useState('');

  const handleSave = () => {
    // منطق الحفظ هنا
    console.log({ category, productName, price, quantity });
  };

  const handleCancel = () => {
    // منطق الإلغاء هنا
    setCategory('');
    setProductName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth="sm">
          <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>اختر القسم</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="electronics">الإلكترونيات</MenuItem>
                    <MenuItem value="clothing">الملابس</MenuItem>
                    <MenuItem value="home_appliances">الأجهزة المنزلية</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="اسم المنتج"
                  fullWidth
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="السعر"
                  type="number"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="الكمية"
                  type="number"
                  fullWidth
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSave}
                >
                  حفظ
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleCancel}
                >
                  إلغاء
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
