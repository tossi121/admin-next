import React, { useEffect, useState } from 'react';
import CommonPagination from '../../Pagination/CommonPagination';
import { Badge, Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditPromoCode from './EditPromoCode';
import AddPromoCode from './AddPromoCode';
// import { useAuth } from '../../../../_context/authContext';
// import { useHistory } from 'react-router-dom';
import moment from 'moment';
import TableLoader from '_utils/Loader/TableLoader';
import { toast } from 'react-toastify';
import { deletePromoList, getGeneralPromoList } from '_services/nifty_service_api';

const GeneralPromoCode = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [promoCode, setPromoCode] = useState([]);
  const [Addshow, setAddShow] = useState(false);
  const [Editshow, setEditShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const lengthMenu = [10, 20, 50, 100];
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('promo_general_id');
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
      promoCodeData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function promoCodeData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getGeneralPromoList(params);
    if (response.result == 1) {
      const data = response.data;
      setPromoCode(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setPromoCode([]);
    }
    setIsLoading(false);
  }

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };
  async function deletePromoData() {
    const params = {
      id: deleteId,
    };
    const response = await deletePromoList(params);
    if (response?.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      promoCodeData()
    } else {
      toast.error(response.message);
    }
  }

  const handleEdit = (id) => {
    setSelectedId(id);
    setEditShow(true);
  };

  const handleAdd = (id) => {
    setSelectedId(id);
    setAddShow(true);
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
          <Button variant="danger" onClick={deletePromoData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
      {Addshow && <AddPromoCode promoCodeData={promoCodeData} show={Addshow} setShow={setAddShow} />}
      {Editshow && <EditPromoCode promoCodeData={promoCodeData} show={Editshow} setShow={setEditShow} selectedId={selectedId} />}

      {!Addshow && !Editshow && (
        <section>
          <Row>
            <Col>
              <div className="page-title-box">
                <h4 className="page-title">General Promo Code</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <>
                    {deleteModal()}
                    <div className="d-flex justify-content-between align-items-center">
                      {selectBox()}
                      <Button variant="primary mx-4" onClick={() => handleAdd()}>
                        Add General Promo
                      </Button>
                      <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                        <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
                        <input
                          type="text"
                          className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                          placeholder="Search"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
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
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('promo_general_id')}>
                                  <div>Id</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'promo_general_id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'promo_general_id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('promocode_name')}>
                                  <div>Promo</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'promocode_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'promocode_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('discount_for')}>
                                  <div>Discount For</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'discount_for' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'discount_for' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('promocode_per')}>
                                  <div>Discount Value</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'promocode_per' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'promocode_per' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('start_date')}>
                                  <div>Start Date</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'start_date' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'start_date' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('end_date')}>
                                  <div>End Date</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'end_date' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'end_date' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(promoCode.length > 0 &&
                              promoCode.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.promo_general_id}</td>
                                    <td>{item.promocode_name}</td>
                                    <td>{item.discount_for}</td>
                                    <td>{item.promocode_per}</td>
                                    <td>{moment(item.start_date).format('MMM DD, YYYY, h:mm A')}</td>
                                    <td>{moment(item.end_date).format('MMM DD, YYYY, h:mm A')}</td>
                                    {item.is_active === 0 && (
                                      <>
                                        <td>
                                          {
                                            <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                              Expired
                                            </Badge>
                                          }
                                        </td>
                                      </>
                                    )}
                                    {item.is_active === 1 && (
                                      <>
                                        <td>
                                          {
                                            <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                              Active
                                            </Badge>
                                          }
                                        </td>
                                      </>
                                    )}

                                    <td>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        width={16}
                                        className="cursor-pointer"
                                        title="Edit"
                                        onClick={() => handleEdit(item?.promo_general_id)}
                                      />
                                      <FontAwesomeIcon
                                        className="ms-2 cursor-pointer"
                                        icon={faTrash}
                                        width={16}
                                        title="Delete"
                                        onClick={() => handleDelete(item?.promo_general_id)}
                                      />
                                    </td>
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
                    {promoCode.length > 0 && totalItems && pageSize && (
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
      )}
    </>
  );
};

export default GeneralPromoCode;
