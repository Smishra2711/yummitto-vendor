// ----------------------------------------------------------------------
import axios from 'axios';
const Config = require("../utils/config");

const account = {};

// Fetching User Details from api
const getProducts = async () => {
  const config = {
    method: 'get',
    url: `${Config.default.BACKEND_API}/vendor/user/store`,
    headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("yummittoVendorToken")}`
    }
  };
  axios(config)
    .then((res) => {
      console.log(JSON.stringify(res.data));
      const tempObj = res.data.categories.map((item) => item.products[0]);
      account.name = "Yummitto Vendor";
      account.email = "";
      account.photoURL = "";
    })
    .catch((err) => {
      console.log(JSON.stringify(err.data));
    })
}

export default account;
