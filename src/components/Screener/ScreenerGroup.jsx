import { faEdit, faArrowDownLong, faArrowUpLong, faSearch, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import CommonPagination from '../Pagination/CommonPagination';
import AddScreenerGroup from './AddScreenerGroup';
import TableLoader from '_utils/Loader/TableLoader';
import EditScreenerGroup from './EditScreenerGroup';
import { toast } from 'react-toastify';
import { deleteScreenerData, getScreenerListData } from '_services/nifty_service_api';
import DeleteModal from 'components/DeleteModal';
import SelectBox from 'components/SelectBox';

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
  const [sortBy, setsortBy] = useState('screener_group_id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

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
      {showEdit && <EditScreenerGroup ScreenerData={screenerListData} setShow={setShowEdit} selectedId={selectedId} />}
      {show && <AddScreenerGroup ScreenerData={screenerListData} setShow={setShow} />}
      {!show && !showEdit && (
        <section >
          <Row>
            <Col>
              <h5 className="fw-500 mb-3">Screener Group</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <section>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                      <Button variant="primary mx-4" className='web-button' onClick={() => setShow(true)}>
                        Add New Group
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
                                <div onClick={() => handleSorting('screener_group_id')}>
                                  <div>Id</div>
                                  <div className='d-flex justify-content-center align-content-center'>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'screener_group_id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={` ${sortBy == 'screener_group_id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div className='d-flex align-items-center cursor-pointer text-nowrap' onClick={() => handleSorting('screener_group_name')}>
                                  <div>Group Name</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'screener_group_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'screener_group_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <div onClick={() => handleSorting('symbol_name')}>
                                  <div>Symbols</div>
                                  <div>
                                    <FontAwesomeIcon icon={faArrowUpLong} width={8} className={`ms-1 ${sortBy == 'symbol_name' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''}`} />
                                    <FontAwesomeIcon icon={faArrowDownLong} width={8} className={`${sortBy == 'symbol_name' ? (sortStyle == 'text-success' ? sortStyle : '') : ''}`} />
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
                                    <td className='d-flex'>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        width={16}
                                        className="cursor-pointer base-color-3"
                                        title="Edit"
                                        onClick={() => handleEdit(item.screener_group_id)}
                                      />
                                      <FontAwesomeIcon
                                        className="ms-2 cursor-pointer base-color-3"
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