import React from 'react';
import './Loading.css';
import loadingSvg from '../loading.svg';

const Loading = () => {
	return <img className='Loading' src={loadingSvg} alt='loading animation' />;
};
export default Loading;
