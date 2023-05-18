import { faEdit, faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import CommonPagination from '../Pagination/CommonPagination';
import TableLoader from '_utils/Loader/TableLoader';
import { getIndianStockList } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';

const IndianStockProfile = () => {
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [stockList, setStockList] = useState([]);
  const [sortBy, setsortBy] = useState('company_name');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

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
      order_dir: sortType,
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
            <h5 className="fw-500 mb-3">Indian Stocks Profile</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <>
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
                              <div onClick={() => handleSorting('symbol')}>
                                <div>Symbol</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong}
                                    width={8}
                                    className={`ms-1 ${
                                      sortBy == 'symbol' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                    }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong}
                                    width={8}
                                    className={`${
                                      sortBy == 'symbol' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                    }`}
                                  />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('company_name')}>
                                <div>Company Name</div>
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong}
                                    width={8}
                                    className={`ms-1 ${
                                      sortBy == 'company_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                    }`}
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong}
                                    width={8}
                                    className={`${
                                      sortBy == 'company_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                    }`}
                                  />
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
