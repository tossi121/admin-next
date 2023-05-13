import moment from 'moment'
import React from 'react'
import { Badge, Col, Row } from 'react-bootstrap'

const PersonalDetailsTab = (props) => {
  const { userDetails } = props
  return (
    <>
      <Row>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Name:</h5>
          <span className="ms-2">
            {(userDetails?.name == null && 'N/A') ||
              (userDetails.name == '' && 'N/A') ||
              userDetails.name}
          </span>
        </Col>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Mobile No.: </h5>
          <span className="ms-2">
            {(userDetails.phone_no == null && 'N/A') ||
              (userDetails.phone_no == '' && 'N/A') ||
              userDetails.phone_no}
          </span>
        </Col>
        <Col lg={4} className='d-flex align-items-center'>
          <h5 className="fw-bold text-nowrap">Email Address:</h5>
          <span className="mx-2">{userDetails?.email}</span>
          {userDetails.is_email_verify == false && (
            <Badge pill bg="" className="me-1 badge-soft-danger">
              Not Verified
            </Badge>
          )}
          {userDetails.is_email_verify == true && (
            <Badge pill bg="" className="me-1 badge-soft-success">
              Verified
            </Badge>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Social Flag: </h5>
          <span className="ms-2">
            {(userDetails.user_social_flag == 0 && 'Email') ||
              (userDetails.user_social_flag == 1 && 'Google') ||
              (userDetails.user_social_flag == 2 && 'Facebook')}
          </span>
        </Col>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Gender: </h5>
          <span className="ms-2">
            {(userDetails.gender == null && 'N/A') ||
              (userDetails.gender == '' && 'N/A') ||
              userDetails.gender == 'M' && 'Male' ||
              userDetails.gender == 'F' && "Female" ||
              userDetails.gender
            }
          </span>
        </Col>
        <Col lg={4} className='d-flex align-items-center'>
          <h5 className="me-2 fw-bold">Date Of Birth: </h5>
          <span>
            {(userDetails.date_of_birth == null && 'N/A') ||
              (userDetails.date_of_birth == '' && 'N/A') ||
              moment(userDetails.date_of_birth).format('MMM DD, YYYY')}
          </span>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="me-2 fw-bold">Country</h5>
          <span>
            {(userDetails.country == null && 'N/A') ||
              (userDetails.country == '' && 'N/A') ||
              userDetails.country}
          </span>
        </Col>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">State: </h5>
          <span className="ms-2">
            {(userDetails.state == null && 'N/A') ||
              (userDetails.state == '' && 'N/A') ||
              userDetails.state
            }
          </span>
        </Col>
        <Col lg={4} className='d-flex align-items-center'>
          <h5 className="fw-bold">City:</h5>
          <span className="ms-2">
            {(userDetails.city == null && 'N/A') ||
              (userDetails.city == '' && 'N/A') ||
              userDetails.city}
          </span>
        </Col>
      </Row >
      <Row>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Pincode: </h5>
          <span className="ms-2">
            {(userDetails.pincode == null && 'N/A') ||
              (userDetails.pincode == '' && 'N/A') ||
              userDetails.pincode}
          </span>
        </Col>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Industry: </h5>
          <span className="ms-2">
            {(userDetails.industry == null && 'N/A') ||
              (userDetails.industry == '' && 'N/A') ||
              userDetails.industry}
          </span>
        </Col>
        <Col lg={4} className='d-flex align-items-center'>
          <h5 className="me-2 fw-bold">Occupation: </h5>
          <span>
            {(userDetails.occupation == null && 'N/A') ||
              (userDetails.occupation == '' && 'N/A') ||
              userDetails.occupation}
          </span>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Annual Income: </h5>
          <span className="ms-2">
            {(userDetails.annual_income == null && 'N/A') ||
              (userDetails.annual_income == '' && 'N/A') ||
              userDetails.annual_income}
          </span>
        </Col>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Android app version: </h5>
          <span className="ms-2">
            {(userDetails.user_android_app_version == null && 'N/A') ||
              (userDetails.user_android_app_version == '' && 'N/A') ||
              userDetails.user_android_app_version}
          </span>
        </Col>
        <Col lg={4} className='d-flex align-items-center'>
          <h5 className="fw-bold">Ios app version: </h5>
          <span className="ms-2">
            {(userDetails.user_ios_app_version == null && 'N/A') ||
              (userDetails.user_ios_app_version == '' && 'N/A') ||
              userDetails.user_ios_app_version
            }
          </span>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Referral Code: </h5>
          <span className="ms-2">
            {(userDetails.my_referral_code == null && 'N/A') ||
              (userDetails.my_referral_code == '' && 'N/A') ||
              userDetails.my_referral_code}
          </span>
        </Col>
        <Col lg={3} className='d-flex align-items-center'>
          <h5 className="fw-bold">Active User: </h5>
          <span className="ms-2">
            {(userDetails.my_referral_code == '' && 'N/A') ||
              userDetails.is_active ? 'Yes' : 'No'}
          </span>
        </Col>
        <Col lg={4} className='d-flex align-items-center'>
          <h5 className="me-2 fw-bold">User Id: </h5>
          <span>
            {(userDetails.user_id == null && 'N/A') ||
              (userDetails.user_id == '' && 'N/A') ||
              userDetails.user_id}
          </span>
        </Col>
      </Row>
    </>
  )
}

export default PersonalDetailsTab