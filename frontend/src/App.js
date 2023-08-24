import React from 'react';
import Navigation from './components/Navigation';
import RestaurantPage from './components/RestaurantPage';
import ReservationForm from './components/ReservationForm';
import ReservationPage from './components/ReservationPage';
import RestaurantIndex from './components/RestaurantIndex';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SearchSplash from './components/SearchSplash';
import RestaurantCarousel from './components/RestaurantCarousel';
import Footer from './components/Footer';
import ModifyReservationPage from './components/ModifyReservationPage';
import ModifyReservationForm from './components/ModifyReservationForm';

function App() {
  return (
    <Router>
      <div id='page-container'>
        <Navigation />
        <Switch>
          <Route path="/restaurants/:id/create">
            <ReservationForm />
          </Route>
          <Route path="/restaurants/:id">
            <RestaurantPage />
          </Route>
          <Route path="/reservations/:id/modify">
            <ModifyReservationPage />
          </Route>
          <Route path="/reservations/:id/modify-form">
            <ModifyReservationForm />
          </Route>
          <Route path="/reservations/:id">
            <ReservationPage />
          </Route>
          <Route path="/">
            <SearchSplash />
            <RestaurantCarousel />
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
