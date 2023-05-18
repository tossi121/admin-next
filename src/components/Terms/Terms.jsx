import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import CommonPagination from '../Pagination/CommonPagination';
import EditTermsModal from './EditTermsModal';
import CreateTermsModal from './CreateTermsModal';
// import { useHistory } from 'react-router-dom';
// import { useAuth } from '../../../_context/authContext';
import TableLoader from '_utils/Loader/TableLoader';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { deleteTermsData, getTermsData } from '_services/nifty_service_api';

const Terms = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [termsData, setTermsData] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // const { isLoggedIn } = useAuth();
  // const history = useHistory();
  const [sortBy, setsortBy] = useState('id');
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
      handelTermsData();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, pageSize, searchInput, sortBy, sortType, sortStyle]);

  async function handelTermsData() {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize,
      search_keyword: searchInput,
      order_by: sortBy,
      order_dir: sortType
    };
    setIsLoading(true);
    const response = await getTermsData(params);
    if (response.result == 1) {
      const data = response.data;
      setTermsData(data.items);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } else {
      setTermsData([]);
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
  async function handledeleteTermsData() {
    const params = {
      id: deleteId,
    };
    const response = await deleteTermsData(params);
    if (response?.result == 1) {
      toast.success(response.message);
      setShowModal(false);
      handelTermsData()
    } else {
      toast.error(response.message);
    }
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
          <Button variant="danger" onClick={handledeleteTermsData}>
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
      <div>
        <>
          {deleteModal()}
          {showEdit && <EditTermsModal show={showEdit} setShow={setShowEdit} termsData={handelTermsData} selectedId={selectedId} />}

          {show && <CreateTermsModal termsData={handelTermsData} setShow={setShow} />}

          {!show && !showEdit && (
            <section className="stock-analysis">
              <Row>
                <Col>
                  <div className="page-title-box">
                    <h4 className="page-title">Terms</h4>
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
                            Add New Terms
                          </Button>
                          <div className="search-box position-relative text-center me-2 ms-auto pb-2">
                            <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
                            <input
                              type="text"
                              className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                              placeholder="Search By Term or Short Description"
                              value={searchInput}
                              onChange={(e) => {
                                setSearchInput(e.target.value);
                                setCurrentPage(1);
                              }}
                            />
                            <span className="input-border"></span>
                          </div>
                        </div>

                        <div className="table-responsive table-user stock-analysis-table">
                          {(isLoading && <TableLoader />) || (
                            <Table className="table text-nowrap">
                              <thead>
                                <tr>
                                  <th scope="col">
                                    <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('id')}>
                                      <div>Sr. No.</div>
                                      <div>
                                        <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                        <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                      </div>
                                    </div>
                                  </th>
                                  <th scope="col">
                                    <div className='d-flex align-items-center cursor-pointer' onClick={() => handleSorting('title')}>
                                      <div>Term</div>
                                      <div>
                                        <FontAwesomeIcon icon={faArrowUpLong} width={5} className={`ms-1 ${sortBy == 'title' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                        <FontAwesomeIcon icon={faArrowDownLong} width={5} className={`${sortBy == 'title' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                      </div>
                                    </div>
                                  </th>
                                  <th scope="col">Short Description</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(termsData?.length > 0 &&
                                  termsData.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{item?.id}</td>
                                        <td>{item?.title}</td>
                                        <td className="text-wrap">
                                          {((item?.shortDesc == null || item?.shortDesc == '') && 'N/A') || parse(item?.shortDesc)}
                                        </td>
                                        <td>
                                          <FontAwesomeIcon
                                            icon={faEdit}
                                            width={16}
                                            className="cursor-pointer"
                                            title="Edit"
                                            onClick={() => handleEdit(item?.id)}
                                          />
                                          <FontAwesomeIcon
                                            className="ms-2 cursor-pointer"
                                            icon={faTrash}
                                            width={16}
                                            title="Delete"
                                            onClick={() => handleDelete(item?.id)}
                                          />
                                        </td>
                                      </tr>
                                    );
                                  })) || <h5 className="text-nowrap">No data found</h5>}
                              </tbody>
                            </Table>
                          )}
                        </div>
                        {termsData.length > 0 && totalItems && pageSize && (
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

export default Terms;
