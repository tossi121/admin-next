import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router-dom';
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
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     history.push('/auth/login');
  //   }
  // }, [isLoggedIn]);

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
          <div className="page-title-box">
            <h4 className="page-title">Update Header Alert</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form className="input-login my-2" onSubmit={handleAlert}>
                <Row>
                  <Col>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="content"
                        id="content"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.content}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="content">
                        Content
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="url"
                        id="url"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.url}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="url">
                        Url
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="urlcontent"
                        id="urlcontent"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.urlcontent}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="urlcontent">
                        Url Content
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="input-focus">
                    <Form.Group className="border-bottom">
                      <Form.Label className="mb-0" htmlFor="background_color1">
                        Background Color Left
                      </Form.Label>
                      <Form.Control
                        name="background_color1"
                        id="background_color1"
                        type="color"
                        className="border-0 shadow-none rounded-0 ps-1 w-100"
                        placeholder=" "
                        value={formValues.background_color1}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="border-bottom">
                      <Form.Label className="mb-0" htmlFor="background_color2">
                        Background Color Right
                      </Form.Label>
                      <Form.Control
                        name="background_color2"
                        id="background_color2"
                        type="color"
                        className="border-0 shadow-none rounded-0 ps-1 w-100"
                        placeholder=" "
                        value={formValues.background_color2}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="border-bottom">
                      <Form.Label className="mb-0" htmlFor="content_color">
                        Content Color
                      </Form.Label>
                      <Form.Control
                        name="content_color"
                        id="content_color"
                        type="color"
                        className="border-0 shadow-none rounded-0 ps-1 w-100"
                        placeholder=" "
                        value={formValues.content_color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2 align-items-center">
                  <Col className="input-focus">
                    <Form.Group className="border-bottom">
                      <Form.Label className="mb-0" htmlFor="button_color">
                        Button Color
                      </Form.Label>
                      <Form.Control
                        name="button_color"
                        id="button_color"
                        type="color"
                        className="border-0 shadow-none rounded-0 ps-1 w-100"
                        placeholder=" "
                        value={formValues.button_color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Group className="border-bottom">
                      <Form.Label className="mb-0" htmlFor="button_text_color">
                        Button Text Color
                      </Form.Label>
                      <Form.Control
                        name="button_text_color"
                        id="button_text_color"
                        type="color"
                        className="border-0 shadow-none rounded-0 ps-1 w-100"
                        placeholder=" "
                        value={formValues.button_text_color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="input-focus">
                    <Form.Label className="fin-select d-block border-bottom mb-0" htmlFor="is_active">
                      <select
                        className="fin-field w-100 bg-white"
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
                      <span className="fin-label">Active</span>
                    </Form.Label>
                  </Col>
                </Row>
                <Button variant="primary" className="mt-3" onClick={handleAlert}>
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
