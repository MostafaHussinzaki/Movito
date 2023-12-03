import View from "./View";
import { BASE_IMG } from "../config";
import star from "url:../../images/star.png";
import { mark } from "regenerator-runtime";

class SortMovie extends View {
	_parentElement = document.querySelector("main");
	_errorMessage = "There Is no movies";
	searchBar = document.querySelector(".header__option__search-bar__input");

	addGenreMovieHandler(handler) {
		["hashchange", "load"].forEach((ev) =>
			window.addEventListener(ev, handler)
		);
	}

	addSearchHandler(handler) {
		this.searchBar.addEventListener("focusout", function () {
			handler();
		});
	}

	getQuery() {
		let query = this.searchBar.value;
		return query;
	}

	_generateMarkup() {
		console.log(this._data);
		let movies = this._data.movies
			.map((movie) => {
				let shortenName =
					movie.name.length > 17 ? `${movie.name.slice(0, 16)}...` : movie.name;
				return `							
            <a class=" | poster" href="#${movie.id}">
                <img src="${BASE_IMG}${movie.poster}" alt="${movie.name}" />
                <h2>${shortenName}</h2>
                <div class="">
                    <span class="rate">
                        <img src="${star}" alt="" />
                        ${movie.rate}
                    </span>
                    <span class="date | rates">${movie.date}</span>
                </div>
            </a>
            `;
			})
			.join("");

		let markup =
			this._data.movies.length > 0
				? `
        <div class="sorts">
			<h1>${this._data.name} Movie</h1>
			<div class="movies">
				${movies}
			</div>
			${
				this._data.totalPage <= this._data.page
					? ""
					: `<a href="#${window.location.hash[1]}${this._data.id}p=${this._data.page}" class="sorts__btn | watch-btn ">
					<span>Learn more</span>
					</a>`
			}
		</div>
        `
				: ` <div class="error">
		<p><span>X</span>${this._errorMessage}</p>
	</div>`;

		// this.searchBar.value = "";
		return markup;
	}
}

export default new SortMovie();
