// making the search Bar
const searchbar = document.querySelector(".header__option__search-bar__input");
const img = document.querySelector(".header__option__search-bar__img");

searchbar.addEventListener("focus", function () {
	img.style.left = "-40px";
});

searchbar.addEventListener("focusout", function () {
	img.style.left = "7px";
});

