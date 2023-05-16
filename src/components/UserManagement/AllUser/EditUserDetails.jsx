import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
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
            const data = response.data.user_detail
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
                dark_mode: formValues.theme_mode
            };
            await callStockApi(params);
        }
    };

    async function callStockApi(params) {
        const response = await updateUserDetails(params);
        if (response.result == 1) {
            toast.success(response.message);
            handleClose();
            userDetailsData()
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
            ...prevValues, [name]: value,
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
                            <Form.Group as={Row} className='mt-3'>
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
                                        name='dob'
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
                            <Form.Group>
                                <Form.Label className="d-block mb-2" htmlFor="state">
                                    State
                                </Form.Label>
                                <Select
                                    className="react-select react-select-container"
                                    classNamePrefix="react-select"
                                    name="state"
                                    id="state"
                                    value={formValues.state ? { value: formValues.state, label: formValues.state } : null}
                                    onChange={(selectedOption) => handleChange('state', selectedOption.value)}
                                    options={[
                                        { value: '', label: 'Select State' },
                                        { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
                                        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
                                        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
                                        { value: 'Assam', label: 'Assam' },
                                        { value: 'Bihar', label: 'Bihar' },
                                        { value: 'Chandigarh', label: 'Chandigarh' },
                                        { value: 'Chhattisgarh', label: 'Chhattisgarh' },
                                        { value: 'Dadra and Nagar Haveli', label: 'Dadra and Nagar Haveli' },
                                        { value: 'Daman and Diu', label: 'Daman and Diu' },
                                        { value: 'Delhi', label: 'Delhi' },
                                        { value: 'Goa', label: 'Goa' },
                                        { value: 'Gujarat', label: 'Gujarat' },
                                        { value: 'Haryana', label: 'Haryana' },
                                        { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
                                        { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
                                        { value: 'Jharkhand', label: 'Jharkhand' },
                                        { value: 'Karnataka', label: 'Karnataka' },
                                        { value: 'Kerala', label: 'Kerala' },
                                        { value: 'Ladakh', label: 'Ladakh' },
                                        { value: 'Lakshadweep', label: 'Lakshadweep' },
                                        { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
                                        { value: 'Maharashtra', label: 'Maharashtra' },
                                        { value: 'Manipur', label: 'Manipur' },
                                        { value: 'Meghalaya', label: 'Meghalaya' },
                                        { value: 'Mizoram', label: 'Mizoram' },
                                        { value: 'Nagaland', label: 'Nagaland' },
                                        { value: 'Odisha', label: 'Odisha' },
                                        { value: 'Puducherry', label: 'Puducherry' },
                                        { value: 'Punjab', label: 'Punjab' },
                                        { value: 'Rajasthan', label: 'Rajasthan' },
                                        { value: 'Sikkim', label: 'Sikkim' },
                                        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
                                        { value: 'Telangana', label: 'Telangana' },
                                        { value: 'Tripura', label: 'Tripura' },
                                        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
                                        { value: 'Uttarakhand', label: 'Uttarakhand' },
                                        { value: 'West Bengal', label: 'West Bengal' },
                                    ]}></Select>
                            </Form.Group>
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
                            <Form.Group>
                                <Form.Label className="d-block ps-1" htmlFor="industry">
                                    Industry
                                </Form.Label>
                                <Select
                                    className="react-select react-select-container"
                                    classNamePrefix="react-select"
                                    name="industry"
                                    id="industry"
                                    value={formValues.industry ? { value: formValues.industry, label: formValues.industry } : null}
                                    onChange={(selectedOption) => handleChange('industry', selectedOption.value)}
                                    options={[
                                        { value: '', label: 'Select Industry' },
                                        { value: 'Auto and Auto Ancillary', label: 'Auto and Auto Ancillary' },
                                        { value: 'Banking and Financial Services', label: 'Banking and Financial Services' },
                                        { value: 'FMCG', label: 'FMCG' },
                                        { value: 'Information Technology', label: 'Information Technology' },
                                        { value: 'Media and Entertainment', label: 'Media and Entertainment' },
                                        { value: 'Pharma and Healthcare', label: 'Pharma and Healthcare' },
                                        { value: 'Real Estate', label: 'Real Estate' },
                                        { value: 'Telecom', label: 'Telecom' },
                                        { value: 'Travel and Tourism', label: 'Travel and Tourism' },
                                        { value: 'Other', label: 'Other' },
                                    ]}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label className="d-block mb-2" htmlFor="occupation">
                                    Occupation
                                </Form.Label>
                                <Select
                                    className="react-select react-select-container"
                                    classNamePrefix="react-select"
                                    name="occupation"
                                    id="occupation"
                                    value={formValues.occupation ? { value: formValues.occupation, label: formValues.occupation } : null}
                                    onChange={(selectedOption) => handleChange('occupation', selectedOption.value)}
                                    options={[
                                        { value: '', label: 'Select Occupation' },
                                        { value: 'Business', label: 'Business' },
                                        { value: 'Govt. Employee', label: 'Govt. Employee' },
                                        { value: 'Professional', label: 'Professional' },
                                        { value: 'Homemaker', label: 'Homemaker' },
                                        { value: 'Student', label: 'Student' },
                                        { value: 'Retired', label: 'Retired' },
                                        { value: 'Other', label: 'Other' },
                                    ]}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group>
                                <Form.Label className="d-block mb-2" htmlFor="annualincome">
                                    Annual Income
                                </Form.Label>
                                <Select
                                    className="react-select react-select-container"
                                    classNamePrefix="react-select"
                                    name="annualincome"
                                    id="annualincome"
                                    value={formValues.annualincome ? { value: formValues.annualincome, label: formValues.annualincome } : null}
                                    onChange={(selectedOption) => handleChange('annualincome', selectedOption.value)}
                                    options={[
                                        { value: '', label: 'Select Annual Income' },
                                        { value: 'Less than 500,000', label: 'Less than 500,000' },
                                        { value: '5 Lakh to 10 Lakh', label: '5 Lakh to 10 Lakh' },
                                        { value: '10 Lakh to 15 Lakh', label: '10 Lakh to 15 Lakh' },
                                        { value: '15 Lakh to 20 Lakh', label: '15 Lakh to 20 Lakh' },
                                        { value: 'More than 20 Lakhs', label: 'More than 20 Lakhs' },
                                    ]}
                                />
                            </Form.Group>
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
                        <Col lg={6} >
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
                                            checked={formValues.user_status === "true"}
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
                                            checked={formValues.user_status === "false"}
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
                    <Button variant="light" className='me-2' onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Update
                    </Button>
                </Form>
            </Card.Body >
        </Card >
    )
}

export default EditUserDetails