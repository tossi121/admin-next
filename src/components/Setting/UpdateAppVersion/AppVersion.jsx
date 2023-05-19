import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import moment from 'moment';
import { UpdateAppVersion, getAppVersionData } from '_services/nifty_service_api';

const AppVersion = () => {
  const initialValues = {
    appVersion: '',
    android_app_version: '',
    android_app_version_mandatory: false,
    update_ios_app_version: '',
    ios_version: '',
    ios_app_version: '',
    ios_app_version_mandatory: false,
  };
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    globalSettingData();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
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
      };
      setFormValues(values);
    }
  }

  const handleUpdateAppVersion = async (e) => {
    e.preventDefault();
    const currentTime = moment().toISOString();
    const android_app_version = formValues.android_app_version || formValues.appVersion;
    const ios_app_version = formValues.ios_app_version || formValues.ios_version;
    const params = {
      id: 2,
      android_app_version: android_app_version,
      android_app_version_mandatory: formValues.android_app_version_mandatory,
      updated_at: currentTime,
      ios_app_version: ios_app_version,
      ios_app_version_mandatory: formValues.ios_app_version_mandatory,
      disclaimer_text: formValues.disclaimer_text,
    };
    await callStockApi(params);
    setFormValues(initialValues);
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
          <h5 className="fw-500 mb-3">Update App Version</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form className="input-login" onSubmit={handleUpdateAppVersion}>
                <h6>Android App Version</h6>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="appVersion">
                        Previous Version
                      </Form.Label>
                      <Form.Control
                        name="appVersion"
                        id="appVersion"
                        type="text"
                        className="common-input-feild cursor-notallowed bg-light"
                        placeholder=" "
                        value={formValues.appVersion}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="android_app_version">
                        Set Version
                      </Form.Label>
                      <Form.Control
                        name="android_app_version"
                        id="android_app_version"
                        type="number"
                        className="common-input-feild"
                        placeholder="Enter Andriod Version"
                        value={formValues.android_app_version}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <Form.Group as={Row} className="mb-3 ps-2">
                      <Col lg={1} className="mt-0 p-0 ps-2">
                        <input
                          type="checkbox"
                          name="android_app_version_mandatory"
                          checked={formValues.android_app_version_mandatory}
                          onChange={handleChange}
                          id="android_app_version_mandatory"
                        />
                      </Col>
                      <Form.Label
                        column
                        lg={8}
                        className="ps-0 pt-0 cursor-pointer"
                        htmlFor="android_app_version_mandatory"
                      >
                        Is Android App Version Mandatory !
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>

                <h6>IOS App Version</h6>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="ios_version">
                        Previous Version
                      </Form.Label>
                      <Form.Control
                        name="ios_version"
                        id="ios_version"
                        type="text"
                        className="common-input-feild cursor-notallowed bg-light"
                        placeholder=" "
                        value={formValues.ios_version}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="ios_app_version">
                        Set Version
                      </Form.Label>
                      <Form.Control
                        name="ios_app_version"
                        id="ios_app_version"
                        type="number"
                        className="common-input-feild"
                        placeholder="Enter Ios Version"
                        value={formValues.ios_app_version}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <Form.Group as={Row} className="mb-3 ps-2">
                      <Col lg={1} className="mt-0 p-0 ps-2">
                        <input
                          type="checkbox"
                          name="ios_app_version_mandatory"
                          checked={formValues.ios_app_version_mandatory}
                          onChange={handleChange}
                          id="ios_app_version_mandatory"
                        />
                      </Col>
                      <Form.Label
                        column
                        lg={6}
                        className="ps-0 pt-0 cursor-pointer"
                        htmlFor="ios_app_version_mandatory"
                      >
                        Is IOS App Version Mandatory !
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" className='web-button' onClick={handleUpdateAppVersion}>
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

export default AppVersion