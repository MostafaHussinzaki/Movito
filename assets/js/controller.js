import * as model from "./model";

import GenresView from "./view/genresView";
import BannerView from "./view/bannerView";
import WeeklyTrending from "./view/weeklyTrendingView";
import TopRated from "./view/topRatedView";
import WeeklyTrending from "./view/weeklyTrendingView";
import UpComing from "./view/upComingView";
import Movie from "./view/movie";
import SortMovieView from "./view/SortMovieView";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
// import SortMovieView from "./view/SortMovieView";

const controlMovie = async function () {
	try {
		// get the movie Id
		let movieId = window.location.hash.slice(1);
		// gaurd class for working only at movies id
		if (movieId[0] === "g" || movieId[0] === "s") return;
		// load the movie by the id and recommendation for this movie
		await model.getMovie(movieId);

		await model.getList(`movie/${movieId}/recommendations`, "recommendation");

		// render movie
		Movie.render(model.state);
	} catch (err) {
		Movie.renderError();
	}
};

const controlGenresList = async function () {
	try {
		// load genre
		await model.getGenres();
		// render Genre list in page
		GenresView.render(model.state.genres);
	} catch (err) {
		GenresView.renderError();
	}
};

const controlBanner = async function () {
	try {
		// load banner
		await model.getBanner();

		// render banner in Page
		BannerView.render(model.state.bannerMovies);
	} catch (err) {
		BannerView.renderError();
	}
};

const controlUpdateBanner = function () {
	// update banner when change on slider
	BannerView.update(model.state.bannerMovies);
};

const controlLists = async function () {
	try {
		// get weeklyTrending
		await model.getList("trending/movie/week", "weeklyTrending");
		// get top rated
		await model.getList("movie/top_rated", "topRated");
		// get upComing
		await model.getList("movie/upcoming", "upComing");

		// render the lists
		WeeklyTrending.render(model.state.weeklyTrending);
		TopRated.render(model.state.topRated);
		UpComing.render(model.state.upComing);
	} catch (err) {
		TopRated.renderError();
	}
};

const controlGenresMovie = async function () {
	try {
		// genre id
		let genreId = window.location.hash.slice(1);
		// gaurd class for working only at genres id
		if (genreId[0] !== "g" && genreId[0] !== "s") return;

		// clearing the movie list when change the genre
		if ((genreId[0] === "g" || genreId[0] === "s") && !genreId.includes("p")) {
			model.state.sort.page = 1;
			model.clearClassificationList();
		}
		// load the list
		if (genreId[0] === "g") {
			await model.getGenreLists("g", genreId.slice(1));
		} else if (genreId[0] === "s") {
			await model.getGenreLists("s", genreId.slice(1));
			model.changeName(SortMovieView.getQuery());
		}
		// render the list in the page
		SortMovieView.render(model.state.sort);
	} catch (err) {
		// console.error(err);
		SortMovieView.renderError();
	}
};

const updateHash = function () {
	let query = SortMovieView.getQuery();
	location.hash = `s${query}`;
	model.clearClassificationList();
};

const controlPage = async function () {
	try {
		let genreId = window.location.hash.slice(1);

		// gaurd class for not
		if (genreId[0] !== "g" && genreId[0] !== "s" && !genreId.includes("p="))
			return;

		// loading the data according to search or genres
		await model.getGenreLists(
			`${genreId[0]}`,
			genreId.slice(1),
			model.state.sort.page
		);

		// update the page number
		model.updatePage();
		// render the information
		SortMovieView.render(model.state.sort);
	} catch (err) {
		SortMovieView.renderError();
	}
};

const init = async function () {
	await controlGenresList();
	await controlBanner();
	BannerView._addSliderMoviesHandler(controlUpdateBanner);
	await controlLists();
	Movie.addMovieDetailHandler(controlMovie);
	SortMovieView.addGenreMovieHandler(controlGenresMovie); // make genre one
	SortMovieView.addGenreMovieHandler(controlPage); // make genre one
	SortMovieView.addSearchHandler(updateHash);
};
init();
