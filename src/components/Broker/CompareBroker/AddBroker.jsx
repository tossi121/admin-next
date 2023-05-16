import React, {  useState } from 'react';
import { Button, Card, Col, Form, Row, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { addBrokerData } from '_services/nifty_service_api';

function AddBroker(props) {
  const { setShow, enquiryListData } = props;
  const handleClose = () => setShow(false);

  const initialValues = {
    overview_broker_name: '',
    overview_year_of_incorporation: '',
    overview_broker_phone: '',
    overview_exchanges_enabled: '',
    overview_demat_nsdl_cdsl: '',
    overview_broker_rating: '',
    overview_website: '',
    brokerage_equity: '',
    brokerage_equity_futures: '',
    brokerage_equity_options: '',
    brokerage_currency_futures: '',
    brokerage_currency_options: '',
    brokerage_commodity: '',
    other_info_company_logo: '',
    other_info_fav_icon: '',
    other_info_nifty_page_url: '',
    other_info_slug_url: '',
    account_opening_cost_trading_only: '',
    account_opening_cost_trading_demat: '',
    account_opening_cost_commodity: '',
    transparency_other_cost_equity: '',
    transparency_other_cost_futures: '',
    transparency_other_cost_options: '',
    transparency_other_cost_commodities: '',
    transparency_other_cost_amc_charge: '',
    transparency_other_cost_dp_transaction_charge: '',
    transparency_other_cost_offline_order_place_charge: '',
    charting_intraday: '',
    charting_end_of_day: '',
    margin_equity: '',
    margin_equity_futures: '',
    margin_equity_options: '',
    margin_currency_futures: '',
    margin_currency_options: '',
    margin_commodities: '',
    broker_service_type: '',
    broker_account_opening_charge: '',
    broker_account_maintain_charge: '',
    broker_equity_delivery_brokerage: '',
    broker_equity_intraday_brokerage: '',
    broker_trade_description: '',
    broker_theme_color: '',
    top5_web_affiliate_link: '',
    top5_web_sequence: '',
    top5_app_affiliate_link: '',
    top5_app_sequence: '',
    top_broker_web_affiliate_link: '',
    top_broker_web_sequence: '',
    platform_software: false,
    platform_mobile: false,
    platform_web_html: false,
    charting_coding_backtesting: false,
    reporting_trade_reports: false,
    reporting_pnl_reports: false,
    reporting_contract_notes: false,
    support_research_tips: false,
    support_brokerage_calculator: false,
    support_margin_calculator: false,
    support_bracket_order_trailing: false,
    support_training_education: false,
    convenience_account_3in_1: false,
    convenience_instant_fund_withdrawal: false,
    convenience_relationship_managers: false,
    equity_option_equity: false,
    equity_option_equity_futures: false,
    equity_option_equity_options: false,
    equity_option_currency_futures: false,
    equity_option_currency_options: false,
    equity_option_commodity: false,
    top5_web_is_active: false,
    top5_app_is_active: false,
    top_broker_web_is_active: false,
  };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleBroker = async (e) => {
    e.preventDefault();
    const params = {
      overview_broker_name: formValues.overview_broker_name,
      overview_year_of_incorporation: formValues.overview_year_of_incorporation,
      overview_broker_phone: formValues.overview_broker_phone,
      overview_exchanges_enabled: formValues.overview_exchanges_enabled,
      overview_demat_nsdl_cdsl: formValues.overview_demat_nsdl_cdsl,
      overview_broker_rating: formValues.overview_broker_rating,
      overview_website: formValues.overview_website,
      brokerage_equity: formValues.brokerage_equity,
      brokerage_equity_futures: formValues.brokerage_equity_futures,
      brokerage_equity_options: formValues.brokerage_equity_options,
      brokerage_currency_futures: formValues.brokerage_currency_futures,
      brokerage_currency_options: formValues.brokerage_currency_options,
      brokerage_commodity: formValues.brokerage_commodity,
      other_info_company_logo: formValues.other_info_company_logo,
      other_info_fav_icon: formValues.other_info_fav_icon,
      other_info_nifty_page_url: formValues.other_info_nifty_page_url,
      other_info_slug_url: formValues.other_info_slug_url,
      account_opening_cost_trading_only: formValues.account_opening_cost_trading_only,
      account_opening_cost_trading_demat: formValues.account_opening_cost_trading_demat,
      account_opening_cost_commodity: formValues.account_opening_cost_commodity,
      transparency_other_cost_equity: formValues.transparency_other_cost_equity,
      transparency_other_cost_futures: formValues.transparency_other_cost_futures,
      transparency_other_cost_options: formValues.transparency_other_cost_options,
      transparency_other_cost_commodities: formValues.transparency_other_cost_commodities,
      transparency_other_cost_amc_charge: formValues.transparency_other_cost_amc_charge,
      transparency_other_cost_dp_transaction_charge: formValues.transparency_other_cost_dp_transaction_charge,
      transparency_other_cost_offline_order_place_charge: formValues.transparency_other_cost_offline_order_place_charge,
      platform_software: formValues.platform_software,
      platform_mobile: formValues.platform_mobile,
      platform_web_html: formValues.platform_web_html,
      charting_intraday: formValues.charting_intraday,
      charting_end_of_day: formValues.charting_end_of_day,
      charting_coding_backtesting: formValues.charting_coding_backtesting,
      reporting_trade_reports: formValues.reporting_trade_reports,
      reporting_pnl_reports: formValues.reporting_pnl_reports,
      reporting_contract_notes: formValues.reporting_contract_notes,
      margin_equity: formValues.margin_equity,
      margin_equity_futures: formValues.margin_equity_futures,
      margin_equity_options: formValues.margin_equity_options,
      margin_currency_futures: formValues.margin_currency_futures,
      margin_currency_options: formValues.margin_currency_options,
      margin_commodities: formValues.margin_commodities,
      support_research_tips: formValues.support_research_tips,
      support_brokerage_calculator: formValues.support_brokerage_calculator,
      support_margin_calculator: formValues.support_margin_calculator,
      support_bracket_order_trailing: formValues.support_bracket_order_trailing,
      support_training_education: formValues.support_training_education,
      convenience_account_3in_1: formValues.convenience_account_3in_1,
      convenience_instant_fund_withdrawal: formValues.convenience_instant_fund_withdrawal,
      convenience_relationship_managers: formValues.convenience_relationship_managers,
      equity_option_equity: formValues.equity_option_equity,
      equity_option_equity_futures: formValues.equity_option_equity_futures,
      equity_option_equity_options: formValues.equity_option_equity_options,
      equity_option_currency_futures: formValues.equity_option_currency_futures,
      equity_option_currency_options: formValues.equity_option_currency_options,
      equity_option_commodity: formValues.equity_option_commodity,
      broker_service_type: formValues.broker_service_type,
      broker_account_opening_charge: formValues.broker_account_opening_charge,
      broker_account_maintain_charge: formValues.broker_account_maintain_charge,
      broker_equity_delivery_brokerage: formValues.broker_equity_delivery_brokerage,
      broker_equity_intraday_brokerage: formValues.broker_equity_intraday_brokerage,
      broker_trade_description: formValues.broker_trade_description,
      broker_theme_color: formValues.broker_theme_color,
      top5_web_affiliate_link: formValues.top5_web_affiliate_link,
      top5_web_sequence: formValues.top5_web_sequence,
      top5_web_is_active: formValues.top5_web_is_active,
      top5_app_affiliate_link: formValues.top5_app_affiliate_link,
      top5_app_sequence: formValues.top5_app_sequence,
      top5_app_is_active: formValues.top5_app_is_active,
      top_broker_web_affiliate_link: formValues.top_broker_web_affiliate_link,
      top_broker_web_sequence: formValues.top_broker_web_sequence,
      top_broker_web_is_active: formValues.top_broker_web_is_active,
    };
    await callStockApi(params);
  };

  async function callStockApi(params) {
    const response = await addBrokerData(params);
    if (response.result == 1) {
      toast.success(response.message);
      handleClose();
      enquiryListData()
    } else {
      toast.error(response.message);
    }
  }

  function handleEditShow() {
    setShow(false);
  }

  return (
    <>
      <Row>
        <Col>
          <Card className="mt-3">
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Card.Title className="fs-4 mb-2">Add New Broker</Card.Title>
                  </Col>
                  <Col className="text-end">
                    <FontAwesomeIcon
                      icon={faTimes}
                      width="18"
                      height="18"
                      className="fs-20 me-1 cursor-pointer"
                      onClick={() => handleEditShow()}
                    />
                  </Col>
                </Row>

                <Row className="user-details">
                  <Form className="input-login" onSubmit={handleBroker}>
                    <Tabs defaultActiveKey="Overview" id="uncontrolled-tab-example" className="mb-0">
                      <Tab eventKey="Overview" className="ps-2" title="Overview">
                        <h5 className="mt-0 mb-2 fs-4">Overview</h5>
                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_broker_name"
                                id="overview_broker_name"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_broker_name}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="overview_broker_name">
                                Broker Name
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_year_of_incorporation"
                                id="overview_year_of_incorporation"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_year_of_incorporation}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="overview_year_of_incorporation"
                              >
                                Year of Incorporation
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_website"
                                id="overview_website"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_website}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="overview_website">
                                Website
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_broker_phone"
                                id="overview_broker_phone"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_broker_phone}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="overview_broker_phone">
                                Phone
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_exchanges_enabled"
                                id="overview_exchanges_enabled"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_exchanges_enabled}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="overview_exchanges_enabled"
                              >
                                Exchanges enabled
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_demat_nsdl_cdsl"
                                id="overview_demat_nsdl_cdsl"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_demat_nsdl_cdsl}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="overview_demat_nsdl_cdsl">
                                Demat (NSDL/CDSL)
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="overview_broker_rating"
                                id="overview_broker_rating"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.overview_broker_rating}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="overview_broker_rating">
                                Broker Rating
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <h5 className="mt-0 mb-2 fs-4">Brokerage</h5>
                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="brokerage_equity"
                                id="brokerage_equity"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.brokerage_equity}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="brokerage_equity">
                                Equity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="brokerage_equity_futures"
                                id="brokerage_equity_futures"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.brokerage_equity_futures}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="brokerage_equity_futures">
                                Equity Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="brokerage_equity_options"
                                id="brokerage_equity_options"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.brokerage_equity_options}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="brokerage_equity_options">
                                Equity Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="brokerage_currency_futures"
                                id="brokerage_currency_futures"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.brokerage_currency_futures}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="brokerage_currency_futures"
                              >
                                Currency Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="brokerage_currency_options"
                                id="brokerage_currency_options"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.brokerage_currency_options}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="brokerage_currency_options"
                              >
                                Currency Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="brokerage_commodity"
                                id="brokerage_commodity"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.brokerage_commodity}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="brokerage_commodity">
                                Commodity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <h5 className="mt-0 mb-2 fs-4">Other Info</h5>

                        <Row>
                          <Col>
                            <Form.Group className="mt-3 border-bottom input-label">
                              <Form.Control
                                name="other_info_company_logo"
                                id="other_info_company_logo"
                                type="file"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.other_info_company_logo}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="other_info_company_logo">
                                Company Logo
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mt-3 border-bottom input-label">
                              <Form.Control
                                name="other_info_fav_icon"
                                id="other_info_fav_icon"
                                type="file"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.other_info_fav_icon}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="other_info_fav_icon">
                                Fav Icon
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-3 border-bottom input-label">
                              <Form.Control
                                name="other_info_nifty_page_url"
                                id="other_info_nifty_page_url"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.other_info_nifty_page_url}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="other_info_nifty_page_url"
                              >
                                Nifty Page Url
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-3 border-bottom input-label">
                              <Form.Control
                                name="other_info_slug_url"
                                id="other_info_slug_url"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.other_info_slug_url}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="other_info_slug_url">
                                Slug Url
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab eventKey="Account" className="ps-2" title="Account & Transparency">
                        <h5 className="mt-0 mb-2 fs-4">Account Opening Costs</h5>
                        <Row>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="account_opening_cost_trading_only"
                                id="account_opening_cost_trading_only"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.account_opening_cost_trading_only}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="account_opening_cost_trading_only"
                              >
                                Trading only
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="account_opening_cost_trading_demat"
                                id="account_opening_cost_trading_demat"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.account_opening_cost_trading_demat}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="account_opening_cost_trading_demat"
                              >
                                Trading & Demat
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="account_opening_cost_commodity"
                                id="account_opening_cost_commodity"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.account_opening_cost_commodity}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="account_opening_cost_commodity"
                              >
                                Commodity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_equity"
                                id="transparency_other_cost_equity"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_equity}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_equity"
                              >
                                Equity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_futures"
                                id="transparency_other_cost_futures"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_futures}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_futures"
                              >
                                Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_options"
                                id="transparency_other_cost_options"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_options}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_options"
                              >
                                Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_commodities"
                                id="transparency_other_cost_commodities"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_commodities}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_commodities"
                              >
                                Commodities
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_amc_charge"
                                id="transparency_other_cost_amc_charge"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_amc_charge}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_amc_charge"
                              >
                                AMC charge
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_dp_transaction_charge"
                                id="transparency_other_cost_dp_transaction_charge"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_dp_transaction_charge}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_dp_transaction_charge"
                              >
                                DP Transaction Charge
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="transparency_other_cost_offline_order_place_charge"
                                id="transparency_other_cost_offline_order_place_charge"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.transparency_other_cost_offline_order_place_charge}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="transparency_other_cost_offline_order_place_charge"
                              >
                                Offline order placing Charge
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <h5 className="my-2 fs-4">Platforms</h5>
                          <Col lg={3}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="platform_software"
                                  checked={formValues.platform_software}
                                  onChange={handleChange}
                                  id="platform_software"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="platform_software"
                              >
                                Software
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={3}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="platform_mobile"
                                  checked={formValues.platform_mobile}
                                  onChange={handleChange}
                                  id="platform_mobile"
                                />
                              </Col>
                              <Form.Label column lg={4} className="ps-0 pt-0 cursor-pointer" htmlFor="platform_mobile">
                                Mobile
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={3}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="platform_web_html"
                                  checked={formValues.platform_web_html}
                                  onChange={handleChange}
                                  id="platform_web_html"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="platform_web_html"
                              >
                                Web/HTML5
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab eventKey="Features" className="ps-2" title="Features">
                        <h5 className="mt-0 mb-2 fs-4">Charting</h5>
                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="charting_intraday"
                                id="charting_intraday"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.charting_intraday}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="charting_intraday">
                                Intraday
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="charting_end_of_day"
                                id="charting_end_of_day"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.charting_end_of_day}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="charting_end_of_day">
                                End of Day
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group as={Row} className="ps-2 mt-3">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="charting_coding_backtesting"
                                  checked={formValues.charting_coding_backtesting}
                                  onChange={handleChange}
                                  id="charting_coding_backtesting"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="charting_coding_backtesting"
                              >
                                Coding/Backtesting
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <h5 className="my-3 fs-4">Reporting</h5>
                        <Row>
                          <Col>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="reporting_trade_reports"
                                  checked={formValues.reporting_trade_reports}
                                  onChange={handleChange}
                                  id="reporting_trade_reports"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="reporting_trade_reports"
                              >
                                Online Trade Reports
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="reporting_pnl_reports"
                                  checked={formValues.reporting_pnl_reports}
                                  onChange={handleChange}
                                  id="reporting_pnl_reports"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="reporting_pnl_reports"
                              >
                                Online PNL Reports
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="reporting_contract_notes"
                                  checked={formValues.reporting_contract_notes}
                                  onChange={handleChange}
                                  id="reporting_contract_notes"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="reporting_contract_notes"
                              >
                                Online Contract Notes
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <h5 className="my-2 fs-4">Margins</h5>

                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="margin_equity"
                                id="margin_equity"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.margin_equity}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="margin_equity">
                                Equity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="margin_equity_futures"
                                id="margin_equity_futures"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.margin_equity_futures}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="margin_equity_futures">
                                Equity Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="margin_equity_options"
                                id="margin_equity_options"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.margin_equity_options}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="margin_equity_options">
                                Equity Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="margin_currency_futures"
                                id="margin_currency_futures"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.margin_currency_futures}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="margin_currency_futures">
                                Curreny Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="margin_currency_options"
                                id="margin_currency_options"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.margin_currency_options}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="margin_currency_options">
                                Curreny Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="margin_commodities"
                                id="margin_commodities"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.margin_commodities}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="margin_commodities">
                                Commodities
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab eventKey="Support" className="ps-2 text-nowrap" title="Support & Tools">
                        <h5 className="mt-0 mb-2 fs-4">Support & Tools</h5>
                        <Row>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="support_research_tips"
                                  checked={formValues.support_research_tips}
                                  onChange={handleChange}
                                  id="support_research_tips"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="support_research_tips"
                              >
                                Research & Tips
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="support_brokerage_calculator"
                                  checked={formValues.support_brokerage_calculator}
                                  onChange={handleChange}
                                  id="support_brokerage_calculator"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="support_brokerage_calculator"
                              >
                                Brokerage Calculator
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="support_margin_calculator"
                                  checked={formValues.support_margin_calculator}
                                  onChange={handleChange}
                                  id="support_margin_calculator"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="support_margin_calculator"
                              >
                                Margin Calculator
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="support_bracket_order_trailing"
                                  checked={formValues.support_bracket_order_trailing}
                                  onChange={handleChange}
                                  id="support_bracket_order_trailing"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="support_bracket_order_trailing"
                              >
                                Bracket orders & Trailing
                              </Form.Label>
                            </Form.Group>
                          </Col>

                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="support_training_education"
                                  checked={formValues.support_training_education}
                                  onChange={handleChange}
                                  id="support_training_education"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="support_training_education"
                              >
                                Training & Education
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <h5 className="mt-2 mb-3 fs-4">Convenience</h5>

                        <Row>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="convenience_account_3in_1"
                                  checked={formValues.convenience_account_3in_1}
                                  onChange={handleChange}
                                  id="convenience_account_3in_1"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="convenience_account_3in_1"
                              >
                                3 in 1 Account
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="convenience_instant_fund_withdrawal"
                                  checked={formValues.convenience_instant_fund_withdrawal}
                                  onChange={handleChange}
                                  id="convenience_instant_fund_withdrawal"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="convenience_instant_fund_withdrawal"
                              >
                                Instant Fund withdrawal
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="convenience_relationship_managers"
                                  checked={formValues.convenience_relationship_managers}
                                  onChange={handleChange}
                                  id="convenience_relationship_managers"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="convenience_relationship_managers"
                              >
                                Relationship Managers
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <h5 className="mt-2 mb-3 fs-4">Equity Option</h5>

                        <Row>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="equity_option_equity"
                                  checked={formValues.equity_option_equity}
                                  onChange={handleChange}
                                  id="equity_option_equity"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="equity_option_equity"
                              >
                                Equity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="equity_option_equity_futures"
                                  checked={formValues.equity_option_equity_futures}
                                  onChange={handleChange}
                                  id="equity_option_equity_futures"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="equity_option_equity_futures"
                              >
                                Equity Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="equity_option_equity_options"
                                  checked={formValues.equity_option_equity_options}
                                  onChange={handleChange}
                                  id="equity_option_equity_options"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="equity_option_equity_options"
                              >
                                Equity Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="equity_option_currency_futures"
                                  checked={formValues.equity_option_currency_futures}
                                  onChange={handleChange}
                                  id="equity_option_currency_futures"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="equity_option_currency_futures"
                              >
                                Currency Futures
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="equity_option_currency_options"
                                  checked={formValues.equity_option_currency_options}
                                  onChange={handleChange}
                                  id="equity_option_currency_options"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="equity_option_currency_options"
                              >
                                Currency Options
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={2}>
                            <Form.Group as={Row} className="mb-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="equity_option_commodity"
                                  checked={formValues.equity_option_commodity}
                                  onChange={handleChange}
                                  id="equity_option_commodity"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-3 pt-0 cursor-pointer"
                                htmlFor="equity_option_commodity"
                              >
                                Commodity
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <h5 className="my-2 fs-4">Broker</h5>
                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_service_type"
                                id="broker_service_type"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_service_type}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="broker_service_type">
                                Service Type
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_account_opening_charge"
                                id="broker_account_opening_charge"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_account_opening_charge}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="broker_account_opening_charge"
                              >
                                Account Opening Charge
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_account_maintain_charge"
                                id="broker_account_maintain_charge"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_account_maintain_charge}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="broker_account_maintain_charge"
                              >
                                Account Mainteanance Charge
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_equity_delivery_brokerage"
                                id="broker_equity_delivery_brokerage"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_equity_delivery_brokerage}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="broker_equity_delivery_brokerage"
                              >
                                Equity Delivery Brokerage
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row className="mb-2">
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_equity_intraday_brokerage"
                                id="broker_equity_intraday_brokerage"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_equity_intraday_brokerage}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="broker_equity_intraday_brokerage"
                              >
                                Equity Intraday Brokerage
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col lg={3}>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_trade_description"
                                id="broker_trade_description"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_trade_description}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="broker_trade_description">
                                Trade Description
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="broker_theme_color"
                                id="broker_theme_color"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.broker_theme_color}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="broker_theme_color">
                                Broker Theme Color
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab eventKey="Broker" className="ps-2" title="Top 5 Broker">
                        <h5 className="mt-0 mb-2 fs-4">Top 5 Broker Web</h5>
                        <Row>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="top5_web_affiliate_link"
                                id="top5_web_affiliate_link"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.top5_web_affiliate_link}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="top5_web_affiliate_link">
                                Affiliate Url
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="top5_web_sequence"
                                id="top5_web_sequence"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.top5_web_sequence}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="top5_web_sequence">
                                Sequence
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group as={Row} className="mt-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="top5_web_is_active"
                                  checked={formValues.top5_web_is_active}
                                  onChange={handleChange}
                                  id="top5_web_is_active"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="top5_web_is_active"
                              >
                                Is Active
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                        <h5 className="my-2 fs-4">Top 5 Broker App</h5>

                        <Row className="mb-2">
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="top5_app_affiliate_link"
                                id="top5_app_affiliate_link"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.top5_app_affiliate_link}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="top5_app_affiliate_link">
                                Affiliate Url
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="top5_app_sequence"
                                id="top5_app_sequence"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.top5_app_sequence}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="top5_app_sequence">
                                Sequence
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group as={Row} className="mt-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="top5_app_is_active"
                                  checked={formValues.top5_app_is_active}
                                  onChange={handleChange}
                                  id="top5_app_is_active"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="top5_app_is_active"
                              >
                                Is Active
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>

                      <Tab eventKey="Top-Broker" className="ps-2" title="Top Broker">
                        <h5 className="mt-0 mb-2 fs-4">Top Broker Web</h5>
                        <Row className="mb-2">
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="top_broker_web_affiliate_link"
                                id="top_broker_web_affiliate_link"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.top_broker_web_affiliate_link}
                                onChange={handleChange}
                              />
                              <Form.Label
                                className="start-0 mb-0 position-absolute"
                                htmlFor="top_broker_web_affiliate_link"
                              >
                                Affiliate Url
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="my-2 border-bottom input-label">
                              <Form.Control
                                name="top_broker_web_sequence"
                                id="top_broker_web_sequence"
                                type="text"
                                className="border-0 shadow-none rounded-0 ps-1"
                                placeholder=" "
                                value={formValues.top_broker_web_sequence}
                                onChange={handleChange}
                              />
                              <Form.Label className="start-0 mb-0 position-absolute" htmlFor="top_broker_web_sequence">
                                Sequence
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group as={Row} className="mt-3 ps-2">
                              <Col lg={1} className="mt-0 p-0">
                                <Form.Control
                                  type="checkbox"
                                  name="top_broker_web_is_active"
                                  checked={formValues.top_broker_web_is_active}
                                  onChange={handleChange}
                                  id="top_broker_web_is_active"
                                />
                              </Col>
                              <Form.Label
                                column
                                lg={4}
                                className="ps-0 pt-0 cursor-pointer"
                                htmlFor="top_broker_web_is_active"
                              >
                                Is Active
                              </Form.Label>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>
                    </Tabs>
                  </Form>
                </Row>
                <Button variant="light" onClick={() => handleEditShow()} className="me-2">
                  Close
                </Button>
                <Button variant="primary" onClick={handleBroker}>
                  Add Broker
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AddBroker;
