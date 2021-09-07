import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Map from './components/googleMap/Map';
//Landing-Login routes
import CarOwnerLogin from './components/auth/CarOwnerLogin';
import StationOwnerLogin from './components/auth/StationOwnerLogin';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import {loadStationOwner, loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import UserProfile from "./components/profiles/UserProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Statistics from "./components/statistics/statistics";
import Stats from "./components/statistics/statisticsParams";
import StationOwnerProfile from "./components/profiles/StationOwnerProfile";
import StationStats from "./components/statistics/stationStatisticsParams";
import StationStatistics from "./components/statistics/stationStatistics";
import Checkout from './components/paypal/Checkout'
//             <PrivateRoute exact path='/station_owner_profile' component={StationOwnerProfile} />
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if(localStorage.isAdmin)
      store.dispatch(loadStationOwner());
    else {store.dispatch(loadUser());}
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <PrivateRoute exact path='/station_owner_profile' component={StationOwnerProfile} />
            <PrivateRoute exact path='/user_profile' component={UserProfile} />
            <PrivateRoute exact path='/stationStatisticsParams' component={StationStats} />
            <PrivateRoute exact path='/statisticsParams' component={Stats} />
            <PrivateRoute exact path='/statistics' component={Statistics} />
            <PrivateRoute exact path='/stationStatistics' component={StationStatistics} />
            <PrivateRoute exact path='/google_map' component= {Map} />
            <PrivateRoute exact path='/paypal_payment' component={Checkout}/>
          </Switch>
          <section>
            <Alert />
            <Switch>
              <Route exact path='/car_owner_login' component={CarOwnerLogin} />
              <Route exact path='/station_owner_login' component={StationOwnerLogin}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
