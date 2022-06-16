import { filter, forEach } from 'lodash';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Grid,
  Table,
  Stack,
  Avatar,
  Textfield,
  Button,
  Checkbox,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

const Config  = require("../utils/config");
// ---------------------------------------------------------------------

const defaultValues = {
    name: "",
    age: 0,
    sex: "",
    os: "",
    favoriteNumber: 0,
  };

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


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(productsData, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit Produc
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>

          <TextField
            id="name-input"
              name="name"
                label="Name"
                  type="text"
                    value={formValues.name}
                      onChange={handleInputChange}
                      />

          <TextField
            id="name-input"
              name="name"
                label="Name"
                  type="text"
                    value={formValues.name}
                      onChange={handleInputChange}
                      />
          
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
