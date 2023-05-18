import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import CommonPagination from '../../Pagination/CommonPagination';
import AddBroker from './AddBroker';
import EditBrokerModal from './EditBrokerModal';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router-dom';
import TableLoader from '_utils/Loader/TableLoader';
import { toast } from 'react-toastify';
import { deleteBrokerData, getCompareBrokerListData } from '_services/nifty_service_api';

const CompareBroker = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [brokerData, setBrokerData] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('broker_id');
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
      enquiryListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function enquiryListData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getCompareBrokerListData(params);
    if (response.result == 1) {
      const data = response.data;
      setBrokerData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setBrokerData([]);
    }
    setIsLoading(false);
  }

  const handleEdit = (id) => {
    setSelectedId(id);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  async function deleteStock() {
    const params = {
      id: deleteId,
    };
    const response = await deleteBrokerData(params);
    if (response.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      enquiryListData()
    } else {
      toast.error(response.message);
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
          <Button variant=" " className="web-button text-white" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteStock}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
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
      {deleteModal()}
      <div>
        <>
          {showEdit && <EditBrokerModal enquiryListData={enquiryListData} show={showEdit} setShow={setShowEdit} selectedId={selectedId} />}

          {show && <AddBroker setShow={setShow} enquiryListData={enquiryListData} />}

          {!show && !showEdit && (
            <section className="stock-analysis">
              <Row>
                <Col>
                  <div className="page-title-box">
                    <h4 className="page-title">Compare Broker</h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <section className="stock-analysis">
                        <div className="d-flex justify-content-between align-items-center">
                          {selectBox()}
                          <Button variant="primary mx-4" onClick={() => setShow(true)}>
                            Add New Broker
                          </Button>
                          <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                            <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
                            <input
                              type="text"
                              className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                              placeholder="Search By Broker"
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
                            <>
                              <Table className="table mb-0">
                                {' '}
                                <thead>
                                  <tr>
                                    <th scope="col">
                                      <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('broker_id')}>
                                        <div>Id</div>
                                        <div>
                                          <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'broker_id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                          <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'broker_id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                        </div>
                                      </div>
                                    </th>
                                    <th scope="col">
                                      <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('overview_broker_name')}>
                                        <div>Broker</div>
                                        <div>
                                          <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'overview_broker_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                          <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'overview_broker_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                        </div>
                                      </div>
                                    </th>
                                    <th scope="col">
                                      <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('overview_year_of_incorporation')}>
                                        <div>Year</div>
                                        <div>
                                          <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'overview_year_of_incorporation' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                          <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'overview_year_of_incorporation' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                        </div>
                                      </div>
                                    </th>
                                    <th scope="col">
                                      <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('overview_website')}>
                                        <div>Website</div>
                                        <div>
                                          <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'overview_website' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                          <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'overview_website' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                        </div>
                                      </div>
                                    </th>
                                    <th scope="col">
                                      <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('overview_exchanges_enabled')}>
                                        <div>Exchanges Enabled</div>
                                        <div>
                                          <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'overview_exchanges_enabled' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                          <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'overview_exchanges_enabled' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                        </div>
                                      </div>
                                    </th>
                                    <th scope="col">
                                      <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('overview_demat_nsdl_cdsl')}>
                                        <div>Demat NSDL CDSL</div>
                                        <div>
                                          <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'overview_demat_nsdl_cdsl' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                          <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'overview_demat_nsdl_cdsl' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                        </div>
                                      </div>
                                    </th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(brokerData.length > 0 &&
                                    brokerData.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{item.broker_id}</td>
                                          <td>{item.overview_broker_name}</td>
                                          <td>{item.overview_year_of_incorporation}</td>
                                          <td>{item.overview_website}</td>
                                          <td>
                                            {(item.overview_exchanges_enabled == null && 'N/A') ||
                                              item.overview_exchanges_enabled}
                                          </td>
                                          <td>
                                            {(item.overview_demat_nsdl_cdsl == null && 'N/A') ||
                                              item.overview_demat_nsdl_cdsl}
                                          </td>
                                          <td>
                                            <FontAwesomeIcon
                                              icon={faEdit}
                                              width={16}
                                              className="cursor-pointer"
                                              title="Edit"
                                              onClick={() => handleEdit(item.broker_id)}
                                            />
                                            <FontAwesomeIcon
                                              className="ms-2 cursor-pointer"
                                              icon={faTrash}
                                              width={16}
                                              title="Delete"
                                              onClick={() => handleDelete(item.broker_id)}
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
                        {brokerData.length > 0 && totalItems && pageSize && (
                          <CommonPagination
                            pageSize={pageSize}
                            totalCount={totalItems}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            isLoading={isLoading}
                          />
                        )}
                      </section>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </section>
          )}
        </>
      </div>
    </>
  );
};

export default CompareBroker;
