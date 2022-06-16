import * as Yup from 'yup';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Card, Container, Stack, TextField, FormControlLabel, Switch, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';

const Config = require("../utils/config");

// ----------------------------------------------------------------------

export default function EditProduct() {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    name: "Biriyani",
    description: "Vin GN kk na",
    image: "",
    category: "c670252c-d06d-4307-a245-ac1a9307c37f",
    isVariant: false,
    store: "8e3d5689-83c8-4601-9115-37b577600a0d",
    price: 150,
    cgst: 1,
    sgst: 1,
    isVeg: false,
    isAvailable: true
  });

  const formik = useFormik({
    initialValues: {
      id: "2b829a92-47fa-471c-9268-3acdacb3ece1",
      name: "Biriyani",
      description: "Vin GN kk na",
      image: "",
      category: "c670252c-d06d-4307-a245-ac1a9307c37f",
      isVariant: false,
      store: "8e3d5689-83c8-4601-9115-37b577600a0d",
      price: 150,
      cgst: 1,
      sgst: 1,
      isVeg: false,
      isAvailable: true
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;


  // Fetching Products from api
  const getProducts = async () => {
    const config = {
      method: 'get',
      url: `${Config.default.BACKEND_API}/vendor/user/products`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("yummittoVendorToken")}`
      }
    };
    axios(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        const tempObj = res.data.categories.map((item) => item.products[0])
        setProductsData(tempObj);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      })
  }

  const updateProduct = async () => {
    const config = {
      method: 'get',
      url: `${Config.default.BACKEND_API}/vendor/user/products`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("yummittoVendorToken")}`
      }
    };
    axios(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        const tempObj = res.data.categories.map((item) => item.products[0])
        setProductsData(tempObj);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
      })
  }

  getProducts();

  return (
    <Page title="Edit Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Product name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />

                    <TextField
                      fullWidth
                      label="Category"
                      {...getFieldProps('category')}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                    />
                  </Stack>

                  <TextField
                    fullWidth
                    label="Descripion"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="CGST"
                      {...getFieldProps('cgst')}
                      error={Boolean(touched.cgst && errors.cgst)}
                      helperText={touched.cgst && errors.cgst}
                    />

                    <TextField
                      fullWidth
                      label="CGST"
                      {...getFieldProps('sgst')}
                      error={Boolean(touched.sgst && errors.sgst)}
                      helperText={touched.sgst && errors.sgst}
                    />

                    <TextField
                      fullWidth
                      label="Descripion"
                      {...getFieldProps('price')}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  
                    <FormControlLabel
                      value="start"
                      control={<Switch color="primary" checked={{ ...getFieldProps('isVariant') }} />}
                      label="isVariant"
                      labelPlacement="start"
                    />

                    <FormControlLabel
                      value="start"
                      control={<Switch color="primary" checked={{ ...getFieldProps('isAvailable') }} />}
                      label="isVeg"
                      labelPlacement="start"
                    />

                    <FormControlLabel
                      value="start"
                      control={<Switch color="primary" checked={{ ...getFieldProps('isAvailable') }} />}
                      label="isAvailable"
                      labelPlacement="start"
                    />
                  </Stack>

                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Register
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
