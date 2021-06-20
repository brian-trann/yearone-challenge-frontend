import React, { useEffect, useState } from 'react';
import MovieApi from '../api';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import noImage from '../noImage.svg';
import { LIKE, DISLIKE, TITLE, POSTER, DIRECTOR, RATED, RELEASED, PLOT } from '../constants';
import './Movie.css';

const Movie = () => {
	// maybe store liked / unliked ID's in local storage
	const [ movie, setMovie ] = useState({});
	const [ likes, setLikes ] = useLocalStorageState('likes', {});
	const [ dislikes, setDislikes ] = useLocalStorageState('dislikes', {});
	const poster = movie[POSTER] === 'N/A' ? noImage : movie[POSTER];
	const plot = movie[PLOT] === 'N/A' ? 'No description available' : movie[PLOT];
	const { id } = useParams();

	const handleLike = async () => {
		if (likes.hasOwnProperty(id) || dislikes.hasOwnProperty(id)) return;

		try {
			const dislikesCopy = dislikes;
			delete dislikesCopy[id];

			const res = await MovieApi.postMovieInteraction(id, LIKE);
			setDislikes(dislikesCopy);

			setLikes((likes) => ({ ...likes, [id]: true }));
			setMovie((movie) => ({ ...movie, likes: res.likes, dislikes: res.dislikes }));
		} catch (error) {}
	};
	const handleDislike = async () => {
		if (dislikes.hasOwnProperty(id) || likes.hasOwnProperty(id)) return;

		try {
			const likesCopy = likes;
			delete likesCopy[id];
			const res = await MovieApi.postMovieInteraction(id, DISLIKE);

			setLikes(likesCopy);
			setDislikes((dislikes) => ({ ...dislikes, [id]: true }));
			setMovie((movie) => ({ ...movie, likes: res.likes, dislikes: res.dislikes }));
		} catch (error) {}
	};

	useEffect(
		() => {
			const getMovie = async (id) => {
				const movie = await MovieApi.getMovieById(id);
				console.log(movie);
				setMovie(movie);
			};
			getMovie(id);
		},
		[ id ]
	);

	return (
		<React.Fragment>
			{Object.keys(movie).length ? (
				<div className='Movie-container'>
					<span className='Movie-home'>
						<Link to='/'>
							<FontAwesomeIcon icon={faArrowCircleLeft} />
						</Link>
					</span>
					<h1>{movie[TITLE]}</h1>
					<div className='Movie-vote'>
						<span className='Movie-vote-up' onClick={handleLike}>
							<FontAwesomeIcon className='Movie-vote-up-icon' icon={faThumbsUp} />
							&nbsp; {movie.likes || 0}
						</span>
						<span className='Movie-vote-down' onClick={handleDislike}>
							<FontAwesomeIcon className='Movie-vote-down-icon' icon={faThumbsDown} />
							&nbsp; {movie.dislikes || 0}
						</span>
					</div>
					<div className='Movie-content'>
						<img src={poster} alt='Movie Poster' />
						<p>Directed by: {movie[DIRECTOR]}</p>
						<p>Rating: {movie[RATED]}</p>
						<p>Released: {movie[RELEASED]}</p>
						<p>{plot}</p>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</React.Fragment>
	);
};
export default Movie;
