import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getUserDetails, updateUserDetails } from '_services/nifty_service_api';
import Select from 'react-select';

const EditUserDetails = (props) => {
  const { setShow, selectedId, userDetailsData } = props;
  const initialValues = {
    username: '',
    useremail: '',
    mobileno: '',
    socialflag: '',
    gender: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    industry: '',
    occupation: '',
    annualincome: '',
    android_app_version: '',
    ios_app_version: '',
    email_verify: '',
    theme_mode: '',
    user_status: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleClose = () => setShow(false);
  useEffect(() => {
    if (selectedId) {
      handelTermsData();
    }
  }, [selectedId]);

  async function handelTermsData() {
    const params = {
      id: selectedId,
    };
    const response = await getUserDetails(params);
    if (response.result == 1) {
      const data = response.data.user_detail;
      const values = {
        user_id: data?.user_id,
        username: data?.name,
        useremail: data?.email,
        mobileno: data?.phone_no,
        android_app_version: data?.user_android_app_version,

        user_status: Boolean(data?.is_active).toString(),
        annualincome: data?.annual_income,
        city: data?.city,
        country: data?.country,
        dob: data?.date_of_birth,
        gender: data?.gender,
        industry: data?.industry,
        occupation: data?.occupation,
        pincode: data?.pincode,
        state: data?.state,
        eod_alert: data?.eod_alert,
        ios_app_version: data?.user_ios_app_version,
        email_verify: data?.is_email_verify,
        platform_type: data?.platform_type,
        theme_mode: data?.dark_mode,
      };
      setFormValues(values);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      const params = {
        user_id: selectedId,
        name: formValues.username,
        email: formValues.useremail,
        phone_no: formValues.mobileno,
        user_android_app_version: formValues.android_app_version,
        // is_admin: 'false',
        // is_staff: 'false',
        // is_superuser: 1,
        // user_type: 1,
        is_active: formValues.user_status,
        annual_income: formValues.annualincome,
        city: formValues.city,
        country: formValues.country,
        date_of_birth: formValues.dob,
        gender: formValues.gender,
        industry: formValues.industry,
        occupation: formValues.occupation,
        pincode: formValues.pincode,
        state: formValues.state,
        // eod_alert: formValues.eod_alert,
        user_ios_app_version: formValues.ios_app_version,
        is_email_verify: formValues.email_verify,
        platform_type: formValues.platform_type,
        dark_mode: formValues.theme_mode,
      };
      await callStockApi(params);
    }
  };

  async function callStockApi(params) {
    const response = await updateUserDetails(params);
    if (response.result == 1) {
      toast.success(response.message);
      handleClose();
      userDetailsData();
    } else {
      toast.error(response.message);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.useremail) {
      errors.useremail = 'Please Enter Email';
    }
    return errors;
  };

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <Card className="mt-3">
      <Card.Body>
        <Form className="input-login" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Card.Title className="mb-4">Edit User Details</Card.Title>
            </Col>
            <Col className="text-end">
              <FontAwesomeIcon
                icon={faTimes}
                width="18"
                height="18"
                className="fs-20 me-1 cursor-pointer"
                onClick={() => handleClose()}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-1  input-label">
                <Form.Label className="common-form-labal" htmlFor="username">
                  Name
                </Form.Label>
                <Form.Control
                  name="username"
                  id="username"
                  type="text"
                  className="common-input-feild"
                  placeholder="N/A"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-1 input-label">
                <Form.Label className="common-form-labal" htmlFor="useremail">
                  Email
                </Form.Label>
                <Form.Control
                  name="useremail"
                  id="useremail"
                  type="email"
                  className="common-input-feild"
                  placeholder="N/A"
                  value={formValues.useremail}
                  onChange={handleChange}
                />
                <p className="text-danger fs-14 error-message position-absolute">{formErrors.useremail}</p>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2 input-label mt-3">
                <Form.Label className="common-form-labal" htmlFor="mobileno">
                  Mobile No
                </Form.Label>
                <Form.Control
                  name="mobileno"
                  id="mobileno"
                  type="number"
                  className="common-input-feild"
                  placeholder="N/A"
                  value={formValues.mobileno}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group as={Row} className="mt-3">
                <Form.Label column lg={12}>
                  Gender
                </Form.Label>
                <Col lg={12}>
                  <div className="d-flex ms-1">
                    <Form.Check
                      type="radio"
                      name="gender"
                      id="male"
                      value="M"
                      checked={formValues.gender == 'M'}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="me-2 ms-1" htmlFor="male">
                      Male
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="gender"
                      id="female"
                      value="F"
                      checked={formValues.gender == 'F'}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="ms-1" htmlFor="female">
                      Female
                    </Form.Check.Label>
                  </div>
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <div className="mb-3 mt-2 position-relative date-picker">
                <Form.Group className="input-label mb-2">
                  <Form.Label className="common-form-labal" htmlFor="mobileno">
                    Date Of Birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    className="common-input-feild"
                    placeholder="N/A"
                    name="dob"
                    value={moment(formValues.dob).format('YYYY-MM-DD')}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3 mt-2 input-label">
                <Form.Label className="common-form-labal" htmlFor="country">
                  Country
                </Form.Label>
                <Form.Control
                  name="country"
                  id="country"
                  type="text"
                  className="common-input-feild"
                  placeholder="N/A"
                  value={formValues.country}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Label className="common-form-labal" htmlFor="country">
                Select State
              </Form.Label>
              <select
                className="w-100 bg-white p-2 border rounded-2"
                name="state"
                id="state"
                value={formValues.state}
                onChange={handleChange}
              >
                <option value="" selected>
                  {formValues.state || 'Select State'}
                </option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3 input-label ps-1">
                <Form.Label className="common-form-labal" htmlFor="city">
                  City
                </Form.Label>
                <Form.Control
                  name="city"
                  id="city"
                  type="text"
                  className="common-input-feild"
                  placeholder="N/A"
                  value={formValues.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-4 input-label">
                <Form.Label className="common-form-labal" htmlFor="pincode">
                  Pincode
                </Form.Label>
                <Form.Control
                  name="pincode"
                  id="pincode"
                  type="number"
                  className="common-input-feild"
                  placeholder="N/A"
                  value={formValues.pincode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Label className="common-form-labal" htmlFor="country">
                Select Industry
              </Form.Label>
              <select
                className="w-100 bg-white p-2 border rounded-2"
                name="industry"
                id="industry"
                value={formValues.industry}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                <option value="Auto and Auto Ancillary">Auto and Auto Ancillary</option>
                <option value="Banking and Financial Services">Banking and Financial Services</option>
                <option value="FMCG">FMCG</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Media and Entertainment">Media and Entertainment</option>
                <option value="Pharma and Healthcare">Pharma and Healthcare</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Telecom">Telecom</option>
                <option value="Travel and Tourism">Travel and Tourism</option>
                <option value="Other">Other</option>
              </select>
            </Col>
            <Col lg={6}>
              <Form.Label className="common-form-labal" htmlFor="country">
                Select Occupation
              </Form.Label>
              <select
                className="w-100 bg-white p-2 mb-3 border rounded-2"
                name="occupation"
                id="occupation"
                value={formValues.occupation}
                onChange={handleChange}
              >
                <option value="">Select Occupation</option>
                <option value="Business">Business</option>
                <option value="Govt. Employee">Govt. Employee</option>
                <option value="Professional">Professional</option>
                <option value="Homemaker">Homemaker</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
                <option value="Other">Other</option>
              </select>
            </Col>
            <Col lg={6}>
              <Form.Label className="common-form-labal" htmlFor="country">
                Select Annual Income
              </Form.Label>
              <select
                className="w-100 bg-white p-2 mb-3 border rounded-2"
                name="annualincome"
                id="annualincome"
                onChange={handleChange}
              >
                <option value="">Select Annual Income</option>
                <option value="Less than 500,000">Less than 500,000</option>
                <option value="5 Lakh to 10 Lakh">5 Lakh to 10 Lakh</option>
                <option value="10 Lakh to 15 Lakh">10 Lakh to 15 Lakh</option>
                <option value="15 Lakh to 20 Lakh">15 Lakh to 20 Lakh</option>
                <option value="More than 20 Lakhs">More than 20 Lakhs</option>
              </select>
            </Col>
            <Col lg={6}>
              <Form.Group className="my-2 input-label">
                <Form.Label className="common-form-labal" htmlFor="android_app_version">
                  Android app version
                </Form.Label>
                <Form.Control
                  name="android_app_version"
                  id="android_app_version"
                  type="text"
                  className="common-input-feild cursor-not-allowed"
                  placeholder="N/A"
                  value={formValues.android_app_version}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="my-2 input-label">
                <Form.Label className="common-form-labal ps-1" htmlFor="ios_app_version">
                  Ios app version
                </Form.Label>
                <Form.Control
                  name="ios_app_version"
                  id="ios_app_version"
                  type="text"
                  className="common-input-feild cursor-not-allowed"
                  placeholder="N/A"
                  value={formValues.ios_app_version}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column lg={12} htmlFor="discount-type">
                  Email Verify
                </Form.Label>
                <Col lg={12}>
                  <div className="d-flex ms-1">
                    <Form.Check
                      type="radio"
                      name="email_verify"
                      id="verify"
                      value="1"
                      checked={formValues.email_verify == 1}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="me-2 ms-1" htmlFor="verify">
                      Yes
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="email_verify"
                      id="noverify"
                      value="0"
                      checked={formValues.email_verify == 0}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="ms-1" htmlFor="noverify">
                      No
                    </Form.Check.Label>
                  </div>
                </Col>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group as={Row} className="mb-2 ps-1">
                <Form.Label column lg={12}>
                  Theme Mode
                </Form.Label>
                <Col lg={12}>
                  <div className="d-flex ms-1">
                    <Form.Check
                      type="radio"
                      name="theme_mode"
                      id="dark_mode"
                      value="1"
                      checked={formValues.theme_mode == 1}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="me-2 ms-1" htmlFor="dark_mode">
                      Dark
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="theme_mode"
                      id="light_mode"
                      value="0"
                      checked={formValues.theme_mode == 0}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="ms-1" htmlFor="light_mode">
                      Light
                    </Form.Check.Label>
                  </div>
                </Col>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column lg={12}>
                  User Status
                </Form.Label>
                <Col lg={12}>
                  <div className="d-flex ms-1">
                    <Form.Check
                      type="radio"
                      name="user_status"
                      id="active"
                      value="true"
                      checked={formValues.user_status === 'true'}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="me-2 ms-1" htmlFor="active">
                      Active
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="user_status"
                      id="inactive"
                      value="false"
                      checked={formValues.user_status === 'false'}
                      onChange={handleChange}
                    />
                    <Form.Check.Label className="ms-1" htmlFor="inactive">
                      Inactive
                    </Form.Check.Label>
                  </div>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="light" className="me-3" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="" className="web-button text-white" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditUserDetails;
