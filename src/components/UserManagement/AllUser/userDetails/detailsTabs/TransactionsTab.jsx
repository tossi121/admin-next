import moment from 'moment';
import React from 'react'
import { Badge } from 'react-bootstrap';

const TransactionsTab = (props) => {
    const { currentData } = props
    return (
        <table className="table table-responsive subscription-table mb-0">
            <thead>
                <tr>
                    <th scope="col" className='table-heading' >Order Id</th>
                    <th scope="col" className='table-heading' >Purchase Time</th>
                    <th scope="col" className='table-heading' >Plan Name</th>
                    <th scope="col" className='table-heading' >Plan Type</th>
                    <th scope="col" className='table-heading' >Amount</th>
                    <th scope="col" className='table-heading' >Payment Status</th>
                    <th scope="col" className='table-heading' >Transaction Id</th>
                    <th scope="col" className='table-heading' >Platform</th>
                    <th scope="col" className='table-heading' >End Date</th>
                    <th scope="col" className='table-heading' >Subscription Status</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {(currentData.length > 0 &&
                        currentData.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>#{item.order_id}</td>
                                        <td>{moment(item.order_date_time).format('MMM DD YYYY, h:mm A')}</td>
                                        <td>{item.plan_name}</td>
                                        <td>{item.plan_type == 2 ? 'NiftyTrader Prime' : item.plan_type == 3 ? 'Option Simulator' : item.plan_type == 4 ? 'Combo' : 'N/A'}</td>
                                        <td>{item.order_amount}</td>
                                        <td>
                                            {(item.txn_payment_status == 1 && (
                                                <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                    Success
                                                </Badge>
                                            )) || (
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                                        Failed
                                                    </Badge>
                                                )}
                                        </td>
                                        <td>{(item.txn_payment_id == '' && 'N/A') || item.txn_payment_id}</td>
                                        <td>
                                            {item.platform_type == 1 && 'Web Desktop'}
                                            {item.platform_type == 2 && 'Web Tablet'}
                                            {item.platform_type == 3 && 'Web Mobile'}
                                            {item.platform_type == 4 && 'Android'}
                                            {item.platform_type == 0 && 'Web Desktop'}
                                            {item.platform_type == 5 && 'iOS'}
                                            {item.platform_type == null && 'Web Desktop'}
                                        </td>
                                        <td>{moment(item.end_date).format('MMM DD, YYYY')}</td>
                                        <td className="text-center">
                                            <>
                                                {item.is_active == 'A' && (
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                        Active
                                                    </Badge>
                                                )}
                                                {item.is_active == 'P' && (
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                                        Expired
                                                    </Badge>
                                                )}
                                                {item.is_active == 'U' && (
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-warning">
                                                        Upcoming
                                                    </Badge>
                                                )}
                                            </>
                                        </td>
                                    </tr>
                                </>
                            );
                        })) || <tr>
                            <td className="border border-0 p-0 pt-2 ps-2">
                                <p className="fw-bold fs-5 ">No Data Found</p>
                            </td>
                        </tr>}
                </>
            </tbody>
        </table>
    )
}

export default TransactionsTab