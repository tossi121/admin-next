import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Sidebar(props) {
  const { toggle, ToggleFun, toggleResponsive } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Add your link items here
  const links = [
    { text: 'All Users', url: '/user-management' },
    { text: 'Queries', url: '/user-management/queries' },
    { text: 'Orders', url: '/user-management/orders' },
    { text: 'Reviews', url: '/user-management/reviews' },
    { text: 'Active Prime Users', url: '/user-management/active-prime-user' },
  ];

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (linksView) {
  //     setIsOpen(!open);
  //   }
  // }, [isOpen]);

  return (
    <>
      <section
        className={`sidebar-section bg-white border border-top-0 position-fixed ${toggle || 'sidebar-sm'} ${
          toggleResponsive ? 'hide-sidebar' : 'full-width'
        }`}
      >
        {(toggle && (
          <div className="position-absolute logo-iconzz">
            <Link href={'/'}>
              <Image src="/images/logo.svg" alt="logo" className="ms-3" width={160} height={65} />
            </Link>
          </div>
        )) || (
          <>
            <div className="position-absolute logo-icon-sm">
              <Link href={'/'}>
                <Image src="/logo-icon.png" alt="logo" className="ms-3" width={30} height={30} />
              </Link>
            </div>
          </>
        )}

        <div className="menu-wrapper position-relative vh-100">
          <span
            className="btn-expanded position-absolute justify-content-center p-2 bg-white d-lg-flex d-none cursor-pointer"
            onClick={ToggleFun}
          >
            <FontAwesomeIcon icon={faBars} width={25} className="fs-20" />
          </span>
          <>
            <ul className={`navbar-nav px-3`}>
              <li className="nav-item position-relative cursor-pointer" onClick={toggleDropdown}>
                <div className="nav-link fw-500 base-color-2 d-flex align-items-center active">
                  <FontAwesomeIcon icon={faUser} width={15} className="fs-14 mx-1" />
                  <span className="ms-1 text-nowrap">User Management</span>

                  <button className="ms-5 border-0 bg-white active">
                    {(isOpen && <FontAwesomeIcon width={18} height={18} className="fs-12" icon={faAngleDown} />) || (
                      <FontAwesomeIcon width={18} height={18} className="fs-12" icon={faAngleRight} />
                    )}
                  </button>
                </div>
              </li>
            </ul>
            {console.log(isOpen)}
            <div className={`${(isOpen && 'sub-menu') || 'h-0'}`}>
              {isOpen && (
                <ul className="list-unstyled w-100">
                  {links.map((link, index) => (
                    <li key={index} onClick={() => setIsOpen(true)} className="w-100 d-flex">
                      <Link
                        href={link.url}
                        className={`mb-2 ms-5 w-100 base-color-3 ${router.pathname === link.url ? 'active' : ''}`}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
