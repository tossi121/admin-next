import { faArrowDownLong, faArrowUpLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useEffect, useState } from 'react';
import CommonPagination from '../../Pagination/CommonPagination';
import TableLoader from '_utils/Loader/TableLoader';
import { getFnoList } from '_services/nifty_service_api';

function FnoStock() {
  const [searchInput, setSearchInput] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [fnolist, setFnolist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [monthList, setMonthList] = useState([]);
  const lengthMenu = [10, 20, 50, 100];
  const [sortBy, setsortBy] = useState('underlying');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fnoListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function fnoListData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getFnoList(params);
    if (response.result == 1) {
      const data = response.data;
      const monthList = data.items[0].month_data;
      const jsonData = JSON.parse(`${monthList.replace(/'/g, '"')}`);
      const months = Object.keys(jsonData).map((key) => key.split('-')[0]);
      setMonthList(months);
      setFnolist(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setFnolist([]);
    }
    setIsLoading(false);
  }

  function selectBox() {
    return (
      <>
        <div className="form-group input-box me-3 fs-14 mt-md-0 text-nowrap">
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
    <>
      <section className="stock-analysis">
        <Row>
          <Col>
            <h5 className="fw-500 mb-3">F&amp;O Stocks</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    {selectBox()}
                    <CSVLink
                      data={fnolist}
                      filename="NiftyAdminStocks"
                      className={`csb-button web-button text-light ${fnolist.length === 0 && 'disabled'}`}
                    >
                      Download CSV
                    </CSVLink>
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
                        }} />
                      <span className="input-border"></span>
                    </div>
                  </div>

                  <div className="table-responsive table-user stock-analysis-table text-nowrap">
                    {(isLoading && <TableLoader />) || (
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th scope="col">
                              <div onClick={() => handleSorting('underlying')}>
                                <div>Underlying</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'underlying' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'underlying' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('symbol_name')}>
                                <div>Symbol</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'symbol_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'symbol_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">
                              <div onClick={() => handleSorting('lot_size')}>
                                <div>Lot Size</div>
                                <div>
                                  <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'lot_size' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                  <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'lot_size' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                </div>
                              </div>
                            </th>
                            <th scope="col">{monthList[0]}</th>
                            <th scope="col">{monthList[1]}</th>
                            <th scope="col">{monthList[2]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(fnolist.length > 0 &&
                            fnolist.map((item, index) => {
                              const jsonData = JSON.parse(`${item['month_data'].replace(/'/g, '"')}`);
                              return (
                                <tr key={index}>
                                  <td>{item.underlying}</td>
                                  <td>{item.symbol_name}</td>
                                  <td>{item.lot_size}</td>
                                  {Object.keys(jsonData).map((key, index) => {
                                    return <td key={index}>{jsonData[key]}</td>;
                                  })}
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
                  {fnolist.length > 0 && totalItems && pageSize && (
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
}

export default FnoStock;
