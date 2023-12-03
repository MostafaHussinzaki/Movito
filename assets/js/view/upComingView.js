import ListView from "./listsView";

class UpComing extends ListView {
	_parentElement = document.querySelector(".up-coming div");
	_errorMessage = "Something went wrong when trying to get Upcoming Movies";
}

export default new UpComing();