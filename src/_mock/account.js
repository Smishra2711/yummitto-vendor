import axios from 'axios';
import {useState, useEffect} from 'react';


const accountProfile = JSON.parse(localStorage.getItem('yummittoVendorProfile'));


const account = {
  displayName: 'Vendor Name',
  email: 'email@gmail.com',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
