import React, { useState } from 'react'
import { Nav, Tab, Tabs } from 'react-bootstrap'
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
            <Tabs
                defaultActiveKey="details"
                id="uncontrolled-tab-example"
                className="mb-3"
                activeKey={activeTab}
                onSelect={handleSelect}
            >
                <Tab eventKey="advancedScreenerFilter" className="mb-1 px-3" title="Advanced Screener Filter">
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
                </Tab>
                <Tab eventKey="liveScreenerFilter" className="mb-1 px-3" title="live Screener Filter">
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
                </Tab>
                <Tab eventKey="optionScreenerFilter" className="mb-1 px-3" title="Option Screener Filter">
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
                </Tab>
            </Tabs>
        </>
    )
}

export default ScreenerFilter