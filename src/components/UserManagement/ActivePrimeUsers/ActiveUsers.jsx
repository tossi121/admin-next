import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
// import { getActiveUserData } from '../../../../_services/nifty_service_api';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getActiveUserData } from '_services/nifty_service_api';
import CommonPagination from 'components/Pagination/CommonPagination';
import SelectBox from 'components/SelectBox';

function ActiveUsers() {
  const [userList, setUserList] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setsortBy] = useState('membership_id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      userDataList();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function userDataList() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType,
    };
    setIsLoading(true);
    const response = await getActiveUserData(params);
    if (response?.result === 1) {
      const data = response.data;
      setUserList(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setUserList([]);
    }
    setIsLoading(false);
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
            <h5 className="fw-500 mb-3">Active Prime Users</h5>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
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
                    placeholder="Search By Name, Email or Mobile No"
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
                            <div onClick={() => handleSorting('membership_id')}>
                              <div>Id</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'membership_id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'membership_id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
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
                              <div>Email</div>
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
                            <div onClick={() => handleSorting('Phone_no')}>
                              <div>Phone</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'Phone_no' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'Phone_no' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('order_date_time')}>
                              <div>Purchase</div>
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
                            <div onClick={() => handleSorting('start_date')}>
                              <div>Start</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'start_date' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'start_date' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('end_date')}>
                              <div>End</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'end_date' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'end_date' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('plan_name')}>
                              <div>Plan</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'plan_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'plan_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(userList?.length > 0 &&
                          userList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.membership_id}</td>
                                <td>{item.user_name == null || item.user_name === '' ? 'N/A' : item.user_name}</td>
                                <td>{item.user_email}</td>
                                <td>{item.phone_no == null || item.phone_no === '' ? 'N/A' : item.phone_no}</td>
                                <td>{moment(item.order_date_time).format('MMM DD, YYYY, h:mm A')}</td>
                                <td>{moment(item.start_date).format('MMM DD YYYY')}</td>
                                <td>{moment(item.end_date).format('MMM DD YYYY')}</td>
                                <td>{item.plan_name}</td>
                              </tr>
                            );
                          })) || (
                          <>
                            <tr>
                              <td className="border border-0 p-0 pt-2 ps-2">
                                <p>No Data Found</p>
                              </td>
                            </tr>{' '}
                          </>
                        )}
                      </tbody>
                    </Table>
                  </>
                )}
              </div>

              {userList.length > 0 && totalItems && pageSize && (
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

export default ActiveUsers;
