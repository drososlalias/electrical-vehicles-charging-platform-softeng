import {STATION_STATS_ERROR, GET_STATION_STATS ,CLEAR_STATION_STATS } from "../actions/types";

const initialState = {
    stationStatistics : null,
    loading: true ,
    errors : {}
}

export default function ( state = initialState , action) {
    const {type , payload , formData} = action;
    switch (type) {
        case GET_STATION_STATS:
            return {
                ...state,
                stationStatistics: payload,
                loading : false
            }
        case STATION_STATS_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            };
        case CLEAR_STATION_STATS:
            return {
                ...state,
                stationStatistics : null,
                loading: false
            }
        default:
            return state;
    }
}