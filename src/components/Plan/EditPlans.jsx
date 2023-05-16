import { savePrimePlanList, updatePrimePlanList } from '_services/nifty_service_api';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

function EditPlans(props) {
  const { show, setShow, selectedId, planData } = props;
  const handleClose = () => setShow(false);
  const initialValues = {
    plan_name: '',
    plan_duration: '',
    plan_pricing: '',
    plan_old_price: '',
    plan_short_message: '',
    is_plan_recommend: false,
    is_plan_used: false,
    plan_sequence: '',
    plan_type: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedId) {
      handelPromoCodeData();
    }
  }, [selectedId]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  async function handelPromoCodeData() {
    const params = {
      id: selectedId,
    };
    const response = await updatePrimePlanList(params);
    if (response.result == 1) {
      const values = {
        plan_name: response.data?.plan_name,
        plan_duration: response.data?.plan_duration,
        plan_pricing: response.data?.plan_pricing,
        plan_old_price: response.data?.plan_old_price,
        plan_short_message: response.data?.plan_short_message,
        is_plan_recommend: response.data?.is_plan_recommend,
        is_plan_used: response.data?.is_plan_used,
        plan_sequence: response.data?.plan_sequence,
        plan_type: response.data?.plan_type,
      };
      setFormValues(values);
    }
  }

  const handlePromocode = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      const params = {
        plan_features_id: selectedId,
        plan_name: formValues.plan_name,
        plan_duration: formValues.plan_duration,
        plan_pricing: formValues.plan_pricing,
        plan_old_price: formValues.plan_old_price,
        plan_short_message: formValues.plan_short_message,
        is_plan_recommend: formValues.is_plan_recommend,
        is_plan_used: formValues.is_plan_used,
        plan_sequence: formValues.plan_sequence,
        plan_type: formValues.plan_type,
      };
      await callStockApi(params);
    }
  };

  async function callStockApi(params) {
    const response = await savePrimePlanList(params);
    if (response.result == 1) {
      toast.success(response.message);
      handleClose();
      planData()
    } else {
      toast.error(response.message);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.plan_name) {
      errors.plan_name = 'Please Enter Plan Name';
    }
    if (!values.plan_pricing) {
      errors.plan_pricing = 'Please Enter Price';
    }
    if (!values.plan_short_message) {
      errors.plan_short_message = 'Please Enter Short Message';
    }
    if (!values.plan_duration) {
      errors.plan_duration = 'Please Enter Plan Duration';
    }
    if (!values.plan_old_price) {
      errors.plan_old_price = 'Please Enter Plan Old Price';
    }
    if (!values.plan_sequence) {
      errors.plan_sequence = 'Please Enter Plan Sequence';
    }
    if (!values.plan_type) {
      errors.plan_type = 'Please Select Plan Type';
    }

    return errors;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size={'lg'} centered>
        <Modal.Header onHide={handleClose} closeButton className="border-bottom">
          <Modal.Title as="h4">Edit Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3 py-0">
          <>
            <Form className="input-login text-nowrap" onSubmit={handlePromocode}>
              <Row className="mt-4">
                <Col>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="plan_name"
                      id="plan_name"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.plan_name}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="plan_name">
                      Plan Name
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_name}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="plan_short_message"
                      id="plan_short_message"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.plan_short_message}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="plan_short_message">
                      Plan Short Message
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_short_message}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="plan_duration"
                      id="plan_duration"
                      type="number"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.plan_duration}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="plan_duration">
                      Plan Duration
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_duration}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="plan_old_price"
                      id="plan_old_price"
                      type="number"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.plan_old_price}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="plan_old_price">
                      Plan Old Price
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_old_price}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 border-bottom input-label">
                    <Form.Control
                      name="plan_pricing"
                      id="plan_pricing"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.plan_pricing}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="plan_pricing">
                      Plan Price
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_pricing}</p>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 border-bottom input-label">
                    <Form.Control
                      name="plan_sequence"
                      id="plan_sequence"
                      type="number"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.plan_sequence}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="plan_sequence">
                      Plan Sequence
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_sequence}</p>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col className="input-focus">
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column lg={12} htmlFor="discount-type">
                      Choose Discount Type
                    </Form.Label>
                    <Col lg={12}>
                      <div className="d-flex">
                        <Form.Check
                          type="radio"
                          name="plan_type"
                          id="percentage"
                          value="2"
                          checked={formValues.plan_type == '2'}
                          onChange={handleChange}
                        />
                        <Form.Check.Label className="mx-2" htmlFor="percentage">
                          Nifty Subscription
                        </Form.Check.Label>
                        <Form.Check
                          type="radio"
                          name="plan_type"
                          id="flat"
                          value="3"
                          checked={formValues.plan_type == '3'}
                          onChange={handleChange}
                        />
                        <Form.Check.Label className="ms-2" htmlFor="flat">
                          Simulator Subscription
                        </Form.Check.Label>
                      </div>
                      <p className="text-danger fs-14 error-message position-absolute">{formErrors.plan_type}</p>
                    </Col>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group as={Row} className="mt-3 ps-4">
                    <Col lg={1} className="mt-0 p-0">
                      <Form.Control
                        type="checkbox"
                        name="is_plan_recommend"
                        checked={formValues.is_plan_recommend}
                        onChange={handleChange}
                        id="is_plan_recommend"
                      />
                    </Col>
                    <Form.Label column lg={4} className="ps-3 pt-0 cursor-pointer" htmlFor="is_plan_recommend">
                      Is Plan Used
                    </Form.Label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mt-3 ps-2">
                    <Col lg={1} className="mt-0 p-0">
                      <Form.Control
                        type="checkbox"
                        name="is_plan_used"
                        checked={formValues.is_plan_used}
                        onChange={handleChange}
                        id="is_plan_used"
                      />
                    </Col>
                    <Form.Label column lg={4} className="ps-3 pt-0 cursor-pointer" htmlFor="is_plan_used">
                      Is Plan Recommend
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button variant="primary" onClick={handlePromocode}>
            Submit
          </Button>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPlans;