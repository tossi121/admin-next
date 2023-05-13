import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Row, Table } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../../../../_context/authContext';
// import PrimeMembership from './PrimeMembership';
import { getUserDataList } from '_services/nifty_service_api';
import TableLoader from '_utils/Loader/TableLoader';
import Link from 'next/link';
import CommonPagination from 'components/Pagination/CommonPagination';

function UserManagement() {
  const [userList, setUserList] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [showPrime, setShowPrime] = useState(false);
  const lengthMenu = [10, 20, 50, 100];
  const [userFilter, setUserFilter] = useState('0,1');
  const [searchInput, setSearchInput] = useState('');
  // const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     history.push('/auth/login');
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      userDataList();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, userFilter]);

  async function userDataList() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      is_prime: userFilter,
      order_by: 'created_at',
      order_dir: 'desc',
    };
    setIsLoading(true);
    const response = await getUserDataList(params);
    if (response?.result == 1) {
      const data = response.data;
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
      const dataArray = handleUserData(data.items);
      setUserList(dataArray);
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
        email: item.email,
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

  function selectBox() {
    return (
      <>
        <div className="form-group input-box me-3 mb-2 fs-14 mt-md-0 text-nowrap">
          Show{' '}
          <select
            className="border rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1 bg-white"
            onChange={(e) => {
              setPageSize(e.target.value);
              setCurrentPage(1);
            }}
          >
            {lengthMenu.map((item, key) => {
              return (
                <option key={key} defaultValue={key == 0} value={item}>
                  {item}
                </option>
              );
            })}
          </select>{' '}
          Entries
        </div>
      </>
    );
  }

  function UserselectBox() {
    return (
      <>
        <div className="form-group input-box me-3 mb-2 fs-14 mt-md-0 text-nowrap">
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
              <h5 className="fw-semibold ms-3 mb-4">All Users</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  {selectBox()}
                  {UserselectBox()}
                  <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                    <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute end-0 mt-1 me-2" />
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
                <div className="table-responsive table-user text-nowrap user-manage">
                  {(isLoading && <TableLoader />) || (
                    <>
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Name</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Email Address</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Mobile No.</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Sign Up Date</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Prime User</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Platform</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Active Plan</th>
                            <th className='base-color-1 fw-semibold fs-14' scope="col">Action</th>
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
                                    <Link target={'_blank'} href={`/user-details/${item.user_id}`}>
                                      <button className="btn btn-primary">View</button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })) || (
                            <>
                              <tr>
                                <td className="border border-0 p-0 pt-2 ps-2">
                                  <p className="fw-bold fs-14">No Data Found</p>
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
