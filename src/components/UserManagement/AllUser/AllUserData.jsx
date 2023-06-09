import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Row, Table } from 'react-bootstrap';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownLong, faArrowUpLong, faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import PrimeMembership from './PrimeMembership';
import CommonPagination from 'components/Pagination/CommonPagination';
import { getUserDataList } from '_services/nifty_service_api';
import Link from 'next/link';
import SelectBox from 'components/SelectBox';

function UserManagement() {
  const [userList, setUserList] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [showPrime, setShowPrime] = useState(false);
  const [userFilter, setUserFilter] = useState('0,1');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setsortBy] = useState('user_id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      userDataList();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, userFilter, sortBy, sortType, sortStyle]);

  async function userDataList() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      is_prime: userFilter,
      order_by: sortBy,
      order_dir: sortType,
    };
    setIsLoading(true);
    const response = await getUserDataList(params);
    if (response?.result == 1) {
      const data = response.data;
      const dataArray = handleUserData(data.items);
      setUserList(dataArray);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setUserList([]);
    }
    setIsLoading(false);
  }

  function handleUserData(data) {
    const dataArray = [];
    data.forEach((item, key) => {
      dataArray.push({
        id: item.id,
        user_id: item.user_id,
        name: (item.name == null && 'N/A') || (item.name == '' && 'N/A') || item.name,
        email: (item.email == null && 'N/A') || (item.email == '' && 'N/A') || item.email,
        created_at: item.created_at,
        plan_name: (item.plan_name == null && 'No Plan') || (item.plan_name == '' && 'No Plan') || item.plan_name,
        is_prime: item.is_prime,
        phone_no: (item.phone_no == null && 'N/A') || (item.phone_no == '' && 'N/A') || item.phone_no,
        platform_type:
          (item.platform_type == 1 && 'Web Desktop') ||
          (item.platform_type == 2 && 'Web Tablet') ||
          (item.platform_type == 3 && 'Web Mobile') ||
          (item.platform_type == 4 && 'Android') ||
          (item.platform_type == 5 && 'iOS') ||
          (item.platform_type == 0 && 'Android'),
        last_login:
          (item.last_login == null && 'N/A') ||
          (item.last_login == '' && 'N/A') ||
          moment(item.last_login).format('DD-MMMM-YYYY, h:mm:ss a'),
      });
    });
    return dataArray;
  }

  function userSelectBox() {
    return (
      <>
        <div className="form-group input-box me-3 fs-14 mt-md-0 text-nowrap">
          <select
            className="border rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1 bg-white"
            onChange={(e) => {
              setUserFilter(e.target.value);
            }}
          >
            <option defaultValue={'0,1'} value={'0,1'}>
              All User
            </option>
            <option value={'1'}>Prime User</option>
            <option value={'0'}>Non Prime User</option>
          </select>
        </div>
      </>
    );
  }

  function handlePrimeShow(id) {
    setSelectedId(id);
    setShowPrime(true);
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
      {showPrime && (
        <PrimeMembership
          show={showPrime}
          userDetailsData={userDataList}
          setShow={setShowPrime}
          selectedId={selectedId}
        />
      )}
      <section>
        <Row>
          <Col>
            <h5 className="fw-500 mb-3">All Users</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                  {userSelectBox()}
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
                      placeholder="Search By Name or Email or Mobile No."
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
                              <div onClick={() => handleSorting('name')}>
                                <div>Name</div>
                                <div>
                                  <FontAwesomeIcon
                                    width={8}
                                    icon={faArrowUpLong}
                                    className={`ms-1 ${
                                      sortBy == 'name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                    }`}
                                  />
                                  <FontAwesomeIcon
                                    width={8}
                                    icon={faArrowDownLong}
                                    className={`${
                                      sortBy == 'name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                    }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('email')}>
                                <div>Email Address</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong}
                                    width={8}
                                    className={`ms-1 ${
                                      sortBy == 'email' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                    }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong}
                                    width={8}
                                    className={`${
                                      sortBy == 'email' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                    }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('phone_no')}>
                                <div>Mobile No.</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong}
                                    width={8}
                                    className={`ms-1 ${
                                      sortBy == 'phone_no' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                    }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong}
                                    width={8}
                                    className={`${
                                      sortBy == 'phone_no' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                    }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('created_at')}>
                                <div>Sign Up Date</div>
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
                            <th scope="col">
                              <div>
                                <div>Prime User</div>
                              </div>
                            </th>
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
                            <th scope="col">
                              <div onClick={() => handleSorting('plan_name')}>
                                <div>Active Plan</div>
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
                            <th scope="col">
                              <div>
                                <div>Action</div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(userList?.length > 0 &&
                            userList.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td> {item.phone_no}</td>
                                  <td> {moment(item.created_at).format('MMM DD YYYY')}</td>
                                  <td>
                                    {item.is_prime ? (
                                      <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                        Prime
                                      </Badge>
                                    ) : (
                                      <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                        Not Prime
                                      </Badge>
                                    )}
                                  </td>
                                  <td>{item.platform_type}</td>
                                  <td>
                                    <span className="me-2">{item.plan_name}</span>
                                    <span>
                                      <FontAwesomeIcon
                                        icon={faPen}
                                        width={16}
                                        className="cursor-pointer"
                                        title="Prime Membership"
                                        onClick={() => handlePrimeShow(item?.user_id)}
                                      />
                                    </span>
                                  </td>
                                  <td>
                                    <Link target={'_blank'} href={`/user-management/user-details/${item.user_id}`}>
                                      <Button className="web-button">View</Button>
                                    </Link>
                                  </td>
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
      </section>
    </>
  );
}

export default UserManagement;
