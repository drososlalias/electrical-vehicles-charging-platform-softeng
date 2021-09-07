import {GET_MAPS, MAPS_ERROR ,CLEAR_MAPS} from "../actions/types";

const initialState = {
    maps_locations : null,
    loading: true ,
    error : {}
}

export default function ( state = initialState , action) {
    const {type , payload} = action;
    switch (type) {
        case GET_MAPS:
            return {
                ...state,
                maps_locations : payload,
                loading : false
            }
        case MAPS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_MAPS:
            return {
                ...state,
                maps_locations : null,
                loading: false
            }
        default:
            return state;
    }
}