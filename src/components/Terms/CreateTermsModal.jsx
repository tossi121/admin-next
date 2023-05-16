import React, { useRef, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createTermsData } from '_services/nifty_service_api';

function CreateTermsModal(props) {
  const { setShow, termsData } = props;
  const editor = useRef(null);
  const handleClose = () => setShow(false);
  const [descr, setDescr] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const initialValues = {
    title: '',
    slugUrl: '',
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
        title: formValues.title,
        descr: descr,
        shortDesc: shortDesc,
        slugUrl: formValues.slugUrl,
      };
      await callStockApi(params);
    }
  };

  async function callStockApi(params) {
    const response = await createTermsData(params);
    if (response.result == 1) {
      toast.success(response.message);
      handleClose();
      termsData()
    } else {
      toast.error(response.message);
    }
  }

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Please Enter Title';
    }
    if (!values.slugUrl) {
      errors.slugUrl = 'Please Enter Slug Url';
    }
    return errors;
  };

  return (
    <>
      <Row>
        <Col>
          <Card className="mt-3">
            <Card.Body>
              <Form className="input-login" onSubmit={handleCreateStock}>
                <Row className="mb-3">
                  <Col>
                    <Card.Title className="fs-4">Add Terms</Card.Title>
                  </Col>
                  <Col className="text-end">
                    <FontAwesomeIcon
                      icon={faTimes}
                      width="18"
                      height="18"
                      className="fs-20 me-1 cursor-pointer"
                      onClick={() => setShow(false)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-4 border-bottom input-label">
                      <Form.Control
                        name="title"
                        id="title"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.title}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="title">
                        Title
                      </Form.Label>
                      <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.title}</p>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-4 border-bottom input-label">
                      <Form.Control
                        name="slugUrl"
                        id="slugUrl"
                        type="text"
                        className="border-0 shadow-none rounded-0 ps-1"
                        placeholder=" "
                        value={formValues.slugUrl}
                        onChange={handleChange}
                      />
                      <Form.Label className="start-0 mb-0 position-absolute" htmlFor="slugUrl">
                        Slug
                      </Form.Label>
                      <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.slugUrl}</p>
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column lg={2} htmlFor="example-fileinput">
                        Picture 1
                      </Form.Label>
                      <Col lg={10}>
                        <Form.Control type="file" id="example-fileinput" />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column lg={2} htmlFor="example-fileinput">
                        Picture 2
                      </Form.Label>
                      <Col lg={10}>
                        <Form.Control type="file" id="example-fileinput" />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row> */}

                <Row className="mb-4">
                  <Col lg={6}>
                    <Form.Label column lg={12} htmlFor="shortDesc">
                      Short Description
                    </Form.Label>
                    <JoditEditor ref={editor} value={shortDesc} onChange={(newContent) => setShortDesc(newContent)} />
                  </Col>
                  <Col lg={6}>
                    <Form.Label column lg={12} htmlFor="descr">
                      Description
                    </Form.Label>
                    <JoditEditor ref={editor} value={descr} onChange={(newContent) => setDescr(newContent)} />
                  </Col>
                </Row>
                <Button variant="light" className="me-3" onClick={() => setShow(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateStock}>
                  Add New Term
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CreateTermsModal;
