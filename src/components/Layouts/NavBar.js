import { faChartLine, faCircleExclamation, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export const navbarData = [
  {
    menu: 'User Management',
    icon: faUserGroup,
    isOpen: true,
    subMenu: [
      { text: 'All Users', url: '/user-management' },
      { text: 'Queries', url: '/user-management/queries' },
      { text: 'Orders', url: '/user-management/orders' },
      { text: 'Reviews', url: '/user-management/reviews' },
      { text: 'Active Prime Users', url: '/user-management/active-prime-user' },
    ],
  },
  {
    menu: 'Stock List',
    icon: faChartLine,
    subMenu: [
      { text: 'Stock Analysis', url: '/stock-list/stock-analysis' },
      { text: 'F&O Stocks', url: '/stock-list/fno-list' },
      { text: 'Nifty50 Stocks', url: '/stock-list/nifty50' },
    ],
  },
  {
    menu: 'Terms',
    icon: faCircleExclamation,
    subMenu: [{ text: 'Manage Terms', url: '/manage-terms' }],
  },
  {
    menu: 'Profiles',
    icon: faUser,
    subMenu: [{ text: 'Indian Stocks Profile', url: '/profile/indianstockprofile' }],
  },
  {
    menu: 'Broker',
    icon: faCircleExclamation,
    subMenu: [
      { text: 'Broker Review List', url: '/broker/review-list' },
      { text: 'Latest A/C Open Enq', url: '/broker/open-enquiry' },
      { text: 'Compare Broker', url: '/broker/compare-broker' },
    ],
  },
];
