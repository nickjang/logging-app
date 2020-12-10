import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../Components/Utils/PrivateRoute';
import PublicOnlyRoute from '../Components/Utils/PublicOnlyRoute';
import Header from '../Components/Header/Header';
import Overview from '../Pages/Overview/Overview';
import Start from '../Pages/Start/Start';
import SignUp from '../Pages/SignUp/SignUp';
import Login from '../Pages/Login/Login';
import Log from '../Pages/Log/Log';
import View from '../Pages/View/View';
import Settings from '../Pages/Settings/Settings';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import IdleService from '../services/idle-service';
import './App.css';
import '../assets/styles/base.css'
// no context or complex functionality because API
// reuasability
// add checkpoints
// prebuilt components: React calendar/datepicker
class App extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidMount() {
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  render() {
    return (
      <>
        <Header />
        <main className='App' >
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <PrivateRoute exact path='/' component={Log} />
            <PublicOnlyRoute path='/overview' component={Overview} />
            <PublicOnlyRoute path='/getting-started' component={Start} />
            <PublicOnlyRoute path='/sign-up' component={SignUp} />
            <PublicOnlyRoute path='/login' component={Login} />
            <PrivateRoute path='/view' component={View} />
            <PrivateRoute path='/settings' component={Settings} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;