import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import maps from './maps';
import statistics from "./statistics";
import stationStatistics from "./stationStatistics";

export default combineReducers({
  alert,
  auth,
  statistics,
  stationStatistics,
  maps
});
