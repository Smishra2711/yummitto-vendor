import { filter, forEach } from 'lodash';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Grid,
  Stack,
  Avatar,
  TextField,
  Button,
  Checkbox,
  Container,
  Typography,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
// mock
import USERLIST from '../_mock/user';

const Config = require("../utils/config");
// ---------------------------------------------------------------------

const defaultValues = {
  name: "",
  age: 0,
  sex: "",
  os: "",
  favoriteNumber: 0,
};

// ----------------------------------------------------------------------



export default function EditProduct() {
  const [productsData, setProductsData] = useState([]);

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


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
            <Grid container alignItems="center" justify="center" direction="column">
              <Grid item>
                <TextField
                  id="name-input"
                  name="name"
                  label="Name"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="age-input"
                  name="age"
                  label="Age"
                  type="number"
                  value={formValues.age}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="name-input"
                  name="name"
                  label="Name"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="age-input"
                  name="age"
                  label="Age"
                  type="number"
                  value={formValues.age}
                  onChange={handleInputChange}
                />
              </Grid>
              </Grid>

          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
