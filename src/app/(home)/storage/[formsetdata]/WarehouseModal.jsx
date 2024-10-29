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
  LinearProgress,
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

export default function WarehouseModal({ data }) {
  const [open, setOpen] = useState(false);

  const [newObject, setnewObject] = useState([]);
  const [isfocus, setisfocus] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [showerr, setshowerr] = useState(false);

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
    setshowerr(false);
    setisfocus(!isfocus);
  };

  useEffect(() => {
    if (
      inputRefs.current[products.length - 1] &&
      !products[products.length - 1].name &&
      !products[products.length - 1].quantity &&
      !products[products.length - 1].price
    ) {
      inputRefs.current[products.length - 1].focus();
    }

    // console.log(data)
  }, [isfocus]);

  const handleChange = (index, field, value) => {
    // console.log(newObject)

    let arrobj = newObject;

    // console.log(data)

    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    console.log(products);
    // console.log(field)
    // console.log(index)

    if (typeof value === "string") {
      console.log("1112232w");

      const section = data.find((section) =>
        section.products.some((product) => product.name === value)
      );

      if (section !== undefined) {
        let obj = {
          sectionName: section.sectionName,
          products: [updatedProducts[index]],
        };

        arrobj[index] = obj;
        console.log("yessssss");
      } else {
        arrobj[index] = null;
        setnewObject(arrobj);
      }
      console.log(section);
    }
    console.log(newObject);
    // console.log(typeof(value));
    setProducts(updatedProducts);
    // console.log(updatedProducts)
  };

  const filterNewObject = (obj) => {
    let cheackvalue = true;

    let newObjectfilter = newObject.filter(function (value, index) {
      if (value !== null) {

        let cheackprice = value.products[0].price;
        console.log(cheackprice);
        let cheackquatity = value.products[0].quantity;
        console.log(cheackquatity);

        if (!cheackprice || !cheackquatity) {
          setshowerr(true);
          cheackvalue = false;
        } else {
          setshowerr(false);
        }
      } 
      else {
        setshowerr(false);
      }
    });
    return cheackvalue;
  };

  const SubmitUpdate = async () => {
    // منطق الحفظ هنا

    let ischeack = filterNewObject();
    console.log(ischeack);

    if (ischeack) {
      setisloading(true);

      const baseURL = window.location.origin;
      const response = await fetch(`${baseURL}/api/updatestorage`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObject),
      });

      const dataFromBackend = await response.json();
      console.log(dataFromBackend);

      if (response.ok) {
        setisloading(false);
      }
    }
  };

  return (
    <>
      <div style={{ direction: "rtl", fontFamily: "system-ui" }}>
        <Button
          style={{ fontFamily: "system-ui" }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
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
                    {newObject[index] ? (
                      <>{index + 1}</>
                    ) : (
                      <small
                        className="text-danger"
                        style={{ fontWeight: "700" }}
                      >
                        {" "}
                        X{" "}
                      </small>
                    )}
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
                      autoComplete="off" // تعطيل الاقتراحات
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomTextField
                      fullWidth
                      variant="outlined"
                      type="tel"
                      value={product.quantity}
                      disabled={!newObject[index]}
                      onChange={(e) =>
                        handleChange(index, "quantity", Number(e.target.value))
                      }
                      placeholder="الكمية"
                      autoComplete="off" // تعطيل الاقتراحات
                      sx={{
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                        "& input[type=number]::-webkit-outer-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                        "& input[type=number]::-webkit-inner-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomTextField
                      fullWidth
                      variant="outlined"
                      type="tel"
                      value={product.price}
                      disabled={!newObject[index]}
                      onChange={(e) =>
                        handleChange(index, "price", Number(e.target.value))
                      }
                      placeholder="السعر"
                      autoComplete="off" // تعطيل الاقتراحات
                      sx={{
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                        "& input[type=number]::-webkit-outer-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                        "& input[type=number]::-webkit-inner-spin-button": {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </DialogContent>

          {/* زر إضافة المنتج في الأسفل */}
          {products[products.length - 1].name &&
          products[products.length - 1].price &&
          products[products.length - 1].quantity &&
          newObject[newObject.length - 1] !== null ? (
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "1rem" }}
            >
              <IconButton
                onClick={handleAddProduct}
                // @ts-ignore

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
          ) : (
            <></>
          )}

          <small className={`text-danger ${showerr ? "" : "d-none"}`}>
            {" "}
            يجب عليك اكمال المطلوب{" "}
          </small>

          <DialogActions
            style={{ justifyContent: "space-between", padding: "16px" }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              disabled={isloading}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={SubmitUpdate}
              disabled={isloading}
            >
              حفظ البيانات
            </Button>
          </DialogActions>

          {isloading && (
            <>
              <small> جار حفظ البيانات .... </small>
              <LinearProgress />
            </>
          )}
        </CustomDialog>
      </div>
    </>
  );
}
