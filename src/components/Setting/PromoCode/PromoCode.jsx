import { getGlobalPromoList, saveGlobalPromoList } from '_services/nifty_service_api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const PromoCode = () => {
  const initialValues = {
    promocode_name: '',
    promocode_per: '',
    expiry_date: '',
    mail_days: '',
    promo_flag: '',
    promo_title: '',
    promo_desc: '',
    is_active: false,
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
    const response = await getGlobalPromoList();
    if (response.result == 1) {
      const values = {
        promocode_name: response.data?.promocode_name,
        promocode_per: response.data?.promocode_per,
        expiry_date: response.data?.expiry_date,
        mail_days: response.data?.mail_days,
        promo_flag: response.data?.promo_flag,
        promo_title: response.data?.promo_title,
        promo_desc: response.data?.promo_desc,
        is_active: response.data?.is_active,
      };
      setFormValues(values);
    }
  }

  const handleGlobalSetting = async (e) => {
    e.preventDefault();
    const params = {
      promo_id: 1,
      promocode_name: formValues.promocode_name,
      promocode_per: formValues.promocode_per,
      expiry_date: formValues.expiry_date,
      mail_days: formValues.mail_days,
      promo_flag: formValues.promo_flag,
      promo_title: formValues.promo_title,
      promo_desc: formValues.promo_desc,
      is_active: formValues.is_active,
    };
    await callStockApi(params);
  };

  async function callStockApi(params) {
    const response = await saveGlobalPromoList(params);
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
            <h4 className="page-title">Update Promo Details</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form className="input-login my-2" onSubmit={handleGlobalSetting}>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="promocode_name"
                        id="promocode_name"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.promocode_name}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="promocode_name">
                        Promo Code
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="promo_title"
                        id="promo_title"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.promo_title}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="promo_title">
                        Title
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6}>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="promo_desc"
                        id="promo_desc"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.promo_desc}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="promo_desc">
                        Description
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row} className="mt-3 ps-2">
                      <Col lg={1} className="mt-0 p-0 w-max-content">
                        <Form.Control
                          type="checkbox"
                          name="is_active"
                          checked={formValues.is_active}
                          onChange={handleChange}
                          id="is_active"
                        />
                      </Col>
                      <Form.Label column lg={1} className="ps-0 pt-0 cursor-pointer" htmlFor="is_active">
                        Active
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="promocode_per"
                        id="promocode_per"
                        type="number"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.promocode_per}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="promocode_per">
                        Discount Value
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="stock-create my-3 border-bottom input-label">
                      <Form.Control
                        name="mail_days"
                        id="mail_days"
                        type="number"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.mail_days}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="mail_days">
                        Valit Till
                      </Form.Label>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="input-focus">
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column lg={12} htmlFor="discount-type">
                        Choose Discount Type
                      </Form.Label>
                      <Col lg={12}>
                        <div className="d-flex">
                          <Form.Check
                            type="radio"
                            name="promo_flag"
                            id="percentage"
                            value="1"
                            checked={formValues.promo_flag == '1'}
                            onChange={handleChange}
                          />
                          <Form.Check.Label className="mx-2" htmlFor="percentage">
                            Percentage
                          </Form.Check.Label>
                          <Form.Check
                            type="radio"
                            name="promo_flag"
                            id="flat"
                            value="0"
                            checked={formValues.promo_flag == '0'}
                            onChange={handleChange}
                          />
                          <Form.Check.Label className="ms-2" htmlFor="flat">
                            Flat
                          </Form.Check.Label>
                        </div>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" onClick={handleGlobalSetting}>
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

export default PromoCode;
