import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Button, Form } from 'react-bootstrap';
import { getLoginAdmin } from '_services/nifty_service_api';
import { useAuth } from '_context/authContext';

const Login = () => {
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, getUserData } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors('');
  };


  const handleLogin = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      setIsLoading(true);
      const params = {
        user_email: formValues.email,
        user_password: formValues.password,
      };
      await callLoginApi(params);
    }
  };

  async function callLoginApi(params) {
    setIsLoading(true);
    const response = await getLoginAdmin(params);
    console.log(response)
    if (response?.result == 1) {
      const token = response.data;
      Cookies.set('token', token, { expires: 30, path: '/' });
      toast.success(response.message);
      getUserData();
      // history.push('/user-management/all-user');
      setIsLoading(false);
    } else {
      toast.error(response.message);
      setIsLoading(false);
    }
  }

  const validate = (values) => {
    const errors = {};
    const regax = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regax.test(values.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Password length should be minimum 6 character';
    }
    return errors;
  };

  return (
    <>
      {/* <AuthLayout> */}
        <div className="auth-logo mx-auto">
          {/* <Link to="/auth/login" className="logo logo-dark text-center"> */}
            {/* <span className="logo-lg">
              <img src={logoDark} alt="logo" width={170} />
            </span> */}
          {/* </Link> */}

          {/* <Link to="/auth/login" className="logo logo-light text-center"> */}
            {/* <span className="logo-lg">
              <img src={logoLight} alt="logo" height="24" />
            </span> */}
          {/* </Link> */}
        </div>

        <h6 className="h5 mb-0 mt-3">Welcome back!</h6>
        <p className="text-muted mt-2 mb-0">Enter your email address and password to access admin panel.</p>

        <form onSubmit={handleLogin} className="input-login my-4 center">
          <Form.Group className="mb-4 border-bottom input-label">
            <Form.Control
              name="email"
              type="email"
              className="border-0 shadow-none rounded-0 ps-1"
              value={formValues.email}
              onChange={handleChange}
              placeholder=" "
            />
            <Form.Label className="start-0 mb-0 position-absolute">Email</Form.Label>
            <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.email}</p>
          </Form.Group>
          <Form.Group className="mb-4 border-bottom input-label">
            <Form.Control
              name="password"
              type="password"
              className="border-0 shadow-none rounded-0 ps-1"
              placeholder=" "
              value={formValues.password}
              onChange={handleChange}
            />
            <Form.Label className="start-0 mb-0 position-absolute">Password</Form.Label>
            <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.password}</p>
          </Form.Group>
        </form>

        <div className="mb-3 text-center d-grid">
          <Button type="submit" className="w-100" disabled={isLoading} onClick={handleLogin}>
            Login
            {isLoading && <span className="spinner-border spinner-border-sm ms-3 text-white" role="status"></span>}
          </Button>
        </div>
      {/* </AuthLayout> */}
    </>
  );
};

export default Login;
