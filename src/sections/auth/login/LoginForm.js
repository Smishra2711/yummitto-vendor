import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------
const Config  = require("../../../utils/config");


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showOTP, setShowOTP] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOTP] = useState();

  const sendOTP = () => { 
    if(phoneNumber != null){
      axios.post(`${Config.default.BACKEND_API}/vendor/user/send-otp`,
      {
        "phoneCode":"+91",
        "phoneNumber":phoneNumber
      }).then((res) => {
        if(res.status === 200){
          setShowOTP(true)
        }
      })
      .catch(err => alert("Some error occured"))
    }else{
      alert("Please Enter Mobile")
    }     
  }

  const verifyOTP = () => {
    if(otp != null){
      axios.post(`${Config.default.BACKEND_API}/vendor/user/verify-otp`,
      {
        "otp":otp,
        "phoneCode":"+91",
        "phoneNumber":phoneNumber
      }).then((res) => {
        if(res.status === 200){
          localStorage.setItem("yummittoVendorToken",res.data.token);
          navigate('/dashboard', { replace: true })
        }
      })
      .catch(err => alert("Some error occured"))
    }else{
      alert("Please Enter OTP")
    }     
  }

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
      verifyOTP();
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="phone"
            type="number"
            label="Enter Phone"
            disabled = {showOTP}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            // error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            className={showOTP ? 'show' : 'hide'}
            fullWidth
            type="number"
            label="Enter OTP"
            onChange={(e) => setOTP(e.target.value)}
            // error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
         
        <LoadingButton className={showOTP ? 'hide' : 'show'} fullWidth size="large" variant="contained" loading={isSubmitting} onClick={sendOTP}>
          Send OTP
        </LoadingButton>
        <LoadingButton className={showOTP ? 'show' : 'hide'} fullWidth size="large" variant="contained" loading={isSubmitting} onClick={verifyOTP}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
