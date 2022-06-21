import axios from 'axios';
import { useState, useEffect } from 'react';


const accountProfile = JSON.parse(localStorage.getItem('yummittoVendorProfile'));


const account = {
  displayName: accountProfile === null ? "{{VendorName}}" : accountProfile.name,
  email: accountProfile === null ? "email@gmail.com" : accountProfile.email,
  photoURL: accountProfile === null ? '/static/mock-images/avatars/avatar_default.jpg' : accountProfile.image,
};

export default account;
