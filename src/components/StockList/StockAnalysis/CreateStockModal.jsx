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
        <Modal.Header onHide={handleClose} closeButton className="border-bottom">
          <Modal.Title as="h4">Add New Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <>
            <Form className="input-login my-2" onSubmit={handleCreateStock}>
              <Row>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="company"
                      id="company"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.company}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="company">
                      Company Name
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.company}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="industry"
                      id="industry"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.industry}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="industry">
                      Industry
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.industry}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="symbol"
                      id="symbol"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.symbol}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="symbol">
                      Symbol
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.symbol}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="instrument"
                      id="instrument"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.instrument}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="instrument">
                      Instrument Name
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.instrument}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="series"
                      id="series"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.series}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="series">
                      Series
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.series}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="isin"
                      id="isin"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.isin}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="isin">
                      ISIN Code
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.isin}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Label className="fin-select d-block border-bottom mb-0" htmlFor="fin">
                    <select
                      className="fin-field w-100 bg-white"
                      required
                      name="fin"
                      id="fin"
                      value={formValues.fin}
                      onChange={handleChange}
                    >
                      <option value="" selected disabled hidden></option>
                      <option value="Yes">&#160;&#160;Yes</option>
                      <option value="NO">&#160;&#160;NO</option>
                    </select>
                    <span className="fin-label">Fin Industry</span>
                  </Form.Label>
                  <p className="text-danger fs-14 error-message position-absolute mb-0">{formErrors.fin}</p>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="et"
                      id="et"
                      type="number"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.et}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="et">
                      ET Code
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.et}</p>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="sector"
                      id="sector"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.sector}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="sector">
                      Sector
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.sector}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="bse"
                      id="bse"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.bse}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="bse">
                      BSE Code
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.bse}</p>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="group"
                      id="group"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.group}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="group">
                      Group (A or B)
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.group}</p>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="stock-create border-bottom input-label">
                    <Form.Control
                      name="face"
                      id="face"
                      type="text"
                      className="border-0 shadow-none rounded-0 ps-1"
                      placeholder=" "
                      value={formValues.face}
                      onChange={handleChange}
                    />
                    <Form.Label className="start-0 mb-0 position-absolute" htmlFor="face">
                      Face Value
                    </Form.Label>
                    <p className="text-danger fs-14 error-message position-absolute">{formErrors.face}</p>
                  </Form.Group>
                </Col>
              </Row> */}
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer className="border-top">
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={handleCreateStock}>
            Add Stocks
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateStockModal;
