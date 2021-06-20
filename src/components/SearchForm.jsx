import React, { useState, useContext } from 'react';
import MovieContext from '../MoviesContext';
import './SearchForm.css';
const SearchForm = ({ searchForMovie }) => {
	const INITIAL_STATE = '';
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const { setMovies } = useContext(MovieContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmedData = formData.trim();
		searchForMovie(trimmedData);
		setFormData(INITIAL_STATE);
	};
	const handleClear = () => {
		setMovies([]);
	};

	const handleChange = (e) => {
		setFormData(() => e.target.value);
	};
	return (
		<React.Fragment>
			<form className='SearchForm' onSubmit={handleSubmit}>
				<div>
					<label htmlFor=''>Search:</label>
				</div>
				<input
					type='text'
					id='titleSearch'
					name='titleSearch'
					onChange={handleChange}
					value={formData}
					placeholder='Search for a title'
				/>
			</form>
			<div className='SearchForm-buttons'>
				<button onClick={handleClear}>Clear</button>
				<button onClick={handleSubmit}>Search</button>
			</div>
		</React.Fragment>
	);
};
export default SearchForm;
