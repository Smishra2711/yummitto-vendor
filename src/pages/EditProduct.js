import * as Yup from 'yup';
import { filter, forEach } from 'lodash';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TextField,
  Button,
  Checkbox,
  Container,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
// mock
import USERLIST from '../_mock/user';

const Config  = require("../utils/config");
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Product Name', alignRight: false },
  { id: 'company', label: 'Description', alignRight: false },
  { id: 'role', label: 'Amount', alignRight: false },
  { id: 'isVerified', label: 'isAvailable', alignRight: false },
  { id: 'status', label: 'Action', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


export default function EditProduct() {
  const [productsData, setProductsData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');


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

  getProducts();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,

    onSubmit: async (e) => {      
      e.preventDefault(); 
      // verifyOTP();
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="Edit Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
        </Stack>

        <Card>
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  autoComplete="phone"
                  type="text"
                  label="Enter Name"
                  // error={Boolean(touched.email && errors.email)}

                  helperText={touched.email && errors.email}
                />

              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
              
              
              <LoadingButton fullWidth size="large" variant="contained" loading={isSubmitting} >
                Save
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Card>
      </Container>
    </Page>
  );
}
