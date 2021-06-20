import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes-nav/Routes';
import MovieContext from './MoviesContext';

import './App.css';
function App() {
	const [ movies, setMovies ] = useState([]);
	const [ totalPages, setTotalPages ] = useState();
	return (
		<BrowserRouter>
			<div className='App-grid'>
				<MovieContext.Provider value={{ movies, setMovies, totalPages, setTotalPages }}>
					<Routes />
				</MovieContext.Provider>
			</div>
		</BrowserRouter>
	);
}

export default App;
