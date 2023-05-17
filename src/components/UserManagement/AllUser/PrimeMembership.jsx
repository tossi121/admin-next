import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
// import { updateUserPlan } from '../../../../_services/nifty_service_api';

const PrimeMembership = (props) => {
  const { show, setShow, selectedId, userDetailsData } = props;
  const initialValues = { plan_duration: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  function handleClose() {
    setShow(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      const params = {
        plan_update_type: 1,
        user_id: selectedId,
        plan_duration_months: formValues.plan_duration,
        membership_id: 0,
        order_id: 0,
      };
      await callStockApi(params);
    }
  };

  async function callStockApi(params) {
    const response = await updateUserPlan(params);
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
    if (!values.plan_duration) {
      errors.plan_duration = 'Please Select One Option';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size={'md'} centered>
        <Modal.Header onHide={handleClose} closeButton className="border-bottom">
          <Modal.Title as="h4">Prime Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Form onSubmit={handleSubmit}>
            <Row></Row>
            <Row>
              <Col lg={12} className="d-flex align-items-center m-1">
                <Form.Check type="radio" name="plan_duration" id="1-month" value="1" onChange={handleChange} />
                <Form.Check.Label className="mx-2" htmlFor="1-month">
                  Prime for 1 Months
                </Form.Check.Label>
              </Col>
              <Col lg={12} className="d-flex align-items-center m-1">
                <Form.Check type="radio" name="plan_duration" id="3-months" value="3" onChange={handleChange} />
                <Form.Check.Label className="mx-2" htmlFor="3-months">
                  Prime for 3 Months
                </Form.Check.Label>
              </Col>
              <Col lg={12} className="d-flex align-items-center m-1 mb-2">
                <Form.Check type="radio" name="plan_duration" id="year" value="12" onChange={handleChange} />
                <Form.Check.Label className="mx-2" htmlFor="year">
                  Prime for 12 Months
                </Form.Check.Label>
              </Col>
              <p className="text-danger fs-14 error-message ms-2">{formErrors.plan_duration}</p>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='text-white web-button ms-3' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrimeMembership;
