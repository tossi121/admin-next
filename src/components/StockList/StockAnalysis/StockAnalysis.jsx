import {
  faEdit,
  faArrowDownLong,
  faArrowUpLong,
  faSearch,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import TableLoader from '_utils/Loader/TableLoader';
import { CSVLink } from 'react-csv';
import EditStockModal from './EditStockModal';
import CreateStockModal from './CreateStockModal';
import { toast } from 'react-toastify';
import { deleteStockData, getStockDataList } from '_services/nifty_service_api';
import CommonPagination from 'components/Pagination/CommonPagination';
import DeleteModal from 'components/DeleteModal';
import SelectBox from 'components/SelectBox';

function StockAnalysis() {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [stockList, setStockList] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setsortBy] = useState('symbol_name');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      stockListData();
    }, 700);
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
    const response = await getStockDataList(params);
    if (response?.result == 1) {
      const data = response.data;
      setStockList(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setStockList([]);
    }
    setIsLoading(false);
  }

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  async function deleteStock() {
    const params = {
      id: deleteId,
    };
    const response = await deleteStockData(params);
    if (response?.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      stockListData();
    } else {
      toast.error(response.message);
    }
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

  const handleEdit = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  return (
    <>
      <EditStockModal show={show} stockData={stockListData} setShow={setShow} selectedId={selectedId} />
      <CreateStockModal show={addModal} stockData={stockListData} setShow={setAddModal} />
      <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteStock={deleteStock} stockText="stock" />
      <section className="stock-analysis">
        <Row>
          <Col>
            <h5 className="fw-500 mb-3">Stock Analysis</h5>
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
                      data={stockList}
                      filename="NiftyAdminStocks"
                      className={`csb-button web-button text-light ${stockList?.length === 0 && 'disabled'}`}
                    >
                      Download CSV
                    </CSVLink>
                    <Button
                      variant="primary"
                      onClick={() => setAddModal(true)}
                      className={`web-button mx-4 ${stockList?.length === 0 && 'disabled'}`}
                    >
                      Add New Stock
                    </Button>
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
                        placeholder="Search...."
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          setCurrentPage(1);
                        }}
                        value={searchInput}
                      />
                      <span className="input-border"></span>
                    </div>
                  </div>

                  <div className="table-responsive table-user stock-analysis-table text-nowrap">
                    {(isLoading && <TableLoader />) || (
                      <>
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
                              <th scope="col">
                                <div onClick={() => handleSorting('industry')}>
                                  <div>Industry</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'industry' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'industry' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('series')}>
                                  <div>Series</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'series' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'series' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('isin_code')}>
                                  <div>ISIN Code</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'isin_code' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'isin_code' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('bse_code')}>
                                  <div>BSE Code</div>
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faArrowUpLong}
                                      width={8}
                                      className={`ms-1 ${
                                        sortBy == 'bse_code' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                      }`}
                                    />
                                    <FontAwesomeIcon
                                      icon={faArrowDownLong}
                                      width={8}
                                      className={`${
                                        sortBy == 'bse_code' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                      }`}
                                    />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(stockList.length > 0 &&
                              stockList.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.symbol_name}</td>
                                    <td>{item.company_name}</td>
                                    <td>{item.industry}</td>
                                    <td>{item.series}</td>
                                    <td>{item.isin_code}</td>
                                    <td>{item.bse_code}</td>
                                    <td>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        width={16}
                                        className="cursor-pointer base-color-3"
                                        title="Edit"
                                        onClick={() => handleEdit(item.id)}
                                      />
                                      <FontAwesomeIcon
                                        className="ms-2 cursor-pointer base-color-3"
                                        icon={faTrash}
                                        width={16}
                                        title="Delete"
                                        onClick={() => handleDelete(item.id)}
                                      />
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
}

export default StockAnalysis;
