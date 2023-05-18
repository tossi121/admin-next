import { Row, Col, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { faRightToBracket, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import { useAuth } from '_context/authContext';

function Topbar(props) {
  const { getUserData } = useAuth();
  const { ToggleFun } = props;
  const router = useRouter();
  function logout() {
    Cookies.remove('token');
    getUserData();
    router.push('/login');
  }
  return (
    <>
      <div className="w-100 top-bar position-sticky top-0 bg-white">
        <Row className="mx-0 border h-100 align-items-center">
          <Col>
            <div className="text-end me-2">
              <Dropdown>
                <Dropdown.Toggle className="rounded-circle border-0 bg-white" id="dropdown-basic">
                  <FontAwesomeIcon width={15} height={15} icon={faUserAlt} className="base-link-color" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="ps-2" onClick={logout}>
                  <FontAwesomeIcon width={15} height={15} icon={faRightToBracket} className="base-link-color" />
                  <span className="base-link-color ms-2 fw-normal cursor-pointer">Logout</span>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <button className="bg-transparent border-0 web-button pt-2 toggle-btn d-lg-none d-block ms-auto">
              <Image
                src="/images/dashboard-icons/toggle.svg"
                onClick={ToggleFun}
                width={26}
                height={26}
                alt="toggle-img"
              />
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Topbar;
