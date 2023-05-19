import { getGlobalSettingData, saveGlobalSetting } from '_services/nifty_service_api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const GlobalSetting = () => {
  const initialValues = {
    popup_title: '',
    popup_desc: '',
    popup_url: '',
    popup_button_title: '',
    popup_image_url: '',
    refer_amount: '',
    referral_amount: '',
    wallet_percent: '',
    max_watchlist: '',
    max_watchlist_symbol: '',
    max_trial_days: '',
    signalr_active: false,
    popup_active: false,
    refer_earn: false,
    trial_membership: false,
  };
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    globalSettingData();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };
  async function globalSettingData() {
    const response = await getGlobalSettingData();
    if (response.result == 1) {
      const values = {
        popup_title: response.data?.popup_title,
        popup_desc: response.data?.popup_desc,
        popup_url: response.data?.popup_url,
        popup_button_title: response.data?.popup_button_title,
        popup_image_url: response.data?.popup_image_url,
        refer_amount: response.data?.refer_amount,
        referral_amount: response.data?.referral_amount,
        wallet_percent: response.data?.wallet_percent,
        max_watchlist: response.data?.max_watchlist,
        max_watchlist_symbol: response.data?.max_watchlist_symbol,
        max_trial_days: response.data?.max_trial_days,
        signalr_active: response.data?.signalr_active,
        popup_active: response.data?.popup_active,
        refer_earn: response.data?.refer_earn,
        trial_membership: response.data?.trial_membership,
      };
      setFormValues(values);
    }
  }

  const handleGlobalSetting = async (e) => {
    e.preventDefault();
    const params = {
      id: 1,
      popup_title: formValues.popup_title,
      popup_desc: formValues.popup_desc,
      popup_url: formValues.popup_url,
      popup_button_title: formValues.popup_button_title,
      popup_image_url: formValues.popup_image_url,
      refer_amount: formValues.refer_amount,
      referral_amount: formValues.referral_amount,
      wallet_percent: formValues.wallet_percent,
      max_watchlist: formValues.max_watchlist,
      max_watchlist_symbol: formValues.max_watchlist_symbol,
      max_trial_days: formValues.max_trial_days,
      signalr_active: formValues.signalr_active,
      popup_active: formValues.popup_active,
      refer_earn: formValues.refer_earn,
      trial_membership: formValues.trial_membership,
    };
    await callStockApi(params);
  };

  async function callStockApi(params) {
    const response = await saveGlobalSetting(params);
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
          <h5 className="fw-500 mb-3">Global Setting</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form className="input-login my-2" onSubmit={handleGlobalSetting}>
                <Row>
                  <Col lg={4}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="popup_title">
                        Popup Title
                      </Form.Label>
                      <Form.Control
                        name="popup_title"
                        id="popup_title"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.popup_title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="popup_desc">
                        Popup Desc
                      </Form.Label>
                      <Form.Control
                        name="popup_desc"
                        id="popup_desc"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.popup_desc}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="popup_url">
                        Popup Url
                      </Form.Label>
                      <Form.Control
                        name="popup_url"
                        id="popup_url"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.popup_url}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="popup_button_title">
                        Popup Button Title
                      </Form.Label>
                      <Form.Control
                        name="popup_button_title"
                        id="popup_button_title"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.popup_button_title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col className="input-focus" lg={4}>
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="popup_image_url">
                        Popup Image Url
                      </Form.Label>
                      <Form.Control
                        name="popup_image_url"
                        id="popup_image_url"
                        type="text"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.popup_image_url}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="refer_amount">
                        Refer Value
                      </Form.Label>
                      <Form.Control
                        name="refer_amount"
                        id="refer_amount"
                        type="number"
                        className="common-input-feild"
                        placeholder=" "
                        value={parseFloat(formValues.refer_amount).toFixed(2)}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="referral_amount">
                        Referral Value
                      </Form.Label>
                      <Form.Control
                        name="referral_amount"
                        id="referral_amount"
                        type="number"
                        className="common-input-feild"
                        placeholder=" "
                        value={parseFloat(formValues.referral_amount).toFixed(2)}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="wallet_percent">
                        Wallet Percent
                      </Form.Label>
                      <Form.Control
                        name="wallet_percent"
                        id="wallet_percent"
                        type="number"
                        className="common-input-feild"
                        placeholder=" "
                        value={parseFloat(formValues.wallet_percent).toFixed(2)}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="max_watchlist">
                        Max Watchlist
                      </Form.Label>
                      <Form.Control
                        name="max_watchlist"
                        id="max_watchlist"
                        type="number"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.max_watchlist}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="max_watchlist_symbol">
                        Max Watchlist Symbols
                      </Form.Label>
                      <Form.Control
                        name="max_watchlist_symbol"
                        id="max_watchlist_symbol"
                        type="number"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.max_watchlist_symbol}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} className="input-focus">
                    <Form.Group className="my-2 input-label">
                      <Form.Label className="common-form-label" htmlFor="max_trial_days">
                        Max Trial Days
                      </Form.Label>
                      <Form.Control
                        name="max_trial_days"
                        id="max_trial_days"
                        type="number"
                        className="common-input-feild"
                        placeholder=" "
                        value={formValues.max_trial_days}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Row className='mt-4'>
                    <Col lg={3}>
                      <Form.Group as={Row}>
                        <Col lg={1} className="">
                          <input
                            type="checkbox"
                            name="signalr_active"
                            checked={formValues.signalr_active}
                            onChange={handleChange}
                            id="signalr_active"
                          />
                        </Col>
                        <Form.Label column lg={4} className="ps-0 pt-0 cursor-pointer" htmlFor="signalr_active">
                          SignalR Active
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group as={Row}>
                        <Col lg={1} className="">
                          <input
                            type="checkbox"
                            name="popup_active"
                            checked={formValues.popup_active}
                            onChange={handleChange}
                            id="popup_active"
                          />
                        </Col>
                        <Form.Label column lg={4} className="ps-0 pt-0 cursor-pointer" htmlFor="popup_active">
                          Popup Active
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group as={Row}>
                        <Col lg={1} className="">
                          <input
                            type="checkbox"
                            name="refer_earn"
                            checked={formValues.refer_earn}
                            onChange={handleChange}
                            id="refer_earn"
                          />
                        </Col>
                        <Form.Label column lg={4} className="ps-0 pt-0 cursor-pointer" htmlFor="refer_earn">
                          Refer Earn
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group as={Row}>
                        <Col lg={1} className="">
                          <input
                            type="checkbox"
                            name="trial_membership"
                            checked={formValues.trial_membership}
                            onChange={handleChange}
                            id="trial_membership"
                          />
                        </Col>

                        <Form.Label column lg={6} className="ps-0 pt-0 cursor-pointer" htmlFor="trial_membership">
                          Trial Membership
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
                <Button variant="primary" className="web-button mt-4" onClick={handleGlobalSetting}>
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

export default GlobalSetting;
