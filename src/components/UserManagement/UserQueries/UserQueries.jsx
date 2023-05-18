import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
// import { getUserQueriesData } from '../../../../_services/nifty_service_api';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../../../../_context/authContext';
import CommonPagination from '../../Pagination/CommonPagination';
import { getUserQueriesData } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';

function UserQueries() {
  const [queriesData, setQueriesData] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setsortBy] = useState('created_at');
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
    const response = await getUserQueriesData(params);
    if (response?.result == 1) {
      const data = response.data;
      setQueriesData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setQueriesData([]);
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
            <h5 className="fw-500 mb-3">User Queries Recieved</h5>
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
              <div className="table-responsive table-user text-nowrap user-manage">
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
                            <div onClick={() => handleSorting('user_query')}>
                              <div>Queries</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'user_query' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'user_query' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('created_at')}>
                              <div>Sent On</div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  width={8}
                                  className={`ms-1 ${
                                    sortBy == 'created_at' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                  }`}
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  width={8}
                                  className={`${
                                    sortBy == 'created_at' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                  }`}
                                />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(queriesData?.length > 0 &&
                          queriesData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {item.user_name == null ? 'N/A' : item.user_name == '' ? 'N/A' : item.user_name}
                                </td>
                                <td>
                                  {item.user_email == null ? 'N/A' : item.user_email == '' ? 'N/A' : item.user_email}
                                </td>
                                <td>
                                  {' '}
                                  {item.user_query == null ? 'N/A' : item.user_query == '' ? 'N/A' : item.user_query}
                                </td>
                                <td>{moment(item.created_at).format('MMM DD, YYYY, h:mm A')}</td>
                              </tr>
                            );
                          })) || (
                          <>
                            <tr>
                              <td className="border border-0 p-0 pt-2 ps-2">
                                <p>No Data Found</p>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </Table>
                  </>
                )}
              </div>

              {queriesData.length > 0 && totalItems && pageSize && (
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

export default UserQueries;
