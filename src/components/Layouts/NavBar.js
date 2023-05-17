import { faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';

export const navbarData = [
  {
    menu: 'User Management',
    icon: faUser,
    subMenu: [
      { text: 'All Users', url: '/user-management' },
      { text: 'Queries', url: '/user-management/queries' },
      { text: 'Orders', url: '/user-management/orders' },
      { text: 'Reviews', url: '/user-management/reviews' },
      { text: 'Active Prime Users', url: '/user-management/active-prime-user' },
    ],
    isOpen: true,
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
];
