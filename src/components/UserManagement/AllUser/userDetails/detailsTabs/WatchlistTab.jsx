import React from 'react'
import { Badge } from 'react-bootstrap';

const WatchlistTab = (props) => {
    const { currentWatchlistData } = props
    return (
        <table className="table table-responsive subscription-table mb-0">
            <thead>
                <tr>
                    <th scope="col">Watchlist Name</th>
                    <th scope="col">Symbol Name List</th>
                    <th scope="col">Default</th>
                    <th scope="col">Platform</th>
                    <th scope="col">Applied Columns</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {(currentWatchlistData.length > 0 &&
                        currentWatchlistData.map((item, index) => {
                            const jsonData = JSON.parse(item?.column_json);
                            const selectdata = (item.symbol_name_list).split(',')
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{item.watchlist_name}</td>
                                        <td>
                                            {selectdata.length > 1 ? (
                                                <select
                                                    name="stock"
                                                    id="state"
                                                    className='w-100 bg-white py-1 border border-1'
                                                >
                                                    {selectdata.map((item1, key) => (
                                                        <option key={key} disabled={key !== 0} className='text-dark'>
                                                            {item1}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <p>N/A</p>
                                            )}
                                        </td>
                                        <td>{item.isDefault ? 'Yes' : 'No'}</td>
                                        <td>{item.is_web ? 'Web' : 'App'}</td>
                                        <td>
                                            <span>
                                                Volume:{jsonData?.volume ?
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                        Active
                                                    </Badge> :
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                                        Inactive
                                                    </Badge>}&nbsp;
                                            </span>
                                            <span>
                                                Current Price:{jsonData?.currentPrice ?
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                        Active
                                                    </Badge> :
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                                        Inactive
                                                    </Badge>} &nbsp;
                                            </span>
                                            <span>
                                                Change:{jsonData?.change ?
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                        Active
                                                    </Badge> :
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                                        Inactive
                                                    </Badge>}&nbsp;
                                            </span>
                                            <span>
                                                Change Percent:{jsonData?.changePercent ?
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                        Active
                                                    </Badge> :
                                                    <Badge pill bg="" className="me-1 fs-6 badge-soft-danger">
                                                        Inactive
                                                    </Badge>} &nbsp;
                                            </span>
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

export default WatchlistTab