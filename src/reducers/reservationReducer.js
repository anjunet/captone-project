import {
    RESERVATIONS_REQUEST,
    RESERVATIONS_SUCCESS,
    RESERVATIONS_FAIL,
  } from '../types/reservationTypes';
  
  export const reservationListReducer = (state = { reservations: [] }, action) => {
    switch (action.type) {
      case RESERVATIONS_REQUEST:
        return { loading: true, reservations: [] };
      case RESERVATIONS_SUCCESS:
        return { loading: false, reservations: action.payload };
      case RESERVATIONS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  