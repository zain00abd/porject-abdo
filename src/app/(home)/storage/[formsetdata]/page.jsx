"use client";
import React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import Head from "components/Head";
import AddIcon from "@mui/icons-material/Add"; // أيقونة لإضافة قسم جديد
import { useState, useEffect } from "react";
import Footer from "components/Footer";
import "../stylehandel.css";
import { GetData } from "app/helpers/GetData";

// إنشاء Cache لدعم RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// إعداد الـ Theme مع اتجاه RTL
const darkTheme = createTheme({
  direction: "rtl", // إضافة اتجاه من اليمين إلى اليسار

  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // اللون الأزرق
    },
    secondary: {
      main: "#f48fb1", // اللون الرمادي
    },
    background: {
      paper: "#424242", // الخلفية الداكنة
    },
  },
  typography: {
    fontFamily: "Tajawal, Arial, sans-serif", // تحديد خط مناسب للغة العربية
  },
});

export default function ProductForm() {
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryField, setShowNewCategoryField] = useState(false); // التحكم في إظهار حقل القسم الجديد
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [arrdata, setarrdata] = useState(null);
  const [valueinpproduct, setvalueinpproduct] = useState(null);

  const [louk, setlouk] = useState(false);

  const [selectarr, setselectarr] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      const dataall = await GetData();
      const arrstorage = dataall.storage;
      setarrdata(arrstorage);
      console.log(arrstorage);

      const arrselect = arrstorage.map((item) => {
        // console.log(item.sectionName);

        return item.sectionName;
      });
      // console.log(arrselect);
      setselectarr(arrselect);
    };

    getdata();
  }, []);

  // const selectarr = [" خيط "," قماش "," خشب "," مطاط ",]

  const handleSave = async () => {
    // منطق الحفظ هنا
    const selectedCategory = showNewCategoryField ? newCategory : category;
    console.log({ selectedCategory, productName, price, quantity });

    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/setstorage`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sectionName: selectedCategory,
        product: {
          name: productName,
          price: price,
          quantity: quantity,
        },
      }),
    });

    // const dataFromBackend = await response.json();
  };

  const handleCancel = () => {
    // منطق الإلغاء هنا
    setCategory("");
    setNewCategory("");
    setProductName("");
    setPrice("");
    setQuantity("");
    setShowNewCategoryField(false);
  };

  const handleAddNewCategory = () => {
    setShowNewCategoryField(true); // عرض حقل القسم الجديد عند الضغط على الزر
    setCategory(""); // إزالة القسم المختار إذا كان موجودًا
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
    setShowNewCategoryField(false);

    cheackExistProduct(valueinpproduct, e.target.value);
    console.log(valueinpproduct);
  };

  const cheackExistProduct = (value, categorycheack) => {
    console.log("323243 ");

    setvalueinpproduct(value);

    arrdata.some((item) => {
      let selectedCategory;
      if (categorycheack) {
        selectedCategory = categorycheack;
      } else {
        selectedCategory = showNewCategoryField ? newCategory : category;
      }

      if (selectedCategory == item.sectionName) {
        const productExists = item.products.some(
          (arrname) => value === arrname.name
        );

        if (productExists) {
          console.log("already exist product");
          setlouk(true);
        } else {
          setlouk(false);
          console.log("no exist product");
        }

        return productExists; // توقف عن التكرار عند العثور على المنتج
      }

      return false; // الاستمرار في التكرار إذا لم يكن القسم متطابقًا
    });
  };

  return (
    <>
      <Head />
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={darkTheme}>
          <Container maxWidth="sm">
            <Paper style={{ padding: "20px", marginTop: "20px" }}>
              <Grid container spacing={3}>
                {/* اختيار القسم مع زر لإضافة قسم جديد */}
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel>اختر القسم</InputLabel>
                    <Select
                      value={category}
                      onChange={handleCategoryChange}
                      className="select"
                    >
                      {selectarr &&
                        selectarr.map((item, index) => (
                          <MenuItem key={index} value={`${item}`}>
                            {item}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  {/* زر إضافة قسم جديد أكثر وضوحًا */}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />} // إضافة الأيقونة قبل النص
                    onClick={handleAddNewCategory}
                    fullWidth
                  >
                    قسم جديد
                  </Button>
                </Grid>

                {/* حقل نصي لإنشاء قسم جديد يظهر فقط عند الضغط على زر إضافة */}
                {showNewCategoryField && (
                  <Grid item xs={12}>
                    <TextField
                      label="اسم القسم الجديد"
                      fullWidth
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    label="اسم المنتج"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    onKeyUp={(e) => cheackExistProduct(e.target.value)}
                  />
                </Grid>
                <small
                  className={`text-danger ${louk ? "d-block" : "d-none"}`}
                  style={{
                    width: "100%",
                    marginRight: "25px",
                    marginTop: "10px",
                    textAlign: "end",
                  }}
                >
                  {" "}
                  !! هذا المنتج موجود بالفعل في هذا القسم{" "}
                </small>

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
                    disabled={louk}
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
      <Footer />
    </>
  );
}
