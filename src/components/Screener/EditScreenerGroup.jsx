import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addScreenerData, getStockDataList, updateScreenerData } from '_services/nifty_service_api';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';

const EditScreenerGroup = (props) => {
    const { setShow, selectedId, ScreenerData } = props;
    const [stockList, setStockList] = useState([]);
    const [totalItems, setTotalItems] = useState(null)
    const handleClose = () => setShow(false);

    const initialValues = {
        screener_group_name: '',
        symbol_name: '',
        is_active: false,
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (selectedId) {
            handelScreenerData();
        }
    }, [selectedId]);

    async function handelScreenerData() {
        const params = {
            id: selectedId,
        };
        const response = await updateScreenerData(params);
        if (response.result === 1) {
            const values = {
                screener_group_name: response.data?.screener_group_name,
                symbol_name: response.data?.symbol_name,
                is_active: response.data?.is_active ? 1 : 0,
            };
            setFormValues(values);
        }
    }

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        const newValue = e.target.type === 'checkbox' ? checked : value;

        if (e.target.type === 'checkbox') {
            setFormValues({ ...formValues, [name]: checked });
        } else if (e.target.type === 'select-one') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedValue = selectedOption.value;
            setFormValues({ ...formValues, [name]: selectedValue });
        } else {
            setFormValues({ ...formValues, [name]: newValue });
        }
        setFormErrors('');
    };

    const handleCreateStock = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        const errObj = validate(formValues);
        if (Object.keys(errObj).length === 0) {
            const params = {
                screener_group_id: selectedId,
                screener_group_name: formValues.screener_group_name,
                symbol_name: formValues.symbol_name,
                is_active: formValues.is_active ? 1 : 0
            };
            await callStockApi(params);
        }
    };

    async function callStockApi(params) {
        const response = await addScreenerData(params);
        if (response.result === 1) {
            toast.success(response.message);
            handleClose();
            ScreenerData()
        } else {
            toast.error(response.message);
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.screener_group_name) {
            errors.screener_group_name = 'Please Enter Group Name';
        }
        if (!values.symbol_name) {
            errors.symbol_name = 'Please Enter Symbol Name';
        }
        return errors;
    };

    // select
    async function getStockName() {
        const params = {
            pageNumber: 1,
            pageSize: totalItems,
            search_keyword: '',
        };
        const response = await getStockDataList(params)
        if (response.result === 1) {
            const data = response.data;
            setTotalItems(data.totalItems)
            setStockList(data.items);
        }
    }

    const handleSelectChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : "";
        if (!formValues?.symbol_name?.includes(selectedValue)) {
            const updatedValue = formValues.symbol_name ? `${formValues.symbol_name}, ${selectedValue}` : selectedValue;
            setFormValues({ ...formValues, symbol_name: updatedValue });
        }
    };

    useEffect(() => {
        getStockName()
    }, [totalItems])

    return (
        <Row>
            <Col>
                <Card className='mt-3'>
                    <Card.Body>
                        <Form className="input-login" onSubmit={handleCreateStock}>
                            <Row>
                                <Col>
                                    <h5 className='fw-500 mb-3'>Edit Group</h5>
                                </Col>
                                <Col className='text-end'>
                                    <FontAwesomeIcon icon={faTimes} width="18" height="18" className='fs-20 me-1 cursor-pointer' onClick={() => handleClose()} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="my-2 pt-1 input-label">
                                        <Form.Label className="common-form-label" htmlFor="name">
                                            Group Name*
                                        </Form.Label>
                                        <Form.Control
                                            name="screener_group_name"
                                            id="name"
                                            type="text"
                                            className="common-input-feild"
                                            placeholder=" "
                                            value={formValues.screener_group_name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.screener_group_name}</p>
                                </Col>
                                <Col>
                                    <Form.Group as={Row} className="my-2 input-label">
                                        <Form.Label column lg={12} className="common-form-label" htmlFor="select_symbol">
                                            Search Symbol*
                                        </Form.Label>
                                        <Select
                                            className="react-select react-select-container border border-0"
                                            classNamePrefix="react-select"
                                            name="select_symbol"
                                            id='select_symbol'
                                            options={stockList.map((item) => ({
                                                value: item.company_name,
                                                label: item.company_name,
                                            }))}
                                            onChange={handleSelectChange}
                                            isSearchable
                                            placeholder="Select Broker"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group as={Row} className="my-2 input-label">
                                    <Form.Label column lg={12} htmlFor="example-textarea">
                                        Group Symbol*
                                    </Form.Label>
                                    <Col lg={12}>
                                        <Form.Control
                                            as="textarea"
                                            rows={15}
                                            id="example-textarea"
                                            placeholder="Symbols"
                                            name="symbol_name"
                                            value={formValues.symbol_name}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <p className="text-danger fs-14 error-message mb-2">{formErrors.symbol_name}</p>
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <Form.Group as={Row} className="common-form-label">
                                        <Col lg={1}>
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                checked={formValues.is_active}
                                                onChange={handleChange}
                                                className="common-input-feild ms-1"
                                                id="is_active"
                                            />
                                        </Col>
                                        <Form.Label
                                            column
                                            lg={4}
                                            className="ps-2 pt-0 cursor-pointer"
                                            htmlFor="is_active"
                                        >
                                            Is Active
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="light" className='me-2' onClick={handleClose} >
                                Close
                            </Button>
                            <Button variant="primary" className='web-button' onClick={handleCreateStock}>
                                Add Group
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col >
        </Row >
    )
}

export default EditScreenerGroup