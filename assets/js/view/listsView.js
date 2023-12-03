import View from "./View";
import { BASE_IMG } from "../config";
import star from "url:../../images/star.png";

export default class ListView extends View {


	_generateMarkup() {
		let markup = this._data.map((movie) => {
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
		});
		return markup;
	}
}

