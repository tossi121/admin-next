import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { getLoginAdmin } from '_services/nifty_service_api';
import { useAuth } from '_context/authContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUserAlt } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const initialValues = { email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getUserData } = useAuth();
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
    if (response?.result == 1) {
      const token = response.data;
      Cookies.set('token', token, { expires: 30, path: '/' });
      toast.success(response.message);
      getUserData();
      router.push('/user-management');
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
    <section className="d-flex align-items justify-content-center login position-relative">
      <Container>
        <Row>
          <Col md={7} className="d-flex align-items-center justify-content-center m-auto min-vh-100">
            <Form className="login-form bg-white shadow p-5 rounded-2 w-50">
              <div className="mb-5 text-center">
                <Image src={'/images/logo.svg'} alt="logo" width={160} height={50} className="mb-3" />
                <h1 className="fs-2 base-link-color text-center fw-semibold mb-0">Welcome!</h1>
                <p className="base-color-2 fw-500 text-center"> Sign in to your account</p>
              </div>
              <div className="mb-4">
                <Form.Group className="border-bottom input-label base-color-1" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    className="border-0 base-color-1 shadow-none rounded-0 ps-1"
                    placeholder=" "
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <Form.Label className="start-0 mb-0 position-absolute">Email address</Form.Label>
                  <FontAwesomeIcon
                    width={16}
                    height={16}
                    icon={faUserAlt}
                    className="end-0 position-absolute login-icon"
                  />
                  <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.email}</p>
                </Form.Group>
              </div>
              <div className="mb-2">
                <Form.Group className=" border-bottom input-label base-color-1" controlId="formBasicPassword">
                  <Form.Control
                    className="border-0 base-color-1 shadow-none rounded-0 ps-1"
                    placeholder=" "
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <Form.Label className="start-0 mb-0 position-absolute">Password</Form.Label>
                  {passwordShown ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      width="16"
                      height="16"
                      className="position-absolute bottom-0 mb-2 end-0 me-1 text-light-gray cursor-pointer"
                      onClick={togglePassword}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      width="16"
                      height="16"
                      className=" position-absolute bottom-0 mb-2 end-0 me-1 text-light-gray cursor-pointer"
                      onClick={togglePassword}
                    />
                  )}
                  <p className="text-danger fs-14 error-message my-1 position-absolute text-nowrap">
                    {formErrors.password}
                  </p>
                </Form.Group>
              </div>

              <div className="text-center">
                <Button type="submit" className="w-100 mt-3 web-button" disabled={isLoading} onClick={handleLogin}>
                  Login
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm ms-3 text-white" role="status"></span>
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
