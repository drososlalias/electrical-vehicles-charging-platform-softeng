import GoogleMapReact from 'google-map-react';
import LocationMarker from "./LocationMarker";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getMaps} from '../../actions/auth'
import {useEffect} from "react";
import React from 'react'


const Map = ({getMaps , maps : {maps_locations} , center, zoom}) => {
    useEffect(() => {
        getMaps();
    } , []);

    return (
        <div className="map">
            <div className='large text-primary'>Stations near your area!</div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBCFx3z_cW4e3pLpoWYVkUEanbW0yBT13o' }}
                defaultCenter={ center }
                defaultZoom= {zoom}
            >
                {maps_locations && Object.keys(maps_locations).map( (item, index) => {
                return <LocationMarker lat={parseFloat(maps_locations[index].lat)} lng={parseFloat(maps_locations[index].lng)}/>
                })}
            </GoogleMapReact>
        </div>
    )
}

Map.propTypes = {
    getMaps: PropTypes.func.isRequired,
    maps: PropTypes.object.isRequired
};

Map.defaultProps = {
    center: {
        lat: 37.8838,
        lng: 23.9275
    },
    zoom: 10
}

const mapStateToProps = state =>({
    maps: state.maps
})

export default connect(mapStateToProps, {getMaps})(Map)
