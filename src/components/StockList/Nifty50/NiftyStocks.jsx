import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import CommonPagination from '../../Pagination/CommonPagination';
import TableLoader from '_utils/Loader/TableLoader';
import { getNifty50List } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';

function NiftyStocks() {
  const [searchInput, setSearchInput] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [niftyDataList, setNiftyDataList] = useState([]);
  const [sortBy, setsortBy] = useState('symbol_name');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      niftyStocksData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function niftyStocksData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType,
    };
    setIsLoading(true);
    const response = await getNifty50List(params);
    if (response.result == 1) {
      const data = response.data;
      setNiftyDataList(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setNiftyDataList([]);
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
    <div>
      <>
        <section className="stock-analysis">
          <Row>
            <Col>
              <h5 className="fw-500 mb-3">Nifty 50 Stocks</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                      <CSVLink
                        data={niftyDataList}
                        filename="NiftyAdminStocks"
                        className={`csb-button web-button text-light ${niftyDataList.length === 0 && 'disabled'}`}
                      >
                        Download CSV
                      </CSVLink>

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
                          placeholder="Search By Symbol"
                          value={searchInput}
                          onChange={(e) => {
                            setSearchInput(e.target.value);
                            setCurrentPage(1);
                          }}
                        />
                        <span className="input-border"></span>
                      </div>
                    </div>

                    <div className="table-responsive  stock-analysis-table text-nowrap">
                      {(isLoading && <TableLoader />) || (
                        <Table className="table mb-0">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div onClick={() => handleSorting('symbol_name')}>
                                  <div>Symbol</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'symbol_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'symbol_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('equity_capital_in_rs')}>
                                  <div>Equity Capital(Rs.)</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'equity_capital_in_rs'
                                          ? sortStyle == 'text-danger'
                                            ? sortStyle
                                            : ''
                                          : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'equity_capital_in_rs'
                                          ? sortStyle == 'text-success'
                                            ? sortStyle
                                            : ''
                                          : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('market_cap_in_rs')}>
                                  <div>Free Float Martket Capital(Rs.)</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'market_cap_in_rs'
                                          ? sortStyle == 'text-danger'
                                            ? sortStyle
                                            : ''
                                          : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'market_cap_in_rs'
                                          ? sortStyle == 'text-success'
                                            ? sortStyle
                                            : ''
                                          : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('weight')}>
                                  <div>Weight</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'weight' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'weight' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(niftyDataList.length &&
                              niftyDataList.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.symbol_name}</td>
                                    <td>{item.equity_capital_in_rs}</td>
                                    <td>{item.market_cap_in_rs.toFixed(2)}</td>
                                    <td>{item.weight}</td>
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
                    {niftyDataList.length > 0 && totalItems && pageSize && (
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
    </div>
  );
}

export default NiftyStocks;
