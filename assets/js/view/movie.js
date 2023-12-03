import View from "./View";
import { BASE_IMG } from "../config";
import star from "url:../../images/star.png";

class Movie extends View {
	_parentElement = document.querySelector("main");
	_errorMessage =
		"Something went wrong when trying to get This movie";

	addMovieDetailHandler(handler) {
		["hashchange", "load"].forEach((ev) =>
			window.addEventListener(ev, function() {
                // window.scrollTo(0,0)
                handler()
            })
		);
	}

	_generateMarkup() {
		let recommendations = this._data.recommendation.map((rec) => {
			let shortenName =
				rec.name.length > 17 ? `${rec.name.slice(0, 16)}...` : rec.name;
			return `							
         <a class=" | poster" href="#${rec.id}">
             <img src="${BASE_IMG}${rec.poster}" alt="${rec.name}" />
             <h2>${shortenName}</h2>
             <div class="">
                 <span class="rate">
                     <img src="${star}" alt="" />
                     ${rec.rate}
                 </span>
                 <span class="date | rates">${rec.date}</span>
             </div>
         </a>
         `;
		});
		let markup = `
        <div class="selected-movie">
        <div class="selected-movie__details" style="background-image: url(${BASE_IMG}${
			this._data.movie.background
		})">
            <div class="selected-movie__details__img | poster">
                <img src="${BASE_IMG}${this._data.movie.poster}" alt="poster" />
            </div>
            <div class="selected-movie__details__info">
                <div class="selected-movie__details__info__title">
                    <h1>${this._data.movie.title}</h1>
                </div>
                <div class="selected-movie__details__info__numbers">
                    <span class="rate"
                        ><img src="${star}" alt="" />${this._data.movie.rate.toFixed(
			2
		)}</span
                    >
                    <span class="dot">.</span>
                    <span class="duration">${this._data.movie.runtime}m</span>
                    <span class="dot">.</span>
                    <span class="date">${
											this._data.movie.date.split("-")[0]
										}</span>
                    <span class="dot">.</span>
                    <span class="classify | rates">${
											!this._data.movie.classification ? "PG-13" : "+18"
										}</span>
                </div>
                <div class="selected-movie__details__info__description">
                    <div class="genres"><p>${this._data.movie.genre.join(
											", "
										)}</p></div>
                    <div class="summary">
                        <p>
                            ${this._data.movie.discreption}
                        </p>
                    </div>
                    <div class="stars">
                        <h3>Starring</h3>
                        <p>
                            ${this._data.movie.stars.join(", ")}
                        </p>
                    </div>
                    <div class="director">
                        <h3>Directed By</h3>
                        <p>${this._data.movie.director}</p>
                    </div>
                </div>
                <div class="selected-movie__details__info__videos">
                    <h2>Trailers and Clips</h2>
                    <div class="selected-movie__details__info__videos__slider |">
                        ${this._data.movie.videos.map((key) => {
													return `<iframe src="https://www.youtube.com/embed/${key}?theme=dark&color=white&rel=0></iframe>`;
												})}
                        </div>
                        </div>
            </div>
        </div>
        <div class="selected-movie__suggestion">
            <div class="selected-movie__suggestion__slider | sliders">
                <h1>You May Also Like</h1>
                <div class="| slider">
                    ${recommendations}
                </div>
            </div>
        </div>
    </div>
        `;
		return markup;
	}
}

export default new Movie();
