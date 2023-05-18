import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Row, Table } from 'react-bootstrap';
// import { getUserOrderData } from '../../../../_services/nifty_service_api';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../../../../_context/authContext';
import CommonPagination from '../../Pagination/CommonPagination';
import { getUserOrderData } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';

function UserOrders() {
  const [userOrderData, setUserOrderData] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchInput, setSearchInput] = useState('');
  const [txnFilter, setTxnFilter] = useState('');
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('order_id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  // useEffect(() => {
  //     if (!isLoggedIn) {
  //         history.push('/auth/login');
  //     }
  // }, [isLoggedIn]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      userDataList();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, txnFilter, sortBy, sortType, sortStyle]);

  async function userDataList() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      payment_status: txnFilter,
      order_by: sortBy,
      order_dir: sortType,
    };
    setIsLoading(true);
    const response = await getUserOrderData(params);
    if (response?.result == 1) {
      const data = response.data;
      setUserOrderData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setUserOrderData([]);
    }
    setIsLoading(false);
  }

  function UserFilterSelect() {
    return (
      <>
        <div className="form-group input-box me-3 mb-2 fs-14 mt-md-0 text-nowrap">
          <select
            className="border rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1 bg-white"
            onChange={(e) => {
              setTxnFilter(e.target.value);
            }}
          >
            <option defaultValue={''} value={''}>
              All Transaction
            </option>
            <option value={'1'}>Success</option>
            <option value={'0'}>Failed</option>
          </select>
        </div>
      </>
    );
  }

  function handleSorting(params) {
    setsortBy(params);
    setSortToggle((prevstate) => !prevstate);
    if (sortToggle) {
      setsortType('desc');
      setSortStyle('text-danger');
    } else {
      setsortType('asc');
      setSortStyle('text-success');
    }
  }

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <h5 className="fw-500 mb-3">All Orders</h5>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                {UserFilterSelect()}
                <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                  <FontAwesomeIcon
                    icon={faSearch}
                    width="16"
                    height="16"
                    className="position-absolute end-0 mt-1 me-2 base-color-3"
                  />
                  <input
                    type="text"
                    className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                    placeholder="Search By Name or Email"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={searchInput}
                  />
                  <span className="input-border"></span>
                </div>
              </div>
              <div className="table-responsive  text-nowrap user-manage">
                {(isLoading && <TableLoader />) || (
                  <>
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">
                            <div onClick={() => handleSorting('user_name')}>
                              <div>Name</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'user_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'user_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('user_email')}>
                              <div>Email Address</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'user_email' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'user_email' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('order_date_time')}>
                              <div>Transaction Date</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'order_date_time' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'order_date_time' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('order_amount')}>
                              <div>Transaction Amount</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'order_amount' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'order_amount' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">Transaction Status</th>
                          <th scope="col">
                            <div onClick={() => handleSorting('platform_type')}>
                              <div>Platform</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'platform_type' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'platform_type' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(userOrderData?.length > 0 &&
                          userOrderData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.user_name == null || item.user_name === '' ? 'N/A' : item.user_name}</td>
                                <td>{item.user_email == null || item.user_email === '' ? 'N/A' : item.user_email}</td>
                                <td>{moment(item.order_date_time).format('MMM DD, YYYY, h:mm A')}</td>
                                <td> {item.order_amount}</td>
                                <td>
                                  {item.txn_payment_status === 1 ? (
                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                      Success
                                    </Badge>
                                  ) : (
                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                      Failed
                                    </Badge>
                                  )}
                                </td>
                                <td>
                                  {item.platform_type === 1
                                    ? 'Web Desktop'
                                    : item.platform_type === 2
                                    ? 'Web Tablet'
                                    : item.platform_type === 3
                                    ? 'Web Mobile'
                                    : item.platform_type === 4
                                    ? 'Android'
                                    : item.platform_type === 5
                                    ? 'iOS'
                                    : item.platform_type === 0
                                    ? 'Android'
                                    : ''}
                                </td>
                              </tr>
                            );
                          })) || (
                          <tr>
                            <td className="border border-0 p-0 pt-2 ps-2">
                              <p>No Data Found</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </>
                )}
              </div>

              {userOrderData.length > 0 && totalItems && pageSize && (
                <CommonPagination
                  pageSize={pageSize}
                  totalCount={totalItems}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  isLoading={isLoading}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserOrders;
