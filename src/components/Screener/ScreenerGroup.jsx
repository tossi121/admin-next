import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import CommonPagination from '../Pagination/CommonPagination';
import AddScreenerGroup from './AddScreenerGroup';
// import { useAuth } from '../../../_context/authContext';
// import { useHistory } from 'react-router';
import TableLoader from '_utils/Loader/TableLoader';
import EditScreenerGroup from './EditScreenerGroup';
import { toast } from 'react-toastify';
import { deleteScreenerData, getScreenerListData } from '_services/nifty_service_api';

const ScreenerGroup = () => {
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchInput, setSearchInput] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true);
  const [screenerData, setScreenerData] = useState([])
  const [totalPages, setTotalPages] = useState(null)
  const [totalItems, setTotalItems] = useState(null)
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('screener_group_id');
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
      screenerListData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);


  async function screenerListData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getScreenerListData(params);
    if (response.result == 1) {
      const data = response.data;
      setScreenerData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setScreenerData([]);
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
    const response = await deleteScreenerData(params);
    if (response.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      screenerListData()
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
          Show{" "}
          <select
            className="border bg-white rounded-3 cursor-pointer label-color-4 custom-select px-2 py-1 mx-1"
            onChange={(e) => {
              setPageSize(e.target.value)
            }}
          >
            {lengthMenu.map((item, key) => {
              return (
                <option key={key} defaultValue={key === 0} value={item}>
                  {item}
                </option>
              )
            })}
          </select>{" "}
          Entries
        </div>
      </>
    )
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
      {showEdit && <EditScreenerGroup ScreenerData={screenerListData} setShow={setShowEdit} selectedId={selectedId} />}
      {show && <AddScreenerGroup ScreenerData={screenerListData} setShow={setShow} />}
      {!show && !showEdit && (
        <section >
          {deleteModal()}
          <Row>
            <Col>
              <div className="page-title-box">
                <h4 className="page-title">Screener Group</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <section>
                    <div className="d-flex justify-content-between align-items-center">
                      {selectBox()}
                      <Button variant="primary mx-4" onClick={() => setShow(true)}>
                        Add New Group
                      </Button>
                      <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                        <FontAwesomeIcon
                          icon={faSearch}
                          width="16"
                          height="16"
                          className="position-absolute"
                        />
                        <input
                          type="text"
                          className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                          placeholder="Search By Group Name"
                          value={searchInput}
                          onChange={(e) => {
                            setSearchInput(e.target.value);
                            setCurrentPage(1);
                          }}
                        />
                        <span className="input-border"></span>
                      </div>
                    </div>

                    <div className="table-responsive  stock-analysis-table">
                      {(isLoading && <TableLoader />) || (
                        <Table className="table">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('screener_group_id')}>
                                  <div>Id</div>
                                  <div className='d-flex justify-content-center align-content-center'>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'screener_group_id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={` ${sortBy == 'screener_group_id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer text-nowrap' onClick={() => handleSorting('screener_group_name')}>
                                  <div>Group Name</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'screener_group_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'screener_group_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('symbol_name')}>
                                  <div>Symbols</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'symbol_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'symbol_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(screenerData.length > 0 &&
                              screenerData.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item.screener_group_id}</td>
                                    <td className='text-nowrap'>{item.screener_group_name}</td>
                                    <td>{item.symbol_name}</td>
                                    <td>{item.is_active === 1 ?
                                      <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                        Active
                                      </Badge> :
                                      <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                        Inactive
                                      </Badge>}
                                    </td>
                                    <td>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        width={16}
                                        className="cursor-pointer"
                                        title="Edit"
                                        onClick={() => handleEdit(item.screener_group_id)}
                                      />
                                      <FontAwesomeIcon
                                        className="ms-2 cursor-pointer"
                                        icon={faTrash}
                                        width={16}
                                        title="Delete"
                                        onClick={() => handleDelete(item.screener_group_id)}
                                      />
                                    </td>
                                  </tr>
                                )
                              })) || <h5 className="text-nowrap">No data found</h5>}
                          </tbody>
                        </Table>
                      )}
                    </div>
                    {screenerData.length > 0 && totalItems && pageSize && (
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
  )
}

export default ScreenerGroup