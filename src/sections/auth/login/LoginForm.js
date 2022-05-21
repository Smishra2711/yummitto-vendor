import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
const Config  = require("../../../utils/config");


async function loginUser(credentials) {
  return fetch(`${Config.default.BACKEND_API}/vendor/user/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showOTP, setShowOTP] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState();
  const [otp, setOTP] = useState();

  const sendOTP = () => {
    console.log("sending otp");
    setShowOTP(true);
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
      if(phone != null){
        console.log("error");
      }  
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
            {...getFieldProps('email')}
            // onChange={e => setPhone(e.target.value)}
            // error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            className={showOTP ? 'show' : 'hide'}
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
         
        <LoadingButton className={showOTP ? 'hide' : 'show'} fullWidth size="large" variant="contained" loading={isSubmitting} onClick={sendOTP}>
          Send OTP
        </LoadingButton>
        <LoadingButton className={showOTP ? 'show' : 'hide'} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
