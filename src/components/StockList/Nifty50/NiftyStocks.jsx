import { faLongArrowAltDown, faLongArrowAltUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router-dom';
import CommonPagination from '../../Pagination/CommonPagination';
import TableLoader from '_utils/Loader/TableLoader';
import { getNifty50List } from '_services/nifty_service_api';

function NiftyStocks() {
  const [searchInput, setSearchInput] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [niftyDataList, setNiftyDataList] = useState([]);
  const lengthMenu = [10, 20, 50, 100];
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('symbol_name');
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
      order_dir: sortType
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

  function selectBox() {
    return (
      <>
        <div className="form-group input-box me-3 fs-14 mt-md-0 text-nowrap ps-2">
          Show{' '}
          <select
            className="border bg-white rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1"
            onChange={(e) => {
              setPageSize(e.target.value);
              setCurrentPage(1)
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
    <div>
      <>
        <section className="stock-analysis">
          <Row>
            <Col>
              <div className="page-title-box">
                <h4 className="page-title">Nifty 50 Stocks</h4>
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
                      <CSVLink
                        data={niftyDataList}
                        filename="NiftyAdminStocks"
                        className={`btn-primary btn ${niftyDataList.length === 0 && 'disabled'}`}
                      >
                        Download CSV
                      </CSVLink>

                      <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                        <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
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

                    <div className="table-responsive table-user stock-analysis-table text-nowrap">
                      {(isLoading && <TableLoader />) || (
                        <Table className="table mb-0">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('symbol_name')}>
                                  <div>Symbol</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'symbol_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'symbol_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('equity_capital_in_rs')}>
                                  <div>Equity Capital(Rs.)</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'equity_capital_in_rs' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'equity_capital_in_rs' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('market_cap_in_rs')}>
                                  <div>Free Float Martket Capital(Rs.)</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'market_cap_in_rs' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'market_cap_in_rs' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('weight')}>
                                  <div>Weight</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'weight' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'weight' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
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
                              })) ||
                              <tr>
                                <td className="border border-0 p-0 pt-2 ps-2">
                                  <p className="fw-bold fs-5 ">No Data Found</p>
                                </td>
                              </tr>}
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
