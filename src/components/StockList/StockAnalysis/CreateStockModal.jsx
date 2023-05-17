import { createStockData } from '_services/nifty_service_api';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

function CreateStockModal(props) {
  const { show, setShow, stockData } = props;
  const handleClose = () => setShow(false);
  const initialValues = {
    symbol: '',
    instrument: '',
    company: '',
    industry: '',
    series: '',
    fin: '',
    isin: '',
    et: '',
    sector: '',
    bse: '',
    // group: '',
    // face: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors('');
  };

  const handleCreateStock = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const errObj = validate(formValues);
    if (Object.keys(errObj).length == 0) {
      const params = {
        symbol_name: formValues.symbol,
        instrument_name: formValues.instrument,
        company_name: formValues.company,
        industry: formValues.industry,
        series: formValues.series,
        isin_code: formValues.isin,
        fin_industry: formValues.fin,
        et_code: formValues.et,
        sector: formValues.sector,
        bse_code: formValues.bse,
        // group_value: formValues.group,
        // face_value: formValues.face,
      };
      await callStockApi(params);
    }
  };

  async function callStockApi(params) {
    const response = await createStockData(params);
    if (response.result == 1) {
      toast.success(response.message);
      handleClose();
      stockData()
    } else {
      toast.error(response.message);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.company) {
      errors.company = 'Please Enter Company name';
    }
    if (!values.industry) {
      errors.industry = 'Please Enter Industry';
    }
    if (!values.symbol) {
      errors.symbol = 'Please Enter Symbol name';
    }
    if (!values.instrument) {
      errors.instrument = 'Please Enter Instrument name with NSE:';
    }
    if (!values.series) {
      errors.series = 'Please Enter Series';
    }

    if (!values.isin) {
      errors.isin = 'Please Enter ISIN Code';
    }

    if (!values.et) {
      errors.et = 'Please Enter ET Code';
    }

    if (!values.bse) {
      errors.bse = 'Please Enter BSE Code';
    }
    // if (!values.group) {
    //   errors.group = 'Please Enter Group As A or B';
    // }

    return errors;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size={'lg'} centered>
        <Modal.Header onHide={handleClose} closeButton>
          <Modal.Title as="h5">Add New Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0 py-1">
          <>
            <Form className="input-login" onSubmit={handleCreateStock}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="company">
                      Company Name
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter Company Name"
                      name="company"
                      id="company"
                      type="text"
                      className="common-input-feild"
                      value={formValues.company}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.company}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="industry">
                      Industry
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter Industry"
                      name="industry"
                      id="industry"
                      type="text"
                      className="common-input-feild"
                      value={formValues.industry}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.industry}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="symbol">
                      Symbol
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter Symbol"
                      name="symbol"
                      id="symbol"
                      type="text"
                      className="common-input-feild"
                      value={formValues.symbol}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.symbol}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="instrument">
                      Instrument Name
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter Instrument Name"
                      name="instrument"
                      id="instrument"
                      type="text"
                      className="common-input-feild"
                      value={formValues.instrument}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.instrument}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="series">
                      Series
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter Series"
                      name="series"
                      id="series"
                      type="text"
                      className="common-input-feild"
                      value={formValues.series}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.series}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="isin">
                      ISIN Code
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter ISIN Code"
                      name="isin"
                      id="isin"
                      type="text"
                      className="common-input-feild"
                      value={formValues.isin}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.isin}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="fin">
                      Fin Industry
                    </Form.Label>
                    <select
                      placeholder="Enter Fin Industry"
                      className="w-100 bg-white p-2 rounded-2 common-input-feild text-secondary"
                      required
                      name="fin"
                      id="fin"
                      value={formValues.fin}
                      onChange={handleChange}
                    >
                      <option value="">Select Fin Industry</option>
                      <option value="Yes">&#160;&#160;Yes</option>
                      <option value="NO">&#160;&#160;NO</option>
                    </select>
                  </Form.Group>
                  <p className="text-danger fs-14 error-message position-absolute mb-0">{formErrors.fin}</p>
                </Col>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="et">
                      ET Code
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter ET Code"
                      name="et"
                      id="et"
                      type="number"
                      className="common-input-feild"
                      value={formValues.et}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.et}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="sector">
                      Sector
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter Sector"
                      name="sector"
                      id="sector"
                      type="text"
                      className="common-input-feild"
                      value={formValues.sector}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.sector}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Label className="common-form-label" htmlFor="bse">
                      BSE Code
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter BSE Code"
                      name="bse"
                      id="bse"
                      type="text"
                      className="common-input-feild"
                      value={formValues.bse}
                      onChange={handleChange}
                    />
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.bse}</p>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Control
                      name="group"
                      id="group"
                      type="text"
                      className="common-input-feild"
                      value={formValues.group}
                      onChange={handleChange}
                    />
                    <Form.Label className="common-form-label" htmlFor="group">
                      Group (A or B)
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.group}</p>
placeholder="Enter Group (A or B)"
                    </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="my-2 input-label">
                    <Form.Control
                      name="face"
                      id="face"
                      type="text"
                      className="common-input-feild"
                      value={formValues.face}
                      onChange={handleChange}
                    />
                    <Form.Label className="common-form-label" htmlFor="face">
                      Face Value
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.face}</p>
placeholder="Enter Face Value"
                    </Form.Group>
                </Col>
              </Row> */}
              <Row>
                <Col className='my-3'>
                  <Button variant="light" className='me-3' onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" className='web-button' type='submit' onClick={handleCreateStock}>
                    Add Stocks
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateStockModal;
