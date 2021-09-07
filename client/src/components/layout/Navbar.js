import React ,{Fragment}  from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';


 const Navbar = ( {auth: {isAuthenticated, loading , isStationOwner} ,logout }) => {
  const authLinks = (
    <ul>
    <li><Link to='/user_profile'>
        <i className='fas fa-user' /> {' '}
        <span className='hide-sm'>
            Dashboard</span></Link></li>
    <li><Link to='/car_owner_login' onClick={ logout }>
    <i class="fas fa-plug"></i>{' '}
    <span className="hide-sm">Logout</span> 
    </Link>
    </li>
       
  </ul>

  )

     const authLinks1 = (
         <ul>
             <li><Link to='/station_owner_profile'>
                 <i className='fas fa-user' /> {' '}
                 <span className='hide-sm'>
            Dashboard</span></Link></li>
             <li><Link to='/station_owner_login' onClick={ logout }>
                 <i class="fas fa-plug"></i>{' '}
                 <span className="hide-sm">Logout</span>
             </Link>
             </li>

         </ul>

     )
  
  const guestLinks=(
    <ul>

          <li><Link to='/car_owner_login'>Car Owner</Link></li>
          <li><Link to='/station_owner_login'>Station Owner</Link></li>
          
        </ul>

  )
  return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to='/'>
            <i class="fas fa-plug"></i> Tesla Gr
          </Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated  ? (isStationOwner ? authLinks1 : authLinks ): guestLinks}</Fragment>)}

      </nav>
      
    )
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
  auth: state.auth
})
export default connect(mapStateToProps,{logout})(Navbar); 
 