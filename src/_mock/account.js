import axios from 'axios';
import {useState, useEffect} from 'react';

const Config = require("../utils/config");

const fetchAccount = async () =>{

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
    const tempObj = res.data.store;
    // setProfile(tempObj);
  })
  .catch((err) => {
    console.log(JSON.stringify(err.data));
  })
}


const account = {
  displayName: 'Vendor Name',
  email: 'email@gmail.com',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
