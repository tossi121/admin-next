import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addScreenerData, getStockDataList } from '_services/nifty_service_api';

function AddScreenerGroup(props) {
    const { setShow, ScreenerData } = props;
    const initialValues = {
        name: '',
        symbol_name: '',
        is_active: false,
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [stockList, setStockList] = useState([]);
    const [totalItems, setTotalItems] = useState(null)

    const handleShow = () => setShow(false)

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
    };

    const handleCreateScreneer = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        const errObj = validate(formValues);
        if (Object.keys(errObj).length == 0) {
            const params = {
                screener_group_name: formValues.name,
                symbol_name: formValues.symbol_name,
                is_active: formValues.is_active ? 1 : 0,
            }
            await callStockApi(params);
        }
    };

    async function callStockApi(params) {
        const response = await addScreenerData(params);
        if (response.result == 1) {
            toast.success(response.message);
            handleShow();
            ScreenerData()
        } else {
            toast.error(response.message);
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Please Enter Group Name';
        }
        if (!values.symbol_name) {
            errors.symbol_name = 'Please Enter Group Symbol Name';
        }
        return errors;
    };

    async function getStockName() {
        const params = {
            pageNumber: 1,
            pageSize: totalItems,
            search_keyword: '',
        };
        const response = await getStockDataList(params)
        if (response.result == 1) {
            const data = response.data;
            setTotalItems(data.totalItems)
            setStockList(data.items);
        }
    }

    useEffect(() => {
        getStockName()
        handleSelectChange(stockList)
    }, [totalItems])


    const handleSelectChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : "";
        if (!formValues?.symbol_name?.includes(selectedValue)) {
            const updatedValue = formValues.symbol_name ? `${formValues.symbol_name}, ${selectedValue}` : selectedValue;
            setFormValues({ ...formValues, symbol_name: updatedValue });
        }
    };

    return (
        <>
            <Row>
                <Col>
                    <Card className='mt-3'>
                        <Card.Body>
                            <Form className="input-login" onSubmit={handleCreateScreneer}>
                                <Row>
                                    <Col>
                                        <Card.Title className='fs-4 mb-2'>Add New Group</Card.Title>
                                    </Col>
                                    <Col className='text-end'>
                                        <FontAwesomeIcon icon={faTimes} width="18" height="18" className='fs-20 me-1 cursor-pointer' onClick={() => handleShow()} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mt-3 border-bottom input-label">
                                            <Form.Control
                                                name="name"
                                                id="name"
                                                type="text"
                                                className="border-0 shadow-none rounded-0 ps-1"
                                                placeholder=" "
                                                value={formValues.name}
                                                onChange={handleChange}
                                            />
                                            <Form.Label className="start-0 mb-0 position-absolute" htmlFor="name">
                                                Group Name*
                                            </Form.Label>
                                        </Form.Group>
                                        <p className="text-danger fs-14 error-message my-1 position-absolute">{formErrors.name}</p>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Row} className="mb-3 me-2">
                                            <Form.Label column lg={12} htmlFor="select_symbol">
                                                Search Symbol*
                                            </Form.Label>
                                            <Col lg={12}>
                                                <Select
                                                    className="react-select react-select-container"
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
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group as={Row} className="mb-2">
                                        <Form.Label column lg={12} htmlFor="textarea">
                                            Group Symbol*
                                        </Form.Label>
                                        <Col lg={12}>
                                            <Form.Control
                                                as="textarea"
                                                rows={15}
                                                id="textarea"
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
                                        <Form.Group as={Row} className="mb-3 ps-2">
                                            <Col lg={1} className="mt-0 p-0">
                                                <Form.Control
                                                    type="checkbox"
                                                    name="is_active"
                                                    checked={formValues.is_active}
                                                    onChange={handleChange}
                                                    id="is_active"
                                                />
                                            </Col>
                                            <Form.Label
                                                column
                                                lg={4}
                                                className="ps-0 pt-0 cursor-pointer"
                                                htmlFor="is_active"
                                            >
                                                Is Active
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="light" className='me-2' onClick={handleShow} >
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleCreateScreneer}>
                                    Add Group
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </>
    );
}

export default AddScreenerGroup;
