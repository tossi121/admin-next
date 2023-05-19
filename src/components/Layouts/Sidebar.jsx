import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { navbarData } from './NavBar';

function Sidebar(props) {
  const { toggle, toggleMenu, toggleResponsive } = props;
  const [menuItems, setMenuItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // This effect runs only once, when the component mounts.
    // The empty dependency array [] ensures that it doesn't run again unless the dependencies change.

    const activeMenuIndex = getActiveMenuIndex();
    // Calls a function `getActiveMenuIndex()` to get the index of the active menu item.

    if (activeMenuIndex !== null) {
      // Checks if an active menu index is found (not null).

      const initialMenuItems = navbarData.map((item, index) => ({
        ...item,
        isOpen: index === activeMenuIndex,
      }));
      // Creates a new array `initialMenuItems` based on `navbarData` array.
      // Each item in `initialMenuItems` is a copy of the corresponding item from `navbarData`,
      // with an additional property `isOpen` set to `true` only for the active menu item.

      setMenuItems(initialMenuItems);
      // Sets the state variable `menuItems` with the newly created `initialMenuItems` array.

      setExpandedId(activeMenuIndex);
      // Sets the state variable `expandedId` to the active menu index.
    } else {
      // If no active menu item is found (activeMenuIndex is null), execute the following:

      // Handle the case when no active menu item is found
      // Set the initial state accordingly
      setMenuItems([...navbarData]);
      // Resets the state variable `menuItems` to a shallow copy of `navbarData` array.

      setExpandedId(null);
      // Resets the state variable `expandedId` to null.
    }
  }, []);

  const toggleSubmenu = (index) => {
    const updatedMenuItems = menuItems.map((menuItem, i) => {
      return {
        ...menuItem,
        isOpen: i === index ? !menuItem.isOpen : false,
      };
    });
    // Creates a new array `updatedMenuItems` by mapping over the `menuItems` array.
    // For each item in `menuItems`, a new object is created with the spread operator (`...menuItem`).
    // The `isOpen` property of the new object is set based on the condition:
    // If the current index `i` matches the provided `index`, toggle the value of `isOpen`.
    // Otherwise, set `isOpen` to false.

    setMenuItems(updatedMenuItems);
    // Updates the state variable `menuItems` with the newly created `updatedMenuItems` array.

    setExpandedId(index);
    // Updates the state variable `expandedId` with the provided `index`.
  };

  const getActiveMenuIndex = () => {
    const activeMenu = navbarData.find((item) => isActivePage(item.subMenu[0].url));
    // Uses the `find` method on the `navbarData` array to search for an item where the first submenu URL matches the active page.
    // The condition `isActivePage(item.subMenu[0].url)` is used to determine if the submenu URL matches the active page.
    // It is assumed that `isActivePage` is a separate function that checks if a given URL corresponds to the active page.

    return activeMenu ? navbarData.indexOf(activeMenu) : null;
    // If an active menu is found, the index of that menu item in the `navbarData` array is returned.
    // Otherwise, `null` is returned to indicate that no active menu item was found.
  };

  const isActivePage = (url) => {
    // Compares the provided `url` with the `pathname` property of the `router` object.

    return router.pathname === url;
    // Returns `true` if the `router.pathname` matches the provided `url`,
    // indicating that the current page matches the given URL.
    // Otherwise, returns `false`, indicating that the current page does not match the URL.
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
              <li key={index} className={`ms-2 nav-item position-relative`}>
                <div
                  className={`nav-link fw-500 base-color-3 d-flex align-items-center cursor-pointer  ${
                    expandedId === index ? 'active' : ''
                  } ${toggle || 'px-0'} `}
                  onClick={() => toggleSubmenu(index)}
                >
                  <FontAwesomeIcon icon={menuItem.icon} width={16} height={16} className="me-2" />
                  {toggle && (
                    <>
                      <span className="ms-1 text-nowrap fs-16">{menuItem.menu}</span>
                      <button className={`border-0 ms-auto bg-white ${expandedId === index ? 'active' : ''}`}>
                        {menuItem.isOpen ? (
                          <FontAwesomeIcon width={15} height={15} icon={faAngleDown} />
                        ) : (
                          <FontAwesomeIcon width={15} height={15} icon={faAngleRight} />
                        )}
                      </button>
                    </>
                  )}
                </div>

                <div className={`sub-menu ${menuItem.isOpen ? 'open' : ''}`}>
                  {toggle && menuItem.isOpen && (
                    <ul className={`list-unstyled w-100 ${expandedId === index ? 'open' : ''}`}>
                      {menuItem.subMenu.map((subMenuItem, subIndex) => (
                        <li key={subIndex} className={`w-100 d-flex ${expandedId === index ? 'open' : ''}`}>
                          <Link
                            href={subMenuItem.url}
                            className={`mb-2 ms-custom w-100 base-color-3 ${
                              isActivePage(subMenuItem.url) ? 'active' : ''
                            }`}
                          >
                            {subMenuItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
