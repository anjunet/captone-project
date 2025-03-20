import { configureStore } from '@reduxjs/toolkit';
import listingListReducer from './reducers/listingReducer';
import { modalReducer } from './reducers/modalReducer';
import { userLoginReducer } from './reducers/userReducer';
import { reservationListReducer } from './reducers/reservationReducer'; 
import { thunk } from 'redux-thunk'; 

// Get user info from local storage
const userInfoFromLS = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state for the Redux store
const initialState = {
  userLogin: { userInfo: userInfoFromLS },
};

// Create the Redux store with DevTools extension support and thunk middleware
const Store = configureStore({
  reducer: {
    listingList: listingListReducer,
    modal: modalReducer,
    userLogin: userLoginReducer,
    reservationList: reservationListReducer, 
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), 
});

export default Store;
