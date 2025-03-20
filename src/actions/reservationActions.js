import axios from 'axios';
import {
  RESERVATIONS_REQUEST,
  RESERVATIONS_SUCCESS,
  RESERVATIONS_FAIL,
} from '../types/reservationTypes';

export const fetchReservations = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RESERVATIONS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/reservations/myreservations', config);

    dispatch({
      type: RESERVATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESERVATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
