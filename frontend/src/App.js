import React from 'react';
import Navigation from './components/Navigation';
import RestaurantPage from './components/RestaurantPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id='page-container'>
        <Navigation /> {/* Render the NavigationBar component */}
        <Switch>
          {/* Define your regular routes */}
          {/* <Route exact path="/" component={Home} /> */}
          {/* ... other routes ... */}
          
          {/* Wildcard route for handling invalid routes */}
          <Route path="/restaurants/:id">
            <RestaurantPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
  </Router>
  );
}

export default App;
