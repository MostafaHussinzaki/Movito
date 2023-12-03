import View from "./View";

class GenresView extends View {
	_parentElement = document.querySelector(".navigation ul");
	_errorMessage = "can't load the genres list";

	_generateMarkup() {
		let markup = "";
		this._data.forEach((genre) => {
			markup += `<a href="#g${genre.id}"><li>${genre.name}</li></a>`;
		});

		return markup;
	}
}

export default new GenresView();
