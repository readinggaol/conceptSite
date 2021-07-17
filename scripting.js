"use strict";

const $ = (selector) => document.querySelector(selector);

const geography = [
	["Which of these African countries has the largest population?", "Egypt", "S. Africa", "Ethiopia", "Nigeria", "Nigeria"],
	["Which of these countries is NOT a member of the Caucases?", "Armenia", "Georgia", "Bulgaria", "Azerbaijan", "Bulgaria"]
];

const literature = [];

const history = [];

//---------------
const toggleDropdown = () =>{
	document.getElementById("droplinks").classList.toggle("show");
}

//---------------
const removeMenu = () =>{
	document.getElementById("droplinks").classList.remove("show");
}

//---------------
const chooseRandomQuestion = (questions) =>{
	var random = Math.floor(Math.random() * questions.length);
	return questions[random];
}

//---------------
const checkAnswer = (evt, question) =>{
	var userAnswer = evt.target.textContent;
	if(question[5] == userAnswer){
		alert("Correct!");
	}else{
		alert("Wrong!");
	}
}

//---------------
const setUpQuiz = (evt) =>{
	removeMenu();
	let questions = [];

	//CATCH ID OF CLICKED OPTION
	if(evt.target.id == "geo"){
		questions = geography;
	}else if(evt.target.id == "lit"){
		questions = literature;
	}else if(evt.target.id == "his"){
		questions = history;
	}

	//GENERATE RANDOM NUMBER
	var question = chooseRandomQuestion(questions)

	//WRITE VALUES TO ELEMENTS
	$("#question").textContent = question[0];
	$("#Q1").textContent = question[1];
	$("#Q2").textContent = question[2];
	$("#Q3").textContent = question[3];
	$("#Q4").textContent = question[4];

	//CREATES EVENT HANDLERS FOR ALL THE ANSWER BOXES
	const elements = document.querySelectorAll(".questionBox");
	elements.forEach(element => {
		element.addEventListener("click", (e) =>{
			checkAnswer(e, question);
		});
	})



}

document.addEventListener("DOMContentLoaded", () => {
	$("#quizdrop").addEventListener("click", toggleDropdown);
	$("#geo").addEventListener("click", setUpQuiz);
	$("#lit").addEventListener("click", setUpQuiz);
	$("#his").addEventListener("click", setUpQuiz);
	
});