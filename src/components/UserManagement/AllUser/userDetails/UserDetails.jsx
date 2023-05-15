import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Row, Tab, Tabs } from 'react-bootstrap';
// import { useLocation, useHistory } from 'react-router-dom';
// import { getUserDataList, getUserDetails } from '../../../../../_services/nifty_service_api';
import TableLoader from '_utils/Loader/TableLoader';
// import { useAuth } from '../../../../../_context/authContext';
import EditUserDetails from '../EditUserDetails';
import PersonalDetailsTab from './detailsTabs/PersonalDetailsTab';
import PreferenceTab from './detailsTabs/PreferenceTab';
import TransactionsTab from './detailsTabs/TransactionsTab';
import AlertsTab from './detailsTabs/AlertsTab';
import WatchlistTab from './detailsTabs/WatchlistTab';
import LastLoginTab from './detailsTabs/LastLoginTab';
import ScreenerFilter from './detailsTabs/ScreenerFilter/ScreenerFilter';
// import { useRouter } from 'next/router';
import { getUserDataList, getUserDetails } from '_services/nifty_service_api';
import CommonPagination from 'components/Pagination/CommonPagination';

function UserDetails(props) {
  const {userId} = props

  // const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  // const router = useLocation();
  // const userId = router.pathname.split('/user-details/');
  // const id = userId[1];
  const [searchInput, setSearchInput] = useState('');
  const [userList, setUserList] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentalertData, setCurrentAlertData] = useState([]);
  const [currentWatchlistData, setCurrentWatchlistData] = useState([]);
  const [AdvancedScreenerData, setAdvancedScreenerData] = useState([]);
  const [LiveScreenerData, setLiveScreenerData] = useState([]);
  const [optionScreenerData, setOptionScreenerData] = useState([]);
  const [lastLoginData, setLastLoginData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersdata] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState([]);
  const [alertDetails, setAlertDetails] = useState([]);
  const [watchlistDetails, setWatchlistDetails] = useState([]);
  const [advancedScreenerFilter, setAdvancedScreenerFilter] = useState([]);
  const [liveScreenerFilter, setLiveScreenerFilter] = useState([]);
  const [optionScreenerFilter, setOptionScreenerFilter] = useState([]);
  const [activelastLoginData, setActivelastLoginData] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // const history = useHistory();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     userDataDetails();
  //   }
  //   if (!isLoggedIn) {
  //     history.push('/auth/login');
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (userId) {
      userDataDetails();
    }
  }, []);

  useEffect(() => {
    if (searchInput != '') {
      const debounceTimer = setTimeout(() => {
        userSearchData();
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
    if (searchInput == '') {
      setUserList(null);
    }
  }, [searchInput]);

  async function userSearchData() {
    const params = {
      search_keyword: searchInput,
    };
    setIsLoading(false);
    const response = await getUserDataList(params);
    if (response?.result == 1) {
      const data = response.data.items;
      setUserList(data);
    } else {
      setUserList([]);
    }
    setIsLoading(false);
  }

  async function userDataDetails() {
    const params = {
      id: userId,
    };
    setIsLoading(true);
    const response = await getUserDetails(params);
    if (response?.result == 1) {
      const data = response.data;
      setOrdersdata(data.order_details);
      setUserDetails(data.user_detail);
      setAlertDetails(data.alerts_details);
      setWatchlistDetails(data.watchlist_details);
      setAdvancedScreenerFilter(data.advanced_screener_filter);
      setLiveScreenerFilter(data.live_screener_filter);
      setOptionScreenerFilter(data.option_screener_filter);
      setActivelastLoginData(data.active_login_details);
    }
    setIsLoading(false);
  }

  function handleCheckbox(event) {
    const planStatus = event.target.value;
    if (checkedStatus.includes(planStatus)) {
      setCheckedStatus(checkedStatus.filter((c) => c !== planStatus));
    } else {
      setCheckedStatus([...checkedStatus, planStatus]);
    }
  }

  useEffect(() => {
    if (checkedStatus.length === 0) {
      setFilteredData(ordersData);
    } else {
      const filteredItems = ordersData.filter((item) => checkedStatus.includes(item.is_active));
      setFilteredData(filteredItems);
    }
  }, [ordersData, checkedStatus]);

  useEffect(() => {
    if (filteredData.length == 0) {
      setCurrentData([]);
    }
  }, [filteredData]);

  function handleEditShow(id) {
    setEditShow(true)
    setSelectedId(id)
  }

  return (
    <>
      {editShow && <EditUserDetails show={editShow} userDetailsData={userDataDetails} setShow={setEditShow} selectedId={selectedId} />}
      {
        !editShow && (
          <section className="user-details">
            <Row>
              <Col>
                <div className="page-title-box">
                  <h4 className="page-title">
                    {(userDetails?.name == null || userDetails.name == '') && 'User Details' || userDetails.name + ' Details'}
                  </h4>
                  <div className="d-flex text-nowrap justify-content-around">
                    <div className='me-3'>
                      <Button onClick={() => handleEditShow(userDetails.user_id)}>
                        Edit Details
                      </Button>
                    </div>
                    <div className='search-box position-relative me-3 mt-1 user-search'>
                      <FontAwesomeIcon icon={faSearch} width="16" height="16" className="position-absolute" />
                      <input
                        type="text"
                        className="form-control fs-14 shadow-none rounded-0 p-1 bg-transparent"
                        placeholder="Search by Name, Email or Mobile No"
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          setCurrentPage(1);
                        }} />
                      <span className="input-border"></span>
                      <div className="list-unstyled bg-white position-absolute user-list overflow-auto shadow w-100">
                        {(userList?.length > 0 &&
                          userList.map((item, index) => {
                            const userName = (item.name == null && 'N/A') || (item.name == '' && 'N/A') || item.name;
                            const userEmail = (item.email == null && 'N/A') || (item.email == '' && 'N/A') || item.email;
                            const userMobile = (item.phone_no == null && 'N/A') || (item.phone_no == '' && 'N/A') || item.phone_no;
                            const userSpace = '  -  ';
                            const userData = userName + userSpace + userEmail + userSpace + userMobile;
                            return (
                              <a href={`/user-details/${item.user_id}`} className="text-secondary" key={index}>
                                <li className="d-flex my-2" title={userData}>
                                  <p key={index} className="ps-2 cursor-pointer mb-0 overflow-hidden text-nowrap">
                                    {userName}
                                  </p>
                                  <p key={index} className="px-2 cursor-pointer mb-0 overflow-hidden text-nowrap">
                                    {userEmail}
                                  </p>
                                  <p key={index} className="px-2 cursor-pointer mb-0 overflow-hidden text-nowrap">
                                    {userMobile}
                                  </p>
                                </li>
                              </a>
                            );
                          })) ||
                          (userList?.length === 0 && <li className="px-2 py-1">No Data found</li>)}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row >
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Tabs
                      defaultActiveKey="details"
                      id="uncontrolled-tab-example"
                      className="mb-0"
                      onSelect={() => setSearchInput('')}
                    >
                      <Tab eventKey="details" className="mb-0" title="Personal Info">
                        {(isLoading && <TableLoader />) || (
                          <PersonalDetailsTab userDetails={userDetails} />
                        )}
                      </Tab>
                      <Tab eventKey="preference" title="Preferences">
                        <PreferenceTab userDetails={userDetails} />
                      </Tab>
                      <Tab eventKey="Orders" title="Orders">
                        <div className="table-responsive table-user text-nowrap">
                          {(isLoading && <TableLoader />) || (
                            <>
                              <TransactionsTab currentData={currentData} />
                              {filteredData.length > 0 && (
                                <CommonPagination
                                  data={filteredData}
                                  totalCount={filteredData.length}
                                  currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}
                                  setCurrentData={setCurrentData}
                                  pageSize={10}
                                />
                              )}
                            </>
                          )}
                        </div>
                        {/* filter for Subscription Status */}
                        <Dropdown className="position-absolute plan-status top-0 end-0 mt-2 me-3">
                          <Dropdown.Toggle variant=" " id="dropdown-basic" data-bs-auto-close="inside" aria-expanded="false">
                            Select plan
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <div className="m-2">
                              <Form.Check
                                type="checkbox"
                                className="my-2"
                                id="default-checkbox1"
                                name="checkbox1"
                                value={'A'}
                                checked={checkedStatus.includes('A')}
                                onChange={handleCheckbox}
                                label="Active"
                              />
                              <Form.Check
                                type="checkbox"
                                className="my-2"
                                name="checkbox2"
                                value={'U'}
                                checked={checkedStatus.includes('U')}
                                onChange={handleCheckbox}
                                id="default-checkbox2"
                                label="Upcoming"
                              />

                              <Form.Check
                                type="checkbox"
                                className="my-2"
                                id="default-checkbox3"
                                name="checkbox3"
                                value={'P'}
                                checked={checkedStatus.includes('P')}
                                onChange={handleCheckbox}
                                label="Expired"
                              />
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Tab>
                      <Tab eventKey="alerts" title="Alerts">
                        <div className="table-responsive table-user text-nowrap">
                          {(isLoading && <TableLoader />) || (
                            <>
                              <AlertsTab currentalertData={currentalertData} />
                              {alertDetails.length > 0 && (
                                <CommonPagination
                                  data={alertDetails}
                                  totalCount={alertDetails.length}
                                  currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}
                                  setCurrentData={setCurrentAlertData}
                                  pageSize={10}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </Tab>
                      <Tab eventKey="watchlist" title="Watchlist">
                        <div className="table-responsive table-user text-nowrap">
                          {(isLoading && <TableLoader />) || (
                            <>
                              <WatchlistTab currentWatchlistData={currentWatchlistData} />
                              {watchlistDetails.length > 0 && (
                                <CommonPagination
                                  data={watchlistDetails}
                                  totalCount={watchlistDetails.length}
                                  currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}
                                  setCurrentData={setCurrentWatchlistData}
                                  pageSize={10}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </Tab>
                      {/*inside tabing */}
                      {/* <Tab eventKey='screenerfilter' title="Screener Filter">
                        <div className="table-responsive table-user text-nowrap">
                          <ScreenerFilter isLoading={isLoading} advancedScreenerFilter={advancedScreenerFilter} AdvancedScreenerData={AdvancedScreenerData} currentPage={currentPage} setCurrentPage={setCurrentPage} setAdvancedScreenerData={setAdvancedScreenerData} liveScreenerFilter={liveScreenerFilter} LiveScreenerData={LiveScreenerData} setLiveScreenerData={setLiveScreenerData} optionScreenerData={optionScreenerData} optionScreenerFilter={optionScreenerFilter} setOptionScreenerData={setOptionScreenerData} />
                        </div>
                      </Tab> */}
                      <Tab eventKey="active_login_details" title="Login Status">
                        <div className="table-responsive table-user text-nowrap">
                          {(isLoading && <TableLoader />) || (
                            <>
                              <LastLoginTab lastLoginData={lastLoginData} />
                              {activelastLoginData.length > 0 && (
                                <CommonPagination
                                  data={activelastLoginData}
                                  totalCount={activelastLoginData.length}
                                  currentPage={currentPage}
                                  setCurrentPage={setCurrentPage}
                                  setCurrentData={setLastLoginData}
                                  pageSize={10}
                                />
                              )}
                            </>
                          )}
                        </div>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section >
        )
      }
    </>
  );
}

export default UserDetails;
