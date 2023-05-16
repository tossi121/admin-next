import { faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addPromoList, updateGeneralPromoList } from '_services/nifty_service_api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditPromoCode = (props) => {
  const { setShow, selectedId, promoCodeData } = props;
  const handleClose = () => setShow(false);
  const initialValues = {
    promocode_name: '',
    promocode_per: '',
    start_date: '',
    end_date: '',
    promo_flag: '',
    discount_for: '',
    promo_title: '',
    promo_desc: '',
    multiple_user_id: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // useEffect(() => {
  //   if (selectedId) {
  //     handelPromoCodeData();
  //   }
  // }, [selectedId]);

  async function handelPromoCodeData() {
    const params = {
      id: selectedId,
    };
    const response = await updateGeneralPromoList(params);
    if (response.result == 1) {
      const values = {
        promocode_name: response.data?.promocode_name,
        promocode_per: response.data?.promocode_per,
        start_date: response.data?.start_date,
        end_date: response.data?.end_date,
        promo_flag: response.data?.promo_flag,
        discount_for: response.data?.discount_for,
        promo_title: response.data?.promo_title,
        promo_desc: response.data?.promo_desc,
        multiple_user_id: response.data?.multiple_user_id,
      };
      setFormValues(values);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors('');
  };

  const handlePromocode = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      const params = {
        promo_general_id: selectedId,
        promocode_name: formValues.promocode_name,
        promocode_per: formValues.promocode_per,
        start_date: formValues.start_date,
        end_date: formValues.end_date,
        promo_flag: formValues.promo_flag.toString(),
        discount_for: formValues.discount_for,
        promo_title: formValues.promo_title,
        promo_desc: formValues.promo_desc,
        multiple_user_id: formValues.multiple_user_id,
      };
      await callStockApi(params);
    }
  };

  async function callStockApi(params) {
    const response = await addPromoList(params);
    if (response.result == 1) {
      toast.success(response.message);
      handleClose();
      promoCodeData()
    } else {
      toast.error(response.message);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.promocode_name) {
      errors.promocode_name = 'Please Enter Promo Code Name';
    }
    if (!values.promocode_per) {
      errors.promocode_per = 'Please Enter Discount Value';
    }
    if (!values.start_date) {
      errors.start_date = 'Please Enter Start Date';
    }
    if (!values.end_date) {
      errors.end_date = 'Please Enter End Date';
    }
    // if (!values.discount_for) {
    //   errors.discount_for = 'Please Select Discount For';
    // }
    if (!values.promo_flag) {
      errors.promo_flag = 'Please Choose Discount Type';
    }
    return errors;
  };

  return (
    <Row>
      <Col>
        <Card className="mt-3">
          <Card.Body>
            <Form className="input-login" onSubmit={handlePromocode}>
              <Row>
                <Col>
                  <Card.Title className="fs-4 mb-2">Edit General Promo code</Card.Title>
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
                <Col>
                  <Form.Group className="mt-2 mb-3 border-bottom input-label">
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
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.promocode_name}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mt-2 mb-3 border-bottom input-label">
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
                <Col>
                  <Form.Group className="mt-2 mb-3 border-bottom input-label">
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
                  <Form.Group className="mt-2 mb-3 border-bottom input-label">
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
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.promocode_per}</p>
                  </Form.Group>
                </Col>

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
                      <p className="text-danger fs-14 error-message position-absolute">{formErrors.promo_flag}</p>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center position-relative date-picker">
                <Col>
                  <div className="mb-3 position-relative date-picker">
                    <label className="form-label mb-0">Start Date</label> <br />
                    <Form.Group className="border-bottom input-label">
                      <Form.Control
                        type="date"
                        className="border-0 shadow-none rounded-0 ps-1"
                        onChange={handleChange}
                        value={formValues.start_date.slice(0, 10)}
                        placeholder=" "
                      />
                    </Form.Group>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      width={20}
                      height={20}
                      className="fs-4 position-absolute top-50 end-0 mt-1 me-2"
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.start_date}</p>
                  </div>
                </Col>
                <Col>
                  <div className="mb-3 position-relative date-picker">
                    <label className="form-label mb-0">End Date</label> <br />
                    <Form.Group className="border-bottom input-label">
                      <Form.Control
                        type="date"
                        className="border-0 shadow-none rounded-0 ps-1"
                        onChange={handleChange}
                        placeholder=" "
                        name="end_date"
                        value={formValues.end_date.slice(0, 10)}
                      />
                    </Form.Group>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      width={20}
                      height={20}
                      className="fs-4 position-absolute top-50 end-0 mt-1 me-2"
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.end_date}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="input-focus">
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column lg={12} htmlFor="example-discount">
                      Choose Discount For:
                    </Form.Label>
                    <p className="text-danger fs-14 error-message">{formErrors.discount_for}</p>
                    <Col lg={12}>
                      <div className="d-flex align-items-center text-nowrap">
                        <Form.Check
                          type="radio"
                          name="discount_for"
                          id="non-prime"
                          value="0"
                          checked={formValues.discount_for == '0'}
                          onChange={handleChange}
                        />
                        <Form.Check.Label className="ms-2 me-5 pe-5" htmlFor="non-prime">
                          New Registered Users from Web (Non Prime)
                        </Form.Check.Label>
                        <Form.Check
                          type="radio"
                          name="discount_for"
                          id="non-prime-app"
                          value="1"
                          checked={formValues.discount_for == '1'}
                          onChange={handleChange}
                        />
                        <Form.Check.Label className="ms-2 me-5 pe-5" htmlFor="non-prime-app">
                          New Registered Users from App (Non Prime)
                        </Form.Check.Label>
                        <Form.Check
                          type="radio"
                          name="discount_for"
                          id="renewals"
                          value="2"
                          checked={formValues.discount_for == '2'}
                          onChange={handleChange}
                        />
                        <Form.Check.Label className="ms-2 me-5 pe-5" htmlFor="renewals">
                          Renewals
                        </Form.Check.Label>
                        <Form.Check
                          type="radio"
                          name="discount_for"
                          id="individualuser"
                          value="3"
                          checked={formValues.discount_for == '3'}
                          onChange={handleChange}
                        />
                        <Form.Check.Label className="ms-2 me-5 pe-5" htmlFor="individualuser">
                          Individual User
                        </Form.Check.Label>
                      </div>
                      <div className="w-25 mt-3 ms-auto">
                        <Form.Group className="border-bottom input-label">
                          <Form.Control
                            name="multiple_user_id"
                            id="multiple_user_id"
                            type="text"
                            className={`border-0 shadow-none rounded-0 ps-1 ${
                              formValues.discount_for != '3' && 'bg-light cursor-notallowed'
                            }`}
                            placeholder=" "
                            disabled={formValues.discount_for != '3'}
                            value={formValues.multiple_user_id}
                            onChange={handleChange}
                          />

                          <Form.Label className="start-0 mb-0 position-absolute ps-1" htmlFor="multiple_user_id">
                            Enter Email
                          </Form.Label>
                        </Form.Group>
                        <p className="text-lighter">Enter Multiple Email with Comma Separated</p>
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="light" className="me-2" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handlePromocode}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EditPromoCode;
