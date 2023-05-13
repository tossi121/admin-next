import React, { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
// import CommonPagination from '../../../../../Pagination/CommonPagination'
import AdvancedScreenerTab from './AdvancedScreenerTab'
import LiveScreenerTab from './LiveScreenerTab'
import LiveOptionTab from './LiveOptionTab'
import TableLoader from '_utils/Loader/TableLoader'
import CommonPagination from 'components/Pagination/CommonPagination'

const ScreenerFilter = (props) => {
    const { isLoading, advancedScreenerFilter, AdvancedScreenerData, currentPage, setCurrentPage, setAdvancedScreenerData, liveScreenerFilter, LiveScreenerData, setLiveScreenerData, optionScreenerData, optionScreenerFilter, setOptionScreenerData } = props
    const [activeTab, setactiveTab] = useState('advancedScreenerFilter');
    const handleSelect = (eventKey) => {
        setactiveTab(eventKey);
    };
    return (
        <>
            <Nav
                as="ul"
                variant="pills"
                justify
                className="navtab-bg p-1"
                activeKey={activeTab}
                onSelect={handleSelect}>
                <Nav.Item as="li">
                    <Nav.Link eventKey="advancedScreenerFilter">Advanced Screener Filter</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="liveScreenerFilter">live Screener Filter</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="optionScreenerFilter">Option Screener Filter</Nav.Link>
                </Nav.Item>
            </Nav>

            <Tab.Content>
                <Tab.Pane active={activeTab === 'advancedScreenerFilter'} eventKey="advancedScreenerFilter">
                    {(isLoading && <TableLoader />) || (
                        <>
                            <AdvancedScreenerTab AdvancedScreenerData={AdvancedScreenerData} />
                            {advancedScreenerFilter.length > 0 && (
                                <CommonPagination
                                    data={advancedScreenerFilter}
                                    totalCount={advancedScreenerFilter.length}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setCurrentData={setAdvancedScreenerData}
                                    pageSize={10}
                                />
                            )}
                        </>
                    )}
                </Tab.Pane>
                <Tab.Pane active={activeTab === 'liveScreenerFilter'} eventKey="liveScreenerFilter">
                    {(isLoading && <TableLoader />) || (
                        <>
                            <LiveScreenerTab LiveScreenerData={LiveScreenerData} />
                            {liveScreenerFilter.length > 0 && (
                                <CommonPagination
                                    data={liveScreenerFilter}
                                    totalCount={liveScreenerFilter.length}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    setCurrentData={setLiveScreenerData}
                                    pageSize={10}
                                />
                            )}
                        </>
                    )}
                </Tab.Pane>
                <Tab.Pane active={activeTab === 'optionScreenerFilter'} eventKey="optionScreenerFilter">
                    <>
                        <LiveOptionTab optionScreenerData={optionScreenerData} />
                        {optionScreenerFilter.length > 0 && (
                            <CommonPagination   
                                data={optionScreenerFilter}
                                totalCount={optionScreenerFilter.length}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setCurrentData={setOptionScreenerData}
                                pageSize={10}
                            />
                        )}
                    </>
                </Tab.Pane>
            </Tab.Content>

        </>
    )
}

export default ScreenerFilter