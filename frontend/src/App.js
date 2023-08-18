import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation /> {/* Render the NavigationBar component */}
      <Switch>
        {/* Define your regular routes */}
        {/* <Route exact path="/" component={Home} /> */}
        {/* ... other routes ... */}
        
        {/* Wildcard route for handling invalid routes */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
