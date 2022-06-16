import { filter, forEach } from 'lodash';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function EditProduct() {
  const [productsData, setProductsData] = useState([]);

  const [formValues, setFormValues] = useState(defaultValues);


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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

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
