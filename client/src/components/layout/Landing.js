import React from 'react';
import { Link } from 'react-router-dom';
export const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Tesla-lias Gr</h1>
          <p className='lead'>
            Welcome to Tesla-lias Gr <br></br> We are making your car charging
            easier than ever!
          </p>
          <div className='buttons'>
            <Link to='/car_owner_login' className='btn btn-primary'>
              Car Owner
            </Link>
            <Link to='/station_owner_login' className='btn btn-primary'>
              {' '}
              Station Owner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
