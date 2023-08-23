import React from 'react';
import Navigation from './components/Navigation';
import RestaurantPage from './components/RestaurantPage';
import ReservationPage from './components/ReservationForm';
import RestaurantIndex from './components/RestaurantIndex';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SearchSplash from './components/SearchSplash';
import RestaurantCarousel from './components/RestaurantCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div id='page-container'>
        <Navigation />
        <Switch>
          {/* Define your regular routes */}
          {/* <Route exact path="/" component={Home} /> */}
          {/* ... other routes ... */}
          
          {/* Wildcard route for handling invalid routes */}
          <Route exact path="/">
            <SearchSplash />
            <RestaurantCarousel />
            {/* <RestaurantIndex /> */}
          </Route>
          <Route path="/restaurants/:id">
            <RestaurantPage />
          </Route>
          <Route path="/reservations/:id">
            <ReservationPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </div>
  </Router>
  );
}

export default App;
