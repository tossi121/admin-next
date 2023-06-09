import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import CommonPagination from '../../Pagination/CommonPagination';
import TableLoader from '_utils/Loader/TableLoader';
import { toast } from 'react-toastify';
import { getBrokerReviewData, updateBrokerReviewData } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';

const ReviewList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setsortBy] = useState('created_at');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      reviewListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function reviewListData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType,
    };
    setIsLoading(true);
    const response = await getBrokerReviewData(params);
    if (response.result == 1) {
      const data = response.data;
      setReviewList(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setReviewList([]);
    }
    setIsLoading(false);
  }

  const handleChange = async (event, reviewid) => {
    const { checked } = event.target;
    const { result, message } = await updateBrokerReviewData({
      approve: checked ? 1 : 0,
      reviewid,
    });
    const successMessage = message;
    const errorMessage = message;
    const reloadDelay = 1000;
    if (result === 1) {
      toast.success(successMessage);
    } else {
      toast.error(errorMessage);
    }
    reviewListData();
  };

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
      <section className="stock-analysis">
        <Row>
          <Col>
            <h5 className="fw-500 mb-3">Broker Review</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                    <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                      <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute end-0 mt-1 me-2 base-color-3" />
                      <input
                        type="text"
                        className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                        placeholder="Search By Underlying Or Symbol"
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
                              <div
                                onClick={() => handleSorting('review_rating')}
                              >
                                <div>Rating</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'review_rating' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong} width={8} className={`${sortBy == 'review_rating' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                onClick={() => handleSorting('review_desc')}
                              >
                                <div>Description</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'review_desc' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong} width={8} className={`${sortBy == 'review_desc' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                onClick={() => handleSorting('username')}
                              >
                                <div>User Name</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'username' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong} width={8} className={`${sortBy == 'username' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div
                                onClick={() => handleSorting('broker')}
                              >
                                <div>Broker</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'broker' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong} width={8} className={`${sortBy == 'broker' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(reviewList.length > 0 &&
                            reviewList.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.review_rating}</td>
                                  <td>{item.review_desc}</td>
                                  <td>{item.username}</td>
                                  <td>{item.broker}</td>
                                  <td>
                                    <Form.Check
                                      type="checkbox"
                                      defaultChecked={item.approve == 1}
                                      onChange={(e) => handleChange(e, item.reviewid)}
                                    />
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
                    )}
                  </div>
                  {reviewList.length > 0 && totalItems && pageSize && (
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

export default ReviewList;
