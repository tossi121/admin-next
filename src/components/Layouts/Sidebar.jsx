import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState } from 'react';
import { navbarData } from './NavBar';

function Sidebar(props) {
  const { toggle, toggleMenu, toggleResponsive } = props;
  const [menuItems, setMenuItems] = useState([...navbarData]);
  const [expandedId, setExpandedId] = useState(null);

  const toggleSubmenu = (index) => {
    // Create a new array of menu items by mapping over the existing menuItems array
    const updatedMenuItems = menuItems.map((menuItem, i) => {
      return {
        ...menuItem,
        isOpen: i === index ? !menuItem.isOpen : false, // Toggle the isOpen property for the selected menu item
      };
    });

    // Update the menuItems state with the updated array
    setMenuItems(updatedMenuItems);

    // Set the expandedId state to the index of the selected menu item
    setExpandedId(index);
  };

  const router = useRouter();
  const isActivePage = (url) => {
    return router.pathname === url;
  };

  return (
    <>
      <section
        className={`sidebar-section bg-white border border-top-0 position-fixed ${toggle || 'sidebar-sm'} ${
          toggleResponsive ? 'hide-sidebar' : 'full-width'
        }`}
      >
        {toggle && (
          <div className="position-absolute logo-icon">
            <Link href={'/'}>
              <Image src="/images/logo.svg" alt="logo" className="ms-3" width={160} height={65} />
            </Link>
          </div>
        )}

        {!toggle && (
          <div className="position-absolute logo-icon-sm">
            <Link href={'/'}>
              <Image src="/logo-icon.png" alt="logo" className="ms-3" width={30} height={30} />
            </Link>
          </div>
        )}

        <div className="menu-wrapper position-relative vh-100">
          <span
            className="btn-expanded position-absolute justify-content-center p-2 bg-white d-lg-flex d-none cursor-pointer"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} width={25} className="fs-20" />
          </span>

          <ul className="navbar-nav px-3">
            {menuItems.map((menuItem, index) => (
              <li key={index} className={`nav-item position-relative`}>
                <div
                  className={`nav-link fw-500 base-color-3 d-flex align-items-center cursor-pointer  ${
                    expandedId === index ? 'active' : ''
                  }`}
                  onClick={() => toggleSubmenu(index)}
                >
                  <FontAwesomeIcon icon={menuItem.icon} width={15} height={15} className="fs-14 me-2" />
                  {toggle && (
                    <>
                      <span className="ms-1 text-nowrap">{menuItem.menu}</span>
                      <button className={`border-0 ms-auto bg-white ${expandedId === index ? 'active' : ''}`}>
                        {menuItem.isOpen ? (
                          <FontAwesomeIcon width={18} height={18} className="fs-12" icon={faAngleDown} />
                        ) : (
                          <FontAwesomeIcon width={18} height={18} className="fs-12" icon={faAngleRight} />
                        )}
                      </button>
                    </>
                  )}
                </div>

                {toggle && menuItem.isOpen && (
                  <div className={`sub-menu ${expandedId === index ? 'open' : ''}`}>
                    <ul className={`list-unstyled w-100 ${expandedId === index ? 'open' : ''}`}>
                      {menuItem.subMenu.map((subMenuItem, subIndex) => (
                        <li key={subIndex} className={`w-100 d-flex ${expandedId === index ? 'open' : ''}`}>
                          <Link
                            href={subMenuItem.url}
                            className={`mb-2 ms-5 w-100 base-color-3 ${isActivePage(subMenuItem.url) ? 'active' : ''}`}
                          >
                            {subMenuItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
