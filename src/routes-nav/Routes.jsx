import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MovieApp from '../components/MovieApp';
import Movie from '../components/Movie';
const Routes = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<MovieApp />
			</Route>
			<Route exact path='/movies/:id'>
				<Movie />
			</Route>
			<Redirect to='/' />
		</Switch>
	);
};
export default Routes;
