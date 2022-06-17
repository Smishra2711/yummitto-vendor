import * as Yup from 'yup';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
// material
import { Card, Container, Stack, TextField, FormControlLabel, Switch, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';

const Config = require("../utils/config");

// ----------------------------------------------------------------------

export default function EditProduct(props) {
  const navigate = useNavigate();
  const storeId = "8e3d5689-83c8-4601-9115-37b577600a0d";
  const { productId, productName, productPrice } = useParams();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Product name required'),
    description: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Description is required'),
    image: "",
    price: Yup.number().required("Please enter Price"),
    // cgst: Yup.number().required("Please Enter CGST"),
    // sgst: Yup.number().required("Please Enter SGST")
  });

  const formik = useFormik({
    initialValues: {
      id: productId,
      name: productName,
      price: productPrice
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      if (updateProduct()) {
        navigate('/dashboard', { replace: true });
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const updateProduct = async () => {
    const config = {
      method: 'put',
      url: `https://${Config.default.BACKEND_API}/vendor/${storeId}/product/${productId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("yummittoVendorToken")}`
      }
    };
    axios(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        return true;
      })
      .catch((err) => {
        console.log(JSON.stringify(err.data));
        alert(err.data);
        return false;
      })
  }

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
                  <TextField
                    fullWidth
                    label="Descripion"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    disabled
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Product name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      disabled
                    />

                    <TextField
                      fullWidth
                      label="Price"
                      {...getFieldProps('price')}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Stack>

                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Update
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
