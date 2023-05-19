import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import CommonPagination from '../../Pagination/CommonPagination';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { getEnquiryListData } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';

const OpenEnquiry = () => {
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [brokerData, setBrokerData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setsortBy] = useState('id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      enquiryListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function enquiryListData() {
    const params = {
      start_date: startDate,
      end_date: endDate,
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getEnquiryListData(params);
    if (response.result == 1) {
      const data = response.data;
      setBrokerData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setBrokerData([]);
    }
    setIsLoading(false);
  }

  function handleSorting(params) {
    setsortBy(params)
    setSortToggle(prevstate => !prevstate)
    if (sortToggle) {
      setsortType('desc')
      setSortStyle('text-danger')
    } else {
      setsortType('asc')
      setSortStyle('text-success')
    }
  }

  return (
    <>
      <section className="stock-analysis">
        <Row>
          <Col>
            <h5 className="fw-500 mb-3">Latest A/c Open Enquiry</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <>
                  <Form className="input-login">
                    <Row className="justify-content-center align-items-center position-relative date-picker mb-1">
                      <Col>
                        <div className="mb-3 position-relative date-picker">
                          <Form.Group className="input-label mb-2">
                            <Form.Label className="common-form-label" htmlFor="start-date">
                              Start Date
                            </Form.Label>
                            <Form.Control
                              name='start-date'
                              type="date"
                              className="common-input-feild"
                              onChange={(e) => setStartDate(e.target.value)}
                              placeholder=" "
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <Col>
                        <div className="mb-3 position-relative date-picker">
                          <Form.Group className="input-label mb-2">
                            <Form.Label className="common-form-label" htmlFor="end-date">
                              End Date
                            </Form.Label>
                            <Form.Control
                              name='end-date'
                              type="date"
                              className="common-input-feild"
                              onChange={(e) => setEndDate(e.target.value)}
                              placeholder=" "
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <Col>
                        <Button variant="primary" className="web-button mt-3" onClick={enquiryListData}>
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                    <CSVLink
                      data={brokerData}
                      filename="NiftyAdminStocks"
                      className={`csb-button web-button text-light ${brokerData.length === 0 && 'disabled'}`}
                    >
                      Download CSV
                    </CSVLink>
                    <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                      <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute end-0 mt-1 me-2 base-color-3" />
                      <input
                        type="text"
                        className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <span className="input-border"></span>
                    </div>
                  </div>

                  <div className="table-responsive stock-analysis-table text-nowrap">
                    {(isLoading && <TableLoader />) || (
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th scope="col">
                              <div onClick={() => handleSorting('id')}>
                                <div>Id</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('source_from')}>
                                <div>Source</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'source_from' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'source_from' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('broker_name')}>
                                <div>Broker Name</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'broker_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'broker_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('user_name')}>
                                <div>User</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'user_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'user_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('user_mobile')}>
                                <div>User Mobile</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'user_mobile' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'user_mobile' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('user_email')}>
                                <div>User Email</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'user_email' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'user_email' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('created_at')}>
                                <div>Created At</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'created_at' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'created_at' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(brokerData.length > 0 &&
                            brokerData?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.source_from}</td>
                                  <td>{(item.broker_name == '' && 'N/A') || item.broker_name}</td>
                                  <td>{(item.user_name == '' && 'N/A') || item.user_name}</td>
                                  <td>{item.user_mobile}</td>
                                  <td>{item.user_email}</td>
                                  <td>{moment(item.created_at).format('MMM DD, YYYY, h:mm A')}</td>
                                </tr>
                              );
                            })) ||
                            <tr>
                              <td className="border border-0 p-0 pt-2 ps-2">
                                <p>No Data Found</p>
                              </td>
                            </tr>}
                        </tbody>
                      </Table>
                    )}
                  </div>
                  {brokerData.length > 0 && totalItems && pageSize && (
                    <CommonPagination
                      pageSize={pageSize}
                      totalCount={totalItems}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      isLoading={isLoading}
                    />
                  )}
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default OpenEnquiry;
