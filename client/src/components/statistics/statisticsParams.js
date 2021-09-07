import React , {Fragment , useState } from 'react';
import {Link , Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUserStatistics} from '../../actions/auth';




const Stats = ( { getUserStatistics , statistics , auth : {user}}) => {

    const [formData , setFormData] = useState({
        vehiclePlates: '',
        date_from : '',
        date_to : ''
    });

    const { vehiclePlates , date_from , date_to } = formData;

    const onChange =  e => setFormData({...formData , [e.target.name] : e.target.value});

    function myTrim(x){
        x = x.split('-')
        return x[0] + x[1] + x[2]
    }

    const onSubmit  = async e =>{
        e.preventDefault()
        getUserStatistics(vehiclePlates , myTrim(date_from) , myTrim(date_to))
    }
    if(statistics.statistics){
        return <Redirect to="/statistics"/>
    }
    return (
        <Fragment>
    
            <section className="container-params">
                <h1 className="large text-primary">See your vehicles statistics</h1>
                <p className="lead"><i className="fas fa-user"></i> Enter wanted Period Time and Vehicle Id</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <select name='vehiclePlates' value = {vehiclePlates} onChange={e => onChange(e)}>
                            <option value='0'>*Select your vehicle</option>
                             {user && user.vehicles.map((item,index) => {
                                return(
                                   <option key={index} value={item}> {item}  </option>
                                )
                            })}
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
Stats.propTypes = {
    getUserStatistics: PropTypes.func.isRequired,
    statistics: PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    statistics : state.statistics,
    auth  : state.auth

})


export default connect(mapStateToProps,{ getUserStatistics })(Stats)

