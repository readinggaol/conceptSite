"use strict";

const $ = (selector) => document.querySelector(selector);

const geography = [
	["Which of these African countries has the largest population?", "Egypt", "South Africa", "Ethiopia", "Nigeria", "3"],
	["Which of these countries is NOT a member of the Caucases?", "Armenia", "Georgia", "Bulgaria", "Azerbaijan", "2"]
]

const toggleDropdown = () =>{
	document.getElementById("droplinks").classList.toggle("show");
}

const setUpQuiz = (subject) =>{
	let questions = [];

	if(subject == "geo"){
		questions = geography;
	}

	$("#question").innerHTML = questions[0][0];

}


document.addEventListener("DOMContentLoaded", () => {
	$("#quizdrop").addEventListener("click", toggleDropdown);
	$("#geo").addEventListener("click", setUpQuiz("geo"));
});