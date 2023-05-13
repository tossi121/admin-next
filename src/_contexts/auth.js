// import { userDetails } from '_services/resources';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useContext, createContext } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(true);
//   const [roleAndPermission, setRoleAndPermission] = useState('');
//   const [showAlert, setShowAlert] = useState(false);
//   const [userAllDetails, setUserAllDetails] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [paginationLimit, setPaginationLimit] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get('access_token');
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//       router.push('/');
//     }
//   }, [userAllDetails, roleAndPermission]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       getUserData();
//     }
//   }, [isLoggedIn]);

//   // for get role type
//   useEffect(() => {
//     const userRole = localStorage.getItem('user_role_type');
//     if (userRole) {
//       setUserRole(userRole);
//     }
//   }, [roleAndPermission, roleAndPermission?.role_type]);

//   async function getUserData() {
//     const response = await userDetails();
//     if (response.status) {
//       if (response?.data) {
//         setUserAllDetails(response.data);
//         setRoleAndPermission(response.data.role[0]);
//         localStorage.setItem('user_role_type', response.data.role[0]?.role_type);
//       } else {
//         setUserAllDetails(null);
//         setIsLoggedIn(false);
//         Cookies.remove('access_token');
//         router.push('/');
//       }
//     } else {
//       setUserAllDetails(null);
//       setRoleAndPermission('');
//       setIsLoggedIn(false);
//       Cookies.remove('access_token');
//       router.push('/');
//     }
//   }

//   function logoutUser() {
//     Cookies.remove('access_token');
//     setRoleAndPermission('');
//     setUserAllDetails('');
//     setIsLoggedIn(false);
//     localStorage.removeItem('user_role_type');
//     router.push('/');
//   }

//   // for ADD Match Permission
//   const isAddMatch = roleAndPermission?.permissions?.find((item) => item.permission_type === 'ADD_MATCH')
//     ?.role_and_permission?.is_allowed;

//   // permission For User
//   const isAddUserAllowed = roleAndPermission?.permissions?.find((item) => item.permission_type === 'ADD_USER')
//     ?.role_and_permission?.is_allowed;
//   const isViewUserAllowed = roleAndPermission?.permissions?.find((item) => item.permission_type === 'VIEW_USER')
//     ?.role_and_permission?.is_allowed;
//   const isUpdateUserAllowed = roleAndPermission?.permissions?.find((item) => item.permission_type === 'UPDATE_USER')
//     ?.role_and_permission?.is_allowed;
//   const isDeleteUserAllowed = roleAndPermission?.permissions?.find((item) => item.permission_type === 'DELETE_USER')
//     ?.role_and_permission?.is_allowed;

//   //  permission For Facility
//   const isAddFacility = roleAndPermission?.permissions?.find((item) => item.permission_type === 'ADD_FACILITY')
//     ?.role_and_permission?.is_allowed;

//   // console.log('isAddFacility', isAddFacility);
//   const isViewFacility = roleAndPermission?.permissions?.find((item) => item.permission_type === 'VIEW_FACILITIES')
//     ?.role_and_permission?.is_allowed;
//   const isUpdateFacility = roleAndPermission?.permissions?.find((item) => item.permission_type === 'UPDATE_FACILITY')
//     ?.role_and_permission?.is_allowed;
//   const isDeleteFacility = roleAndPermission?.permissions?.find((item) => item.permission_type === 'DELETE_FACILITY')
//     ?.role_and_permission?.is_allowed;

//   // permission for Slots
//   const isAddSlot = roleAndPermission?.permissions?.find((item) => item.permission_type === 'ADD_SLOT')
//     ?.role_and_permission?.is_allowed;
//   const isUpdateSlot = roleAndPermission?.permissions?.find((item) => item.permission_type === 'UPDATE_SLOT')
//     ?.role_and_permission?.is_allowed;
//   const isViewSlot = roleAndPermission?.permissions?.find((item) => item.permission_type === 'VIEW_SLOT')
//     ?.role_and_permission?.is_allowed;
//   const isDeleteSlot = roleAndPermission?.permissions?.find((item) => item.permission_type === 'DELETE_SLOT')
//     ?.role_and_permission?.is_allowed;

//   //  permission for Book Slots
//   const isBookSlot = roleAndPermission?.permissions?.find((item) => item.permission_type === 'BOOK_SLOT')
//     ?.role_and_permission?.is_allowed;
//   const isViewBooking = roleAndPermission?.permissions?.find((item) => item.permission_type === 'VIEW_BOOKINGS')
//     ?.role_and_permission?.is_allowed;
//   const isUpdateBooking = roleAndPermission?.permissions?.find((item) => item.permission_type === 'UPDATE_BOOKINGS')
//     ?.role_and_permission?.is_allowed;
//   const isCancelBooking = roleAndPermission?.permissions?.find((item) => item.permission_type === 'CANCEL_BOOKINGS')
//     ?.role_and_permission?.is_allowed;

//   //  permission for dashboard home booking
//   const isViewTotalBooking = roleAndPermission?.permissions?.find(
//     (item) => item.permission_type === 'VIEW_TOTAL_BOOKINGS'
//   )?.role_and_permission?.is_allowed;
//   const isViewUpcomingBooking = roleAndPermission?.permissions?.find(
//     (item) => item.permission_type === 'VIEW_UPCOMING_BOOKINGS'
//   )?.role_and_permission?.is_allowed;
//   const isViewTodayBooking = roleAndPermission?.permissions?.find(
//     (item) => item.permission_type === 'VIEW_TODAY_BOOKINGS'
//   )?.role_and_permission?.is_allowed;
//   const isViewCompleteBooking = roleAndPermission?.permissions?.find(
//     (item) => item.permission_type === 'VIEW_COMPLETED_BOOKINGS'
//   )?.role_and_permission?.is_allowed;

//   // permission for Tournament
//   const isUpdateTournament = roleAndPermission?.permissions?.find(
//     (item) => item.permission_type === 'UPDATE_TOURNAMENT'
//   )?.role_and_permission?.is_allowed;

//   return (
//     <AuthContext.Provider
//       value={{
//         getUserData,
//         isLoggedIn,
//         logoutUser,
//         setRoleAndPermission,
//         roleAndPermission,
//         setIsLoaded,
//         isLoaded,
//         setShowAlert,
//         showAlert,
//         isAddUserAllowed,
//         isViewUserAllowed,
//         isUpdateUserAllowed,
//         isDeleteUserAllowed,
//         isAddFacility,
//         isViewFacility,
//         isUpdateFacility,
//         isDeleteFacility,
//         isViewTotalBooking,
//         isViewUpcomingBooking,
//         isViewTodayBooking,
//         isViewCompleteBooking,
//         isBookSlot,
//         isUpdateBooking,
//         isCancelBooking,
//         isAddSlot,
//         isUpdateSlot,
//         isViewSlot,
//         isDeleteSlot,
//         isUpdateTournament,
//         userAllDetails,
//         userRole,
//         setUserRole,
//         isAddMatch,
//         setPaginationLimit,
//         paginationLimit,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
