import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
const MovieCard = ({ movie }) => {
	const { Title, Year, imdbID } = movie;
	return (
		<div className='MovieCard' key={imdbID}>
			<Link to={`/movies/${imdbID}`}>
				{Title} - {Year}
			</Link>
		</div>
	);
};
export default MovieCard;
