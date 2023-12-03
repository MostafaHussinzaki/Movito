// making the search Bar
const searchbar = document.querySelector(".header__option__search-bar__input");
const img = document.querySelector(".header__option__search-bar__img");
searchbar.addEventListener("focus", function() {
    img.style.left = "-40px";
});
searchbar.addEventListener("focusout", function() {
    img.style.left = "7px";
});
const searchBtn = document.querySelector(".header__option__search-btn");
const header = document.querySelector(".header");
const closeSearchBtn = document.querySelector(".header__option__close-search-btn");
searchBtn.addEventListener("click", function() {
    header.classList.add("header--active");
    openMenuBtn.style.display = "none";
});
closeSearchBtn.addEventListener("click", function() {
    header.classList.remove("header--active");
    openMenuBtn.style.display = "block";
});
const openMenuBtn = document.querySelector(".header__option__open-menu-btn");
const closeMenuBtn = document.querySelector(".header__option__close-menu-btn");
const Menu = document.querySelector(".sidebar");
openMenuBtn.addEventListener("click", function() {
    Menu.classList.add("sidebar--active");
    closeMenuBtn.style.display = "block";
    openMenuBtn.style.display = "none";
});
closeMenuBtn.addEventListener("click", function() {
    // console.log("lol");
    Menu.classList.remove("sidebar--active");
    closeMenuBtn.style.display = "none";
    openMenuBtn.style.display = "block";
});

//# sourceMappingURL=index.c5872702.js.map
