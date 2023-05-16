import moment from 'moment';
import React from 'react'
import { Badge } from 'react-bootstrap';

const LastLoginTab = (props) => {
    const { lastLoginData } = props
    return (
        <table className="table table-responsive subscription-table mb-0">
            <thead>
                <tr>
                    <th scope="col" className='table-heading'>Last Login</th>
                    <th scope="col" className='table-heading'>Platform</th>
                    <th scope="col" className='table-heading'>Status</th>
                    <th scope="col" className='table-heading'>User Agent</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {(lastLoginData.length > 0 &&
                        lastLoginData.map((item, index) => {
                            const user_agent = item?.user_agent.replace(/[()/]/g, '').split(',').join(' ');
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{moment(item?.last_login).format('MMM DD, YYYY, h:mm A')}</td>
                                        <td>{item?.platform_type == 1 ? 'Web Desktop' : item?.platform_type == 2 ? 'Web Tablet' : item?.platform_type == 3 ? 'Web Mobile' : item?.platform_type == 4 ? 'Android' : item?.platform_type == 5 ? 'iOS' : "N/A"}</td>
                                        {console.log(item.is_active, 'sadf')}
                                        <td>
                                            {item.is_active ?
                                                <Badge pill bg="" className="me-1 fs-6 badge-soft-success">
                                                    Live
                                                </Badge> :
                                                <Badge pill bg="" className="me-1 fs-6 badge-soft-dark">
                                                    Offline
                                                </Badge>}
                                        </td>
                                        <td>{user_agent}</td>
                                    </tr>
                                </>
                            );
                        })) ||
                        <tr>
                            <td className="border border-0 p-0 pt-2">
                                <p>No Data Found</p>
                            </td>
                        </tr>
                    }
                </>
            </tbody>
        </table>
    )
}

export default LastLoginTab