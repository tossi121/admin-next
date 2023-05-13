import React from 'react'

const AlertsTab = (props) => {
    const { currentalertData } = props
    return (
        <table className="table table-responsive subscription-table mb-0">
            <thead>
                <tr>
                    <th scope="col">Symbol</th>
                    <th scope="col">Deliver Method</th>
                    <th scope="col">Used</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {(currentalertData.length > 0 &&
                        currentalertData.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{item.symbol}</td>
                                        <td>{item.deliver_method && 'WEB' || 'N/A'}</td>
                                        <td>{item.is_used ? 'Yes' : 'No'}</td>
                                    </tr>
                                </>
                            );
                        })) ||
                        <tr>
                            <td className="border border-0 p-0 pt-2 ps-2">
                                <p className="fw-bold fs-5 ">No Data Found</p>
                            </td>
                        </tr>
                    }
                </>
            </tbody>
        </table>
    )
}

export default AlertsTab