import ListView from "./listsView";

class WeeklyTrending extends ListView {
	_parentElement = document.querySelector(".weekly-trending div");
	_errorMessage = "Something went wrong when trying to get Weekly Trending movies";
}

export default new WeeklyTrending();

