import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import TableLoader from '_utils/Loader/TableLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CommonPagination from '../Pagination/CommonPagination';
import EditPlans from './EditPlans';
import AddPlans from './AddPlans';
import { toast } from 'react-toastify';
import { deletePrimePlanList, getPrimePlanList } from '_services/nifty_service_api';
import DeleteModal from 'components/DeleteModal';
import SelectBox from 'components/SelectBox';

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
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [sortBy, setsortBy] = useState('plan_features_id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

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
      <DeleteModal showModal={showModal} setShowModal={setShowModal} deleteStock={deleteStock} stockText="stock" />
      <EditPlans show={editShow} planData={planListData} selectedId={selectedId} setShow={setEditShow} />
      <AddPlans show={addShow} planData={planListData} setShow={setAddShow} />
      <Row>
        <Col>
          <h5 className="fw-500 mb-3">Plan Master</h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                <Button variant="primary mx-4" className='web-button' onClick={() => handleAdd()}>
                  Add New Plan
                </Button>
                <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                  <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute end-0 mt-1 me-2 base-color-3" />
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
              <div className="table-responsive  stock-analysis-table text-nowrap">
                {(isLoading && <TableLoader />) || (
                  <>
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">
                            <div onClick={() => handleSorting('plan_name')}>
                              <div>Plan Name</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'plan_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'plan_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('plan_short_message')}>
                              <div>Short Message</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'plan_short_message' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'plan_short_message' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('plan_duration')}>
                              <div>Duration</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'plan_duration' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'plan_duration' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('plan_old_price')}>
                              <div>Plan Old Price</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'plan_old_price' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'plan_old_price' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                              </div>
                            </div>
                          </th>
                          <th scope="col">
                            <div onClick={() => handleSorting('plan_pricing')}>
                              <div>Plan price</div>
                              <div>
                                <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'plan_pricing' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'plan_pricing' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
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
                                    className="cursor-pointer base-color-3"
                                    title="Edit"
                                    onClick={() => handleEdit(item.plan_features_id)}
                                  />

                                  <FontAwesomeIcon
                                    className="ms-2 cursor-pointer base-color-3"
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
