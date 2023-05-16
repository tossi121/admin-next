import { faEdit, faLongArrowAltDown, faLongArrowAltUp, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import TableLoader from '_utils/Loader/TableLoader';
import { CSVLink } from 'react-csv';
import EditStockModal from './EditStockModal';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router';
import CreateStockModal from './CreateStockModal';
import { toast } from 'react-toastify';
import { deleteStockData, getStockDataList } from '_services/nifty_service_api';
import CommonPagination from 'components/Pagination/CommonPagination';

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
    const response = await getStockDataList(params);
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

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  async function deleteStock() {
    const params = {
      id: deleteId,
    };
    const response = await deleteStockData(params);
    if (response.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      stockListData()
    } else {
      toast.error(response.message);
    }
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

  function deleteModal() {
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)} size={'sm'} centered>
        <Modal.Body className="text-center">
          <FontAwesomeIcon icon={faTrashAlt} className="text-danger fs-1" width={20} />
          <h4>Are you sure?</h4>
          <p className="mb-0">Are you sure you want to delete the stock?</p>
        </Modal.Body>
        <Modal.Footer className=" justify-content-center">
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteStock}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleEdit = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  return (
    <>
      <EditStockModal show={show} stockData={stockListData} setShow={setShow} selectedId={selectedId} />
      <CreateStockModal show={addModal} stockData={stockListData} setShow={setAddModal} />
      {deleteModal()}
      <section className="stock-analysis">
        <Row>
          <Col>
            <div className="page-title-box">
              <h4 className="page-title">Stock Analysis</h4>
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
                      data={stockList}
                      filename="NiftyAdminStocks"
                      className={`btn-primary btn ${stockList?.length === 0 && 'disabled'}`}
                    >
                      Download CSV
                    </CSVLink>
                    <Button
                      variant={`primary mx-4 ${stockList?.length === 0 && 'disabled'}`}
                      onClick={() => setAddModal(true)}
                    >
                      Add New Stock
                    </Button>
                    <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                      <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
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
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('symbol_name')}>
                                  <div>Symbol</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'symbol_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'symbol_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('company_name')}>
                                  <div>Company Name</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'company_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'company_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('industry')}>
                                  <div>Industry</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'industry' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'industry' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('series')}>
                                  <div>Series</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'series' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'series' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('isin_code')}>
                                  <div>ISIN Code</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'isin_code' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'isin_code' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('bse_code')}>
                                  <div>BSE Code</div>
                                  <div>
                                    <FontAwesomeIcon icon={faLongArrowAltUp} width={5} className={`ms-1 ${sortBy == 'bse_code' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faLongArrowAltDown} width={5} className={`${sortBy == 'bse_code' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
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
                                        className="cursor-pointer"
                                        title="Edit"
                                        onClick={() => handleEdit(item.id)}
                                      />
                                      <FontAwesomeIcon
                                        className="ms-2 cursor-pointer"
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
