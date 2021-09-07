import React , {Fragment , useState } from 'react';
import {connect} from 'react-redux';
import {Link , Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import {loginStationOwner} from '../../actions/auth';



 const Login = ( { loginStationOwner , isAuthenticated}) => {

    const [formData , setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange =  e => setFormData({...formData , [e.target.name] : e.target.value});

    const onSubmit  = async e =>{
        e.preventDefault()
        loginStationOwner(username,password)

    }
     if(isAuthenticated){
         return <Redirect to="/station_owner_profile"/>
     }
    return (
        <Fragment>
             <div className="container">
      <h1 className="large text-primary">Station Owner Login</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value = {username}
            onChange={e => onChange(e)}
            name="username"
             />
        </div>


        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value = {password}
            onChange={e => onChange(e)}
            name="password"

          />
        </div>
          <div className='btn-new'>
          <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        
      </form>
    </div>
        </Fragment>

    )
}
Login.propTypes = {
    loginStationOwner: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{ loginStationOwner })(Login)

