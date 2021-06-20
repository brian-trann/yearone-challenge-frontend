import React, { useState, useContext } from 'react';
import MovieContext from '../MoviesContext';
import SearchForm from './SearchForm';
import MovieCard from './MovieCard';
import MovieApi from '../api';
import './MovieApp.css';

const CONTENT = {
	title       : 'Movie App',
	description : 'This is my movie app'
};

const MovieApp = () => {
	const { movies, setMovies, totalPages, setTotalPages } = useContext(MovieContext);
	const [ page, setPage ] = useState(1);
	const [ searchTerm, setSearchTerm ] = useState('');
	const searchForMovie = async (formData) => {
		if (!formData) return;
		const res = await MovieApi.getMoviesByTitle(formData);

		setSearchTerm(formData);
		setTotalPages(res.totalPages);
		setMovies(() => res.movies);
	};
	const handlePaginate = async () => {
		const moreMovies = await MovieApi.getMoviesByTitle(searchTerm, page + 1);
		setMovies((movies) => [ ...movies, ...moreMovies ]);
		setPage((page) => page + 1);
	};

	const renderMovies = (movies) => {
		return movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />);
	};

	return (
		<React.Fragment>
			<div className='MovieApp-top-header'>
				<h1>{CONTENT.title}</h1>

				<SearchForm searchForMovie={searchForMovie} />
			</div>
			<div className='MovieApp-grid'>
				{!!movies.length && renderMovies(movies)}

				{!!movies.length &&
				totalPages > page && (
					<button className='MovieApp-paginate' onClick={handlePaginate}>
						Load more
					</button>
				)}
			</div>
		</React.Fragment>
	);
};

export default MovieApp;
