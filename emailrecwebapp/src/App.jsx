import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './login';
import AccountSection from './account';
import Preferences from './preferences'; 
import Dashboard from './Dashboard';
import Profile from '/profile';



import { auth } from './firebase';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.currentUser && paths.includes(props.location.pathname) ?  (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute paths={["/account" ]} component={AccountSection} />
        <PrivateRoute paths={['/preferences']} component={Preferences} />
        <PrivateRoute paths={['/Dashboard']} component={Dashboard} />
        <PrivateRoute paths={['/profile']} component={Profile} />


      </Switch>
    </Router>
  );
}

export default App;
