import {STATS_ERROR, GET_STATS ,CLEAR_STATS} from "../actions/types";

const initialState = {
    statistics : null,
    loading: true ,
    errors : {}
}

export default function ( state = initialState , action) {
    const {type , payload , formData} = action;
    switch (type) {
        case GET_STATS:
            return {
                ...state,
                statistics: payload,
                loading : false
            }
        case STATS_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            };
        case CLEAR_STATS:
            return {
                ...state,
                statistics : null,
                loading: false
            }
        default:
            return state;
    }
}