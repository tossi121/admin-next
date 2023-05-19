import { faChartLine, faCircleExclamation, faFileLines, faGear, faHandshake, faPieChart, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export const navbarData = [
  {
    menu: 'User Management',
    icon: faUserGroup,
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
    subMenu: [{ text: 'Manage Terms', url: 'terms/manage-terms' }],
  },
  {
    menu: 'Profiles',
    icon: faUser,
    subMenu: [{ text: 'Indian Stocks Profile', url: '/profile/indianstockprofile' }],
  },
  {
    menu: 'Broker',
    icon: faHandshake,
    subMenu: [
      { text: 'Broker Review List', url: '/broker/review-list' },
      { text: 'Latest A/C Open Enq', url: '/broker/open-enquiry' },
      { text: 'Compare Broker', url: '/broker/compare-broker' },
    ],
  },
  {
    menu: 'Plans',
    icon: faFileLines,
    subMenu: [{ text: 'Manage Plans', url: '/plan/manage-plan' }],
  },
  {
    menu: 'Settings',
    icon: faGear,
    subMenu: [
      { text: 'Nifty Alert', url: '/settings/nifty-alert' },
      { text: 'Update Disclaimer', url: '/settings/update-disclaimer' },
      { text: 'Update App Version', url: '/settings/update-app-version' },
      { text: 'Promo Code', url: '/settings/promo-code' },
      { text: 'General Promo Code', url: '/settings/genral-promo' },
      { text: 'Global Setting', url: '/settings/global-setting' },
    ],
    subMenu: [{ text: 'Nifty Alert', url: '/settings/nifty-alert' },
    { text: 'Update Disclaimer', url: '/settings/update-disclaimer' },
    { text: 'Update App Version', url: '/settings/update-app-version' },
    { text: 'Promo Code', url: '/settings/promo-code' },
    { text: 'General Promo Code', url: '/settings/genral-promo' },
    { text: 'Global Setting', url: '/settings/global-setting' }],
  },
  {
    menu: 'Screener',
    icon: faPieChart,
    subMenu: [{ text: 'Predefine Groups', url: '/screener/screener-group' },],
  },
];
