import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '_contexts/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faUser } from '@fortawesome/free-solid-svg-icons';

function Sidebar(props) {
  const { toggle, ToggleFun, toggleResponsive, setToggleResponsive } = props;
  const router = useRouter();

  return (
    <>
      <section
        className={`sidebar-section bg-white position-fixed ${toggle || 'sidebar-sm'} ${
          toggleResponsive ? 'hide-sidebar' : 'full-width'
        }`}
      >
        <div className="menu-wrapper position-relative">
          <span
            className={`btn-expanded card-border rounded-circle position-absolute justify-content-center p-2 bg-white d-lg-flex d-none cursor-pointer`}
            onClick={ToggleFun}
          >
            <FontAwesomeIcon icon={faAngleRight} width={16} className={`fs-14 ${toggle ? 'arrow-left-icon' : ''}`} />
          </span>
          <ul className="navbar-nav px-3 py-3 vh-100">
            <li className={`nav-item position-relative`} onClick={() => setToggleResponsive(!toggleResponsive)}>
              <Link href="/user-management">
                <div
                  className={`nav-link fw-500 base-color-2 d-flex align-items-center ${
                    router.pathname === '/user-management' ? 'active' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} width={16} className="fs-14 mx-1" />

                  {(toggle || toggleResponsive) && <span className="ms-1 text-nowrap">User Management</span>}
                </div>
              </Link>
            </li>

            {/* Other list items */}
            {/* 
            <li className="nav-item position-relative" onClick={() => setToggleResponsive(!toggleResponsive)}>
              <Link href="/dashboard/profile">
                <div
                  className={`nav-link fs-16 fw-500 base-color-2 d-flex align-items-center ${
                    router.pathname === '/dashboard/profile' ? 'active' : ''
                  }`}
                >
                  <Image
                    src="/images/dashboard-icons/profiles.svg"
                    width={20}
                    height={20}
                    className="sidebar-icons me-4"
                    alt="sidebar-img"
                  />
                  {(toggle || toggleResponsive) && <span className="text-nowrap">My Profile</span>}
                  {(toggle || toggleResponsive) && <span className="text-nowrap">My Profile</span>}
                </div>
              </Link>
            </li> */}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
