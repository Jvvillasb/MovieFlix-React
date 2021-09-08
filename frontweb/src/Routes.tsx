import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Auth from './pages/Auth';
import Catalog from './pages/Catalog';
import MovieDetails from './pages/MovieDetails';
import history from './util/history';



const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <PrivateRoute path="/movies" exact={true}>
          <Catalog />
        </PrivateRoute>
        <PrivateRoute path="/movies/:movieId" exact={true}>
          <MovieDetails />
        </PrivateRoute>
       
      </Switch>
    </Router>
  );
}

export default Routes;