import React , {Fragment , useState } from 'react';
import {Link , Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginCarUser} from '../../actions/auth';




 const Login = ( { loginCarUser , isAuthenticated }) => {

    const [formData , setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange =  e => setFormData({...formData , [e.target.name] : e.target.value});

    const onSubmit  = async e =>{
        e.preventDefault()
        loginCarUser(username,password)
    }
     if(isAuthenticated){
         return <Redirect to="/user_profile"/>
     }
    return (
        <Fragment >
             <div className="container">
              <h1 className="large text-primary">Car User Login</h1>
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
    loginCarUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps,{ loginCarUser })(Login)

