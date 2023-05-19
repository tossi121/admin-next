import { UpdateAppVersion, getAppVersionData } from '_services/nifty_service_api';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';

const Disclaimer = () => {
  const initialValues = {
    appVersion: '',
    android_app_version: '',
    android_app_version_mandatory: false,
    updated_at: "",
    update_ios_app_version: '',
    ios_version: '',
    ios_app_version: '',
    ios_app_version_mandatory: false,
    disclaimer_text: '',
    update_disclaimer_text: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    globalSettingData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  async function globalSettingData() {
    const response = await getAppVersionData();
    if (response.result == 1) {
      const values = {
        appVersion: response.data?.android_app_version,
        android_app_version_mandatory: response.data?.android_app_version_mandatory,
        ios_version: response.data?.ios_app_version,
        ios_app_version_mandatory: response.data?.ios_app_version_mandatory,
        disclaimer_text: response.data?.disclaimer_text,
        updated_at: response.data?.updated_at,
      };
      setFormValues(values);
    }
  }

  const handleUpdateAppVersion = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      const android_app_version = formValues.android_app_version || formValues.appVersion;
      const ios_app_version = formValues.ios_app_version || formValues.ios_version;
      const params = {
        id: 2,
        android_app_version: android_app_version,
        android_app_version_mandatory: formValues.android_app_version_mandatory,
        updated_at: formValues.updated_at,
        ios_app_version: ios_app_version,
        ios_app_version_mandatory: formValues.ios_app_version_mandatory,
        disclaimer_text: formValues.update_disclaimer_text,
      };
      await callStockApi(params);
      setFormValues(initialValues);
      setFormErrors({})
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.update_disclaimer_text) {
      errors.update_disclaimer_text = 'Please Enter Disclaimer';
    }
    return errors;
  };

  async function callStockApi(params) {
    const response = await UpdateAppVersion(params);
    if (response.result == 1) {
      toast.success(response.message);
      globalSettingData()
    } else {
      toast.error(response.message);
    }
  }

  return (
    <section>
      <Row>
        <Col>
          <h5 className="fw-500 mb-3">Update Disclaimer</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleUpdateAppVersion}>
                <Row>
                  <Col className="input-focus">
                    <Form.Group as={Row} className="my-2 input-label">
                      <Form.Label column lg={12} className="common-form-label" htmlFor="example-Left">
                        Current Disclaimer
                      </Form.Label>
                      <Col lg={12}>
                        <Form.Control as="textarea" className="common-input-feild bg-light cursor-notallowed" rows={6} id="disclaimer_text" name='disclaimer_text'
                          value={formValues.disclaimer_text} onChange={handleChange} readOnly />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group as={Row} className="my-2 input-label">
                      <Form.Label column lg={12} className="common-form-label" htmlFor="example-Left">
                        Update Disclaimer
                      </Form.Label>
                      <Col lg={12}>
                        <Form.Control as="textarea" className="common-input-feild" rows={6} id="update_disclaimer_text" name='update_disclaimer_text' value={formValues.update_disclaimer_text} onChange={handleChange} />
                      </Col>
                    </Form.Group>
                    <p className="text-danger fs-14 error-message pt-0 mt-0 mb-2">{formErrors.update_disclaimer_text}</p>
                  </Col>
                </Row>
                <Button variant="primary" className='web-button mt-2' onClick={handleUpdateAppVersion}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default Disclaimer