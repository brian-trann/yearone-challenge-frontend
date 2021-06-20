import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class MovieApi {
	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params })).data;
		} catch (error) {
			console.error('API Error: ', error.response);
			const message = error.response?.data?.error?.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	static async getMoviesByTitle(title, page = 1) {
		const res = await this.request('movies/search', { title, page });
		return res;
	}
	static async getMovieById(id) {
		const res = await this.request(`movies/${id}`);

		return res.movie;
	}
	static async postMovieInteraction(id, command) {
		const res = await this.request(`movies/${id}?command=${command}`, {}, 'post');
		return res.response;
	}
}
export default MovieApi;
