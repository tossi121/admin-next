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
import CommonPagination from '../Pagination/CommonPagination';
import dynamic from 'next/dynamic';
const EditTermsModal = dynamic(() => import('./EditTermsModal'), { ssr: false });
const CreateTermsModal = dynamic(() => import('./CreateTermsModal'), { ssr: false });
import TableLoader from '_utils/Loader/TableLoader';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { deleteTermsData, getTermsData } from '_services/nifty_service_api';
import SelectBox from 'components/SelectBox';
import DeleteModal from 'components/DeleteModal';

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
  const [sortBy, setsortBy] = useState('id');
  const [sortType, setsortType] = useState('asc');
  const [sortToggle, setSortToggle] = useState(false);
  const [sortStyle, setSortStyle] = useState('text-dark');

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
      order_dir: sortType,
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
      handelTermsData();
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

  return (
    <>
      <div>
        <>
          <DeleteModal
            showModal={showModal}
            setShowModal={setShowModal}
            deleteStock={handledeleteTermsData}
            stockText="terms"
          />
          {showEdit && (
            <EditTermsModal show={showEdit} setShow={setShowEdit} termsData={handelTermsData} selectedId={selectedId} />
          )}

          {show && <CreateTermsModal termsData={handelTermsData} setShow={setShow} />}

          {!show && !showEdit && (
            <section className="stock-analysis">
              <Row>
                <Col>
                  <h5 className="fw-500 mb-3">Terms</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <SelectBox setPageSize={setPageSize} setCurrentPage={setCurrentPage} />
                        <Button variant="primary mx-4" className="web-button" onClick={() => setShow(true)}>
                          Add New Terms
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

                      <div className="table-responsive stock-analysis-table text-nowrap">
                        {(isLoading && <TableLoader />) || (
                          <Table className="table">
                            <thead>
                              <tr>
                                <th scope="col">
                                  <div onClick={() => handleSorting('id')}>
                                    <div>Sr. No.</div>
                                    <div>
                                      <FontAwesomeIcon
                                        icon={faArrowUpLong}
                                        width={8}
                                        className={`ms-1 ${
                                          sortBy == 'id' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                        }`}
                                      />
                                      <FontAwesomeIcon
                                        icon={faArrowDownLong}
                                        width={8}
                                        className={`${
                                          sortBy == 'id' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </th>
                                <th scope="col">
                                  <div onClick={() => handleSorting('title')}>
                                    <div>Term</div>
                                    <div>
                                      <FontAwesomeIcon
                                        icon={faArrowUpLong}
                                        width={8}
                                        className={`ms-1 ${
                                          sortBy == 'title' ? (sortStyle == 'text-danger' ? sortStyle : '') : ''
                                        }`}
                                      />
                                      <FontAwesomeIcon
                                        icon={faArrowDownLong}
                                        width={8}
                                        className={`${
                                          sortBy == 'title' ? (sortStyle == 'text-success' ? sortStyle : '') : ''
                                        }`}
                                      />
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
                                        {((item?.shortDesc == null || item?.shortDesc == '') && 'N/A') ||
                                          parse(item?.shortDesc)}
                                      </td>
                                      <td>
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          width={16}
                                          className="cursor-pointer base-color-3"
                                          title="Edit"
                                          onClick={() => handleEdit(item?.id)}
                                        />
                                        <FontAwesomeIcon
                                          className="ms-2 cursor-pointer base-color-3"
                                          icon={faTrash}
                                          width={14}
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
