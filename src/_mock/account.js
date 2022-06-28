import axios from 'axios';
import { useState, useEffect } from 'react';


const accountProfile = JSON.parse(localStorage.getItem('yummittoVendorProfile'));


const account = {
  displayName: accountProfile === null ? "{{VendorName}}" : accountProfile.name,
  email: accountProfile === null ? "email@gmail.com" : accountProfile.email,
  photoURL: accountProfile === null ? '/static/mock-images/avatars/avatar_default.jpg' : accountProfile.image,
  storeId:accountProfile === null ? '8e3d5689-83c8-4601-9115-37b577600a0d' : accountProfile.id
};

export default account;
