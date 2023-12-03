import View from "./View";
import playImg from "url:../../images/play_circle.png";
import { BASE_IMG } from "../config";


let currentMovie;

class BannerView extends View {
	_parentElement = document.querySelector(".banner");
	_errorMessage = "Something went wrong when trying to get new movies";

	_addSliderMoviesHandler(handler) {
		this._parentElement.addEventListener("click", function (e) {
			let movieBtn = e.target.closest(".banner__slider__poster");
			if (!movieBtn) return;
			currentMovie = +movieBtn?.dataset.index;
			handler();
		});
	}

	_generateMarkup() {
		let currMovie;
		if (!currentMovie) {
			currMovie = 0;
		} else {
			currMovie = currentMovie;
		}

		this._parentElement.style.backgroundImage = `url(${BASE_IMG}${this._data[currMovie].background})`;
		return `
        ${this._genrateCurrentMovieMarkup(currMovie)}
        ${this._generateSliderMarkup(currMovie)}
        `;
	}

	_genrateCurrentMovieMarkup(currentMovie) {
		return `
        <div class="banner__curr-movie">
			<h1 class="banner__curr-movie__title">
				${this._data[currentMovie].name}
			</h1>
			<div class="banner__curr-movie__info">
				<div class="banner__curr-movie__info__date">${
					this._data[currentMovie].date
				}</div>
				<div class="banner__curr-movie__info__rate | rates">${
					this._data[currentMovie].rate
				}</div>
			</div>
			<div class="banner__curr-movie__genre">
				<p>${this._data[currentMovie].genres.join(", ")}</p>
			</div>
			<div class="banner__curr-movie__description">
				<p>
                ${this._data[currentMovie].description
									.split(".")
									.slice(0, 2)
									.join(".")}
				</p>
			</div>
			<a href="#${
				this._data[currentMovie].id
			}" class="banner__curr-movie__button | watch-btn">
				<img src="${playImg}" alt="Watch now" />
					<span>Watch now</span>
			</a>
		</div>
        `;
	}

	_generateSliderMarkup(currentMovie) {
		return `<div class="banner__slider | slider-small"> ${this._data.map(
			(movie, index) => {
				return `              
              	<div
              		class="banner__slider__poster | poster-img poster-img${
										index === currentMovie ? "--active" : ""
									}"
					data-index="${index}"
              	>
              	    <img src="${BASE_IMG}${movie.poster}" alt="" />
              	</div>
              `;
			}
		)}</div>`;
	}
}

export default new BannerView();
