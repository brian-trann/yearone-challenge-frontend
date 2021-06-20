import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
	const [ state, setState ] = useState(() => {
		let value;
		try {
			value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue));
		} catch (e) {
			console.log(e);
			value = defaultValue;
		}
		return value;
	});
	useEffect(
		() => {
			window.localStorage.setItem(key, JSON.stringify(state));
		},
		[ key, state ]
	);

	return [ state, setState ];
};
export default useLocalStorageState;
