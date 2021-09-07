import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED, CLEAR_PROFILE,STATION_OWNER_LOADED,LOGIN_SUCCESS_STATION
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  isStationOwner : false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED: {
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,

      };
    }
    case STATION_OWNER_LOADED: {
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isStationOwner: true
      };
    }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_SUCCESS_STATION:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('isAdmin' , true);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };


    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user : null,
        isStationOwner : false
      };


    default:
      return state;
  }
}
