"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#2d2d2d",
    color: "white",
    padding: "20px",
    direction: "rtl",
    borderRadius: "12px",
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    backgroundColor: "#454545",
    color: "white",
    padding: "10px",
    borderRadius: "4px",
    textAlign: "center",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#555555",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
  },
}));

export default function WarehouseModal() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([
    { name: "", quantity: "", price: "" },
  ]);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (open && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [open]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddProduct = () => {
    setProducts([...products, { name: "", quantity: "", price: "" }]);
  };

  useEffect(() => {
    if (inputRefs.current[products.length - 1]) {
      inputRefs.current[products.length - 1].focus();
    }
  }, [products]);

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  return (
    <div style={{ direction: "rtl", fontFamily:"system-ui" }}>
      <Button style={{fontFamily:"system-ui" }} variant="contained" color="primary" onClick={handleClickOpen}>
         اضافة كميات
      </Button>
      <CustomDialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        style={{ width: "110%", marginLeft: "-5%" }}
      >
        <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>
          إضافة إلى المخزن
        </DialogTitle>
        <DialogContent
          style={{
            width: "105%",
            marginLeft: "-5%",
            position: "relative",
            left: "4%",
          }}
        >
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            {/* رؤوس الأعمدة */}
            <Grid
              item
              xs={1}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              #
            </Grid>
            <Grid
              item
              xs={5}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              اسم المنتج
            </Grid>
            <Grid
              item
              xs={3}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              الكمية
            </Grid>
            <Grid
              item
              xs={3}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              السعر
            </Grid>

            {/* الحقول الديناميكية لإدخال البيانات */}
            {products.map((product, index) => (
              <React.Fragment key={index}>
                <Grid
                  item
                  xs={1}
                  style={{ textAlign: "center", color: "white" }}
                >
                  {index + 1}
                </Grid>
                <Grid item xs={5}>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    value={product.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    placeholder="اسم المنتج"
                    inputRef={(el) => (inputRefs.current[index] = el)} // تعيين المرجع لكل حقل
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    value={product.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    placeholder="الكمية"
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    value={product.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    placeholder="السعر"
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </DialogContent>

        {/* زر إضافة المنتج في الأسفل */}
        <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
          <IconButton
            onClick={handleAddProduct}
            style={{
              backgroundColor: "#fbb040", // لون زر أنيق
              color: "black", // لون الأيقونة
              padding: "10px", // حشوة صغيرة لتقليل حجم الزر
              borderRadius: "50%", // لجعل الزر دائري
              fontSize: "1.5rem", // حجم الأيقونة
              position: "relative",
            }}
          >
            <AddCircleIcon style={{ fontSize: "2rem" }} />{" "}
            {/* الأيقونة مع حجم مناسب */}
          </IconButton>
        </Grid>

        <DialogActions
          style={{ justifyContent: "space-between", padding: "16px" }}
        >
          <Button onClick={handleClose} variant="contained" color="error">
            إلغاء
          </Button>
          <Button variant="contained" color="primary">
            حفظ البيانات
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
