import moment from 'moment';
import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';

const PersonalDetailsTab = (props) => {
  const { userDetails } = props;
  return (
    <>
      <Row>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Name:</h5>
          <div className="ms-2 mb-1">
            {(userDetails?.name == null && 'N/A') || (userDetails.name == '' && 'N/A') || userDetails.name}
          </div>
        </Col>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Mobile No.: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.phone_no == null && 'N/A') || (userDetails.phone_no == '' && 'N/A') || userDetails.phone_no}
          </div>
        </Col>
        <Col lg={4} className="d-flex align-items-center">
          <h5 className="common-title pt-1 text-nowrap">Email Address:</h5>
          <div className="mx-2 mb-2">{userDetails?.email}</div>
          {userDetails.is_email_verify == false && (
            <Badge pill bg="success" className="me-1 mb-3 pb-1 badge-soft-danger">
              Not Verified
            </Badge>
          )}
          {userDetails.is_email_verify == true && (
            <Badge pill bg="danger" className="me-1 mb-3 pb-1 badge-soft-success">
              Verified
            </Badge>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Social Flag: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.user_social_flag == 0 && 'Email') ||
              (userDetails.user_social_flag == 1 && 'Google') ||
              (userDetails.user_social_flag == 2 && 'Facebook')}
          </div>
        </Col>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Gender: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.gender == null && 'N/A') ||
              (userDetails.gender == '' && 'N/A') ||
              (userDetails.gender == 'M' && 'Male') ||
              (userDetails.gender == 'F' && 'Female') ||
              userDetails.gender}
          </div>
        </Col>
        <Col lg={4} className="d-flex align-items-center">
          <h5 className="me-2 f common-title pt-1">Date Of Birth: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.date_of_birth == null && 'N/A') ||
              (userDetails.date_of_birth == '' && 'N/A') ||
              moment(userDetails.date_of_birth).format('MMM DD, YYYY')}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="me-2 f common-title pt-1">Country: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.country == null && 'N/A') || (userDetails.country == '' && 'N/A') || userDetails.country}
          </div>
        </Col>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">State: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.state == null && 'N/A') || (userDetails.state == '' && 'N/A') || userDetails.state}
          </div>
        </Col>
        <Col lg={4} className="d-flex align-items-center">
          <h5 className="common-title pt-1">City:</h5>
          <div className="ms-2 mb-1">
            {(userDetails.city == null && 'N/A') || (userDetails.city == '' && 'N/A') || userDetails.city}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Pincode: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.pincode == null && 'N/A') || (userDetails.pincode == '' && 'N/A') || userDetails.pincode}
          </div>
        </Col>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Industry: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.industry == null && 'N/A') || (userDetails.industry == '' && 'N/A') || userDetails.industry}
          </div>
        </Col>
        <Col lg={4} className="d-flex align-items-center">
          <h5 className="me-2 f common-title pt-1">Occupation: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.occupation == null && 'N/A') ||
              (userDetails.occupation == '' && 'N/A') ||
              userDetails.occupation}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Annual Income: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.annual_income == null && 'N/A') ||
              (userDetails.annual_income == '' && 'N/A') ||
              userDetails.annual_income}
          </div>
        </Col>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Android app version: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.user_android_app_version == null && 'N/A') ||
              (userDetails.user_android_app_version == '' && 'N/A') ||
              userDetails.user_android_app_version}
          </div>
        </Col>
        <Col lg={4} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Ios app version: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.user_ios_app_version == null && 'N/A') ||
              (userDetails.user_ios_app_version == '' && 'N/A') ||
              userDetails.user_ios_app_version}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Referral Code: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.my_referral_code == null && 'N/A') ||
              (userDetails.my_referral_code == '' && 'N/A') ||
              userDetails.my_referral_code}
          </div>
        </Col>
        <Col lg={3} className="d-flex align-items-center">
          <h5 className="common-title pt-1">Active User: </h5>
          <div className="ms-2 mb-1">
            {(userDetails.my_referral_code == '' && 'N/A') || userDetails.is_active ? 'Yes' : 'No'}
          </div>
        </Col>
        <Col lg={4} className="d-flex align-items-center">
          <h5 className="common-title pt-1">User Id: </h5>
          <div className="ms-2 mb-2">
            {(userDetails.user_id == null && 'N/A') || (userDetails.user_id == '' && 'N/A') || userDetails.user_id}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PersonalDetailsTab;
