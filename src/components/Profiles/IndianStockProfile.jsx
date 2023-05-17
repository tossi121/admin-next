import { faEdit, faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import CommonPagination from '../Pagination/CommonPagination';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router-dom';
import TableLoader from '_utils/Loader/TableLoader';
import { getIndianStockList } from '_services/nifty_service_api';

const IndianStockProfile = () => {
  const [currentData, setCurrentData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [show, setShow] = useState(false);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [stockList, setStockList] = useState([]);
  const lengthMenu = [10, 20, 50, 100];
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('company_name');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     history.push('/auth/login');
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      stockListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function stockListData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getIndianStockList(params);
    if (response.result == 1) {
      const data = response.data;
      setStockList(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setStockList([]);
    }
    setIsLoading(false);
  }

  const handleEdit = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  function selectBox() {
    return (
      <>
        <div className="form-group input-box me-3 fs-14 mt-md-0 text-nowrap ps-2">
          Show{' '}
          <select
            className="border bg-white rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1"
            onChange={(e) => {
              setPageSize(e.target.value);
              setCurrentPage(1);
            }}
          >
            {lengthMenu.map((item, key) => {
              return (
                <option key={key} defaultValue={key === 0} value={item}>
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
      <section className="stock-analysis">
        <Row>
          <Col>
            <div className="page-title-box">
              <h4 className="page-title">Indian Stock Profile</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    {selectBox()}
                    <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                      <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
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

                  <div className="table-responsive table-user stock-analysis-table text-nowrap">
                    {(isLoading && <TableLoader />) || (
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th scope="col">
                              <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('symbol')}>
                                <div>Symbol</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'symbol' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'symbol' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('company_name')}>
                                <div>Company Name</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'company_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'company_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {(stockList?.length > 0 &&
                            stockList.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.symbol}</td>
                                  <td>{item.company_name}</td>
                                  {/* <td>
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      width={16}
                                      className="cursor-pointer"
                                      title="Edit"
                                      onClick={() => handleEdit(item)}
                                    />
                                  </td> */}
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
                  {stockList.length > 0 && totalItems && pageSize && (
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

export default IndianStockProfile;