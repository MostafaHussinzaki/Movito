import ListView from "./listsView";

class TopRatedView extends ListView {
	_parentElement = document.querySelector(".top-rated div");
	_errorMessage = "Something went wrong when trying to get the Movies";
}

export default new TopRatedView();