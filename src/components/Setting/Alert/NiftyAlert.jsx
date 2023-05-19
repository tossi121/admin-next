import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAlertData, saveAlertData } from '_services/nifty_service_api';

const NiftyAlert = () => {
  const initialValues = {
    content: '',
    url: '',
    urlcontent: '',
    background_color1: '',
    background_color2: '',
    content_color: '',
    button_color: '',
    button_text_color: '',
    is_active: '',
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
    const response = await getAlertData();
    if (response.result == 1) {
      const values = {
        content: response.data?.content,
        url: response.data?.url,
        urlcontent: response.data?.urlcontent,
        background_color1: response.data?.background_color1,
        background_color2: response.data?.background_color2,
        content_color: response.data?.content_color,
        button_color: response.data?.button_color,
        button_text_color: response.data?.button_text_color,
        is_active: response.data?.is_active,
      };
      setFormValues(values);
    }
  }

  const handleAlert = async (e) => {
    e.preventDefault();
    const params = {
      id: 1,
      content: formValues.content,
      url: formValues.url,
      urlcontent: formValues.urlcontent,
      background_color1: formValues.background_color1,
      background_color2: formValues.background_color2,
      content_color: formValues.content_color,
      button_color: formValues.button_color,
      button_text_color: formValues.button_text_color,
      is_active: formValues.is_active,
    };
    await callStockApi(params);
  };

  async function callStockApi(params) {
    const response = await saveAlertData(params);
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
          <h5 className="fw-500 mb-3">Update Header Alert</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form className="input-login my-2" onSubmit={handleAlert}>
                <Row>
                  <Col>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="content">
                        Content
                      </Form.Label>
                      <Form.Control
                        name="content"
                        id="content"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.content}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="url">
                        Url
                      </Form.Label>
                      <Form.Control
                        name="url"
                        id="url"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.url}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="urlcontent">
                        Url Content
                      </Form.Label>
                      <Form.Control
                        name="urlcontent"
                        id="urlcontent"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.urlcontent}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="background_color1">
                        Background Color Left
                      </Form.Label>
                      <Form.Control
                        name="background_color1"
                        id="background_color1"
                        type="color"
                        className="w-100 common-input-feild"
                        placeholder=" "
                        value={formValues.background_color1}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="background_color2">
                        Background Color Right
                      </Form.Label>
                      <Form.Control
                        name="background_color2"
                        id="background_color2"
                        type="color"
                        className="w-100 common-input-feild"
                        placeholder=" "
                        value={formValues.background_color2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="content_color">
                        Content Color
                      </Form.Label>
                      <Form.Control
                        name="content_color"
                        id="content_color"
                        type="color"
                        className="w-100 common-input-feild"
                        placeholder=" "
                        value={formValues.content_color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2 align-items-center">
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="button_color">
                        Button Color
                      </Form.Label>
                      <Form.Control
                        name="button_color"
                        id="button_color"
                        type="color"
                        className="w-100 common-input-feild"
                        placeholder=" "
                        value={formValues.button_color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="button_text_color">
                        Button Text Color
                      </Form.Label>
                      <Form.Control
                        name="button_text_color"
                        id="button_text_color"
                        type="color"
                        className="w-100 common-input-feild"
                        placeholder=" "
                        value={formValues.button_text_color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="is_active">
                        Active
                      </Form.Label>
                      <select
                        className="w-100 bg-white p-2 rounded-2 common-input-feild"
                        required
                        name="is_active"
                        id="is_active"
                        value={formValues.is_active}
                        onChange={handleChange}
                      >
                        <option value="" selected disabled hidden></option>
                        <option value="1">&#160;&#160;Yes</option>
                        <option value="0">&#160;&#160;NO</option>
                      </select>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" className="mt-3 web-button" onClick={handleAlert}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default NiftyAlert;
