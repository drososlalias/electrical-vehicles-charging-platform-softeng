import React , {Fragment , useState } from 'react';
import {Link , Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getStationOwnerStatistics} from '../../actions/auth';




const StationStats = ( { getStationOwnerStatistics , stationStatistics , auth : {stationowner}}) => {

    const [formData , setFormData] = useState({
        station: '',
        date_from : '',
        date_to : ''
    });

    const { station , date_from , date_to } = formData;

    const onChange =  e => setFormData({...formData , [e.target.name] : e.target.value});

    function myTrim(x){
        x = x.split('-')
        return x[0] + x[1] + x[2]
    }

    const onSubmit  = async e =>{
        e.preventDefault()
        getStationOwnerStatistics(station , myTrim(date_from) , myTrim(date_to))
    }
   // if(statistics.statistics){
   //     return <Redirect to="/statistics"/>
   // }
    if(stationStatistics.stationStatistics){
        return <Redirect to="/stationStatistics"/>
    }
    return (
        <Fragment>
        
            <section className="container-params">
                <h1 className="large text-primary">See your Station statistics</h1><br/>
                <p className="lead"><i className="fas fa-user"></i> Enter wanted Period Time and your Station Id</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <select name='station' value = {station} onChange={e => onChange(e)}>
                            <option value='0'>*Select your Station</option>


                                    <option value={stationowner && stationowner.station}> {stationowner && stationowner.station}  </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            placeholder="Date From"
                            value = {date_from}
                            onChange={e => onChange(e)}
                            name="date_from"

                        />
                        <p6>Enter Date From</p6>
                    </div>

                    <div className="form-group">
                        <input
                            type="date"
                            placeholder="date_to"
                            value = {date_to}
                            onChange={e => onChange(e)}
                            name="date_to"
                        />
                        <p6>Enter Date To</p6>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
            </section>
        </Fragment>

    )
}
StationStats.propTypes = {
    getStationOwnerStatistics: PropTypes.func.isRequired,
    statistics: PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    stationStatistics : state.stationStatistics,
    auth  : state.auth

})


export default connect(mapStateToProps,{ getStationOwnerStatistics })(StationStats)

