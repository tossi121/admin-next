import React from 'react'
import { Badge } from 'react-bootstrap'

const PreferenceTab = (props) => {
    const { userDetails } = props
    return (
        <div className="d-flex align-items-center">
            <h5 className="common-title">Dark Theme</h5>
            {userDetails.dark_mode == false && (
                <Badge pill bg="" className="me-1 badge-soft-danger">
                    Disabled
                </Badge>
            )}
            {userDetails.dark_mode == true && (
                <Badge pill bg="" className="me-1 badge-soft-success">
                    Enabled
                </Badge>
            )}
            <div className="d-flex align-items-center mx-3">
                <h5 className="common-title">Eod Alert</h5>
                {userDetails.eod_alert == false && (
                    <Badge pill bg="" className="me-1 badge-soft-danger">
                        Disabled
                    </Badge>
                )}
                {userDetails.eod_alert == true && (
                    <Badge pill bg="" className="me-1 badge-soft-success">
                        Enabled
                    </Badge>
                )}
            </div>
            <div className="d-flex align-items-center">
                <h5 className="common-title">Registered Platform</h5>
                <Badge pill bg="" className="me-1 badge-soft-info">
                    {userDetails.platform_type == 1 && 'Web Desktop'}
                    {userDetails.platform_type == 2 && 'Web Tablet'}
                    {userDetails.platform_type == 3 && 'Web Mobile'}
                    {userDetails.platform_type == 4 && (
                        <span>
                            {'Android App'} {userDetails.user_android_app_version}
                        </span>
                    )}
                    {userDetails.platform_type == 0 && <span>{'Web Desktop'}</span>}
                    {userDetails.platform_type == 5 && (
                        <span>
                            {'iOS App'} {userDetails.user_ios_app_version}
                        </span>
                    )}
                </Badge>
            </div>
        </div>
    )
}

export default PreferenceTab