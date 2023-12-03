import { getJSON } from "./helpers";
import { API_KEY, API } from "./config";
import { async } from "regenerator-runtime";

export let state = {
	genres: [],
	bannerMovies: [],
	weeklyTrending: [],
	topRated: [],
	upComing: [],
	movie: {},
	recommendation: [],
	sort: {
		page: 1,
		movies: [],
		id: 0,
		name: "",
		totalPage: null,
	},
};

export const getGenres = async function () {
	try {
		let data = await getJSON(`${API}genre/movie/list?api_key=${API_KEY}`);
		state.genres = data.genres;
	} catch (err) {
		throw err;
	}
};

const IdToName = function (ids) {
	return ids
		.map((id) => {
			return state.genres.find((genre) => {
				return genre.id === id;
			});
		})
		.map((x) => x.name);
};

export const getBanner = async function () {
	try {
		let data = await getJSON(`${API}discover/movie?api_key=${API_KEY}`);
		state.bannerMovies = data.results.map((movie) => {
			let genresName = IdToName(movie.genre_ids);
			return {
				id: movie.id,
				background: movie.backdrop_path,
				poster: movie.poster_path,
				name: movie.original_title,
				date: movie.release_date,
				rate: movie.vote_average,
				description: movie.overview,
				genres: genresName,
			};
		});
	} catch (err) {
		throw err;
	}
};

const createListMovieObject = function (data) {
	return data.map((movie) => {
		let year = movie.release_date.split("-")[0];
		return {
			id: movie.id,
			poster: movie.poster_path,
			name: movie.original_title,
			date: year,
			rate: movie.vote_average.toFixed(2),
		};
	});
};

const createListMovieObjectSingle = function (movie) {
	let year = movie.release_date.split("-")[0];
	return {
		id: movie.id,
		poster: movie.poster_path,
		name: movie.original_title,
		date: year,
		rate: movie.vote_average.toFixed(2),
	};
};

export const getList = async function (restAPI, stateName) {
	try {
		let data = await getJSON(`${API}${restAPI}?api_key=${API_KEY}`);
		state[stateName] = createListMovieObject(data.results);
	} catch (err) {
		throw err;
	}
};

const createMovieObject = function (data) {
	let casts = data.casts.cast.map((char) => char.name).slice(0, 10);
	let directorName = data.casts.crew.find(
		(member) => member.job === "Director"
	).name;
	let videos = data.videos.results.map((video) => video.key).slice(0, 10);

	return {
		background: data.backdrop_path,
		poster: data.poster_path,
		title: data.original_title,
		date: data.release_date,
		rate: data.vote_average,
		runtime: data.runtime,
		classification: data.adult,
		genre: data.genres.map((genre) => genre.name),
		discreption: data.overview,
		stars: casts,
		director: directorName,
		videos: videos,
	};
};

export const getMovie = async function (id) {
	try {
		let data = await getJSON(
			`${API}movie/${id}?append_to_response=casts,videos&api_key=${API_KEY}`
		);
		state.movie = createMovieObject(data);
	} catch (err) {
		throw err;
	}
};

export const updatePage = function () {
	state.sort.page++;
};

export const changeName = function (q) {
	state.sort.name = state.sort.id = q;
};

export const clearClassificationList = function () {
	state.sort.movies = [];
};

export const getGenreLists = async function (identifier, id, page = 1) {
	try {
		let data;
		let realId;

		if (identifier === "g") {
			realId = parseFloat(id);
			data = await getJSON(
				`${API}discover/movie?api_key=${API_KEY}&with_genres=${realId}&page=${page}`
			);

			// reset the page number
			let currentId = window.location.hash.slice(2);
			if (parseFloat(currentId) !== state.sort.id) {
				state.sort.page = 1;
				clearClassificationList();
			}

			state.sort.id = +realId;

			//get the name of genre Movie list
			state.sort.name = state.genres.find((genre) => {
				return genre.id === realId;
			}).name;
		} else if ((identifier = "s")) {
			realId = id.split("p=")[0];
			data = await getJSON(
				`${API}search/movie?query={${realId}}&api_key=${API_KEY}&page=${page}`
			);
			if (realId !== state.sort.id) state.sort.page = 1;
		}
		state.sort.totalPage = data.total_pages;
		// adding the movie to the list that we will send it to the view
		data.results.forEach((mov, i) => {
			// check if their is dublicate movie before we push it to our array
			if (mov.id !== state.sort.movies[i]?.id) {
				state.sort.movies.push(createListMovieObjectSingle(mov));
			}
		});
	} catch (err) {
		throw err;
	}
};
