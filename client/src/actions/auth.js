import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_STATS,
  STATS_ERROR,
  CLEAR_STATS,
  STATION_OWNER_LOADED,
  LOGIN_SUCCESS_STATION,
  GET_STATION_STATS,
  STATION_STATS_ERROR, CLEAR_STATION_STATS, GET_MAPS, MAPS_ERROR
} from './types';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      'https://localhost:8765/evcharge/api/login/user/me'
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loadStationOwner = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
        'https://localhost:8765/evcharge/api/login/stationowner/me'
    );
    dispatch({
      type: STATION_OWNER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};


export const getMaps = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try{
    const res = await axios.get(
        'https://localhost:8765/evcharge/api/login/getStations',
        null , config);

    dispatch({
      type: GET_MAPS,
      payload : res.data
    });


  } catch(err){
    dispatch({
      type: MAPS_ERROR
    });

  }};



export const getUserStatistics = (vehiclePlates , date_from , date_to) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
try{
  const res = await axios.get(
      'https://localhost:8765/evcharge/api/SessionsPerEV/' +
      vehiclePlates + '/' + date_from + '/' + date_to,
      null , config);

  dispatch({
    type: GET_STATS,
    payload : res.data
  })

} catch(err){

  dispatch(setAlert("No results.", 'danger'));
  dispatch({
    type: STATS_ERROR
  });

}};


export const getStationOwnerStatistics = (station , date_from , date_to) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try{
    const res = await axios.get(
        'https://localhost:8765/evcharge/api/SessionsPerStation/' +
        station + '/' + date_from + '/' + date_to,
        null , config);

    dispatch({
      type: GET_STATION_STATS,
      payload : res.data
    })

  } catch(err){

    dispatch(setAlert("No results.", 'danger'));
    dispatch({
      type: STATION_STATS_ERROR
    });

  }};





export const loginCarUser = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      'https://localhost:8765/evcharge/api/login/' +
        username +
        '/' +
        password +
        '/false',
      null,
      config
    );
    dispatch(setAlert("Successful Login!", 'success'));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

  } catch (err) {
    dispatch(setAlert("Login Fail. Try again!", 'danger'));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};


//Login Station Owner
export const loginStationOwner = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };



  try {
    const res = await axios.post(
      'https://localhost:8765/evcharge/api/login/' +
        username +
        '/' +
        password +
        '/true',
      null,
      config
    );
    dispatch(setAlert("Successful Login!", 'success'));
    dispatch({
      type: LOGIN_SUCCESS_STATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Login Fail. Try again!", 'danger'));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch(setAlert("Successful Logout!", 'success'));
  dispatch({ type: CLEAR_STATION_STATS });
  dispatch({ type: CLEAR_STATS });
  dispatch({ type: LOGOUT });
};

