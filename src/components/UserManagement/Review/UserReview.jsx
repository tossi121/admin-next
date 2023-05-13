import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
// import { getUserReviewData } from '../../../../_services/nifty_service_api';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../../../../_context/authContext';
import CommonPagination from '../../Pagination/CommonPagination';
import { getUserReviewData } from '_services/nifty_service_api';

function UserReview() {
  const [UserReviewData, setUserReviewData] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const lengthMenu = [10, 20, 50, 100];
  const [searchInput, setSearchInput] = useState('');
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('created_at');
  const [sortType, setsortType] = useState('desc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

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
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function userDataList() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getUserReviewData(params);
    if (response?.result == 1) {
      const data = response.data;
      setUserReviewData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setUserReviewData([]);
    }
    setIsLoading(false);
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
      <Row>
        <Col>
          <div className="page-title-box">
            <h4 className="page-title">User Reviews</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                {selectBox()}
                <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                  <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
                  <input
                    type="text"
                    className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                    placeholder="Search By Email"
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
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('user_email')}>
                              <div>User Email</div>
                              <div>
                                <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'user_email' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'user_email' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('user_android_app_version')}>
                              <div>App Version</div>
                              <div>
                                <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'user_android_app_version' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'user_android_app_version' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('rating')}>
                              <div>Rating</div>
                              <div>
                                <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'rating' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'rating' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('rating_desc')}>
                              <div>Description</div>
                              <div>
                                <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'rating_desc' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'rating_desc' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('created_at')}>
                              <div>Date</div>
                              <div>
                                <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'created_at' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'created_at' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(UserReviewData?.length > 0 &&
                          UserReviewData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.user_email == null || item.user_email === '' ? 'N/A' : item.user_email}</td>
                                <td>{item.user_android_app_version == null || item.user_android_app_version === '' ? 'N/A' : item.user_android_app_version}</td>
                                <td>{item.rating}</td>
                                <td>{item.rating_desc == null || item.rating_desc === " |\n" || item.rating_desc === "" ? 'N/A' : item.rating_desc}</td>
                                <td>{moment(item.created_at).format('MMM DD, YYYY, h:mm A')}</td>
                              </tr>
                            );
                          })) || (
                            <>
                              <tr>
                                <td className="border border-0 p-0 pt-2 ps-2">
                                  <p className="fw-bold fs-5 ">No Data Found</p>
                                </td>
                              </tr>
                            </>
                          )}
                      </tbody>
                    </Table>
                  </>
                )}
              </div>

              {UserReviewData.length > 0 && totalItems && pageSize && (
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

export default UserReview;
