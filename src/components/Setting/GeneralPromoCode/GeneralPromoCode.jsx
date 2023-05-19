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
import SelectBox from 'components/SelectBox';
import DeleteModal from 'components/DeleteModal';

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
      <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteStock={handleDelete} stockText="stock" />
      {Addshow && <AddPromoCode promoCodeData={promoCodeData} show={Addshow} setShow={setAddShow} />}
      {Editshow && <EditPromoCode promoCodeData={promoCodeData} show={Editshow} setShow={setEditShow} selectedId={selectedId} />}

      {!Addshow && !Editshow && (
        <section>
          <Row>
            <Col>
              <h5 className="fw-500 mb-3">General Promo Code</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                      <Button variant="primary mx-4" className='web-button' onClick={() => handleAdd()}>
                        Add General Promo
                      </Button>
                      <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                        <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute end-0 mt-1 me-2 base-color-3" />
                        <input
                          type="text"
                          className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                          placeholder="Search.."
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
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
                                <div onClick={() => handleSorting('promo_general_id')}>
                                  <div>Id</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'promo_general_id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'promo_general_id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('promocode_name')}>
                                  <div>Promo</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'promocode_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'promocode_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('discount_for')}>
                                  <div>Discount For</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'discount_for' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'discount_for' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('promocode_per')}>
                                  <div>Discount Value</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'promocode_per' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'promocode_per' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('start_date')}>
                                  <div>Start Date</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'start_date' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'start_date' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('end_date')}>
                                  <div>End Date</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'end_date' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'end_date' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
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
                                        className="cursor-pointer base-color-3"
                                        title="Edit"
                                        onClick={() => handleEdit(item?.promo_general_id)}
                                      />
                                      <FontAwesomeIcon
                                        className="ms-2 cursor-pointer base-color-3"
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
