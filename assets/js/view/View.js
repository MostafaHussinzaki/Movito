export default class View {
	_data;

	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();

		this._data = data;
		let markup = this._generateMarkup();
		this._clear()
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	update(data) {
		this._data = data;
		const newMarkup = this._generateMarkup();

		const newDom = document.createRange().createContextualFragment(newMarkup);
		const newElements = Array.from(newDom.querySelectorAll("*"));
		const curElements = Array.from(this._parentElement.querySelectorAll("*"));

		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];
			//Update changed TEXT
			if (
				!newEl.isEqualNode(curEl) &&
				newEl.firstChild?.nodeValue.trim() !== ""
			) {
				curEl.textContent = newEl.textContent;
			}
			//Update changed Attribute
			if (!newEl.isEqualNode(curEl)) {
				Array.from(newEl.attributes).forEach((attr) =>
					curEl.setAttribute(attr.name, attr.value)
				);
			}
		});
	}

	_clear() {
		this._parentElement.innerHTML = "";
	}

	renderError(message = this._errorMessage) {
		let markup = `
        <div class="error">
            <p><span>X</span>${message}</p>
        </div>`;
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}
