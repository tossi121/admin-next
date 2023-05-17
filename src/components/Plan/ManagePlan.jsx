import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../../../_context/authContext';
import CommonPagination from '../Pagination/CommonPagination';
import EditPlans from './EditPlans';
import AddPlans from './AddPlans';
import { toast } from 'react-toastify';
import { deletePrimePlanList, getPrimePlanList } from '_services/nifty_service_api';

function ManagePlans() {
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [planList, setPlanList] = useState([]);
  const lengthMenu = [10, 20, 50, 100];
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('plan_features_id');
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
      planListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function planListData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getPrimePlanList(params);
    if (response.result == 1) {
      const data = response.data;
      setPlanList(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setPlanList([]);
    }
    setIsLoading(false);
  }

  const handleEdit = (id) => {
    setSelectedId(id);
    setEditShow(true);
  };

  const handleAdd = () => {
    setAddShow(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  async function deleteStock() {
    const params = {
      id: deleteId,
    };
    const response = await deletePrimePlanList(params);
    if (response.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      planListData()
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

  function selectBox() {
    return (
      <>
        <div className="form-group input-box me-3 mb-0 fs-14 mt-md-0 text-nowrap">
          Show{' '}
          <select
            className="border rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1 bg-white"
            onChange={(e) => {
              setPageSize(e.target.value);
              setCurrentPage(1);
            }}
          >
            {lengthMenu.map((item, key) => {
              return (
                <option key={key} defaultValue={key == 0} value={item}>
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
      <EditPlans show={editShow} planData={planListData} selectedId={selectedId} setShow={setEditShow} />
      <AddPlans show={addShow} planData={planListData} setShow={setAddShow} />
      <Row>
        <Col>
          <div className="page-title-box">
            <h4 className="page-title">Plan Master</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                {selectBox()}
                <Button variant="primary mx-4" onClick={() => handleAdd()}>
                  Add New Plan
                </Button>
                <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                  <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
                  <input
                    type="text"
                    className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                    placeholder="Search By Plan Name"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={searchInput}
                  />
                  <span className="input-border"></span>
                </div>
              </div>
              <div className="table-responsive table-user text-nowrap user-manage">
                {(isLoading && <TableLoader />) || (
                  <>
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('plan_name')}>
                              <div>Plan Name</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'plan_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'plan_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('plan_short_message')}>
                              <div>Short Message</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'plan_short_message' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'plan_short_message' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('plan_duration')}>
                              <div>Duration</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'plan_duration' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'plan_duration' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('plan_old_price')}>
                              <div>Plan Old Price</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'plan_old_price' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'plan_old_price' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('plan_pricing')}>
                              <div>Plan price</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'plan_pricing' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'plan_pricing' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(planList?.length > 0 &&
                          planList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.plan_name}</td>
                                <td>{item.plan_short_message || (item.plan_short_message == null && 'N/A')}</td>
                                <td>{item.plan_duration}</td>
                                <td>{item.plan_old_price}</td>
                                <td>{item.plan_pricing}</td>
                                <td>
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    width={16}
                                    className="cursor-pointer"
                                    title="Edit"
                                    onClick={() => handleEdit(item.plan_features_id)}
                                  />

                                  <FontAwesomeIcon
                                    className="ms-2 cursor-pointer"
                                    icon={faTrash}
                                    width={16}
                                    title="Delete"
                                    onClick={() => handleDelete(item.plan_features_id)}
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

              {planList.length > 0 && totalItems && pageSize && (
                <CommonPagination
                  pageSize={pageSize}
                  totalCount={totalItems}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  isLoading={isLoading}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ManagePlans;
