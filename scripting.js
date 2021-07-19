"use strict";

const $ = (selector) => document.querySelector(selector);

let questions = [];
let question = [];
let correctAnswers = 0;
let wrongAnswers = 0;

const geography = [
	["Which of these African countries has the largest population?", "Egypt", "S. Africa", "Ethiopia", "Nigeria", "Nigeria"],
	["Which of these countries is NOT a member of the Caucases?", "Armenia", "Georgia", "Bulgaria", "Azerbaijan", "Bulgaria"]
];

const literature = [];

const history = [];

//----MANAGING CSS+ELEMENTS
const toggleDropdown = () => {
	document.getElementById("droplinks").classList.toggle("show");
}

const removeMenu = () => {
	document.getElementById("droplinks").classList.remove("show");
}

const removeLuckStamp = () => {
	$("#splashfade").remove();
}

//----MANAGING JS LOGIC
const chooseRandomQuestion = (questions) => {
	let random = Math.floor(Math.random() * questions.length);
	return questions[random];
}


const checkAnswer = (evt, question) => {
	//CHECK USER'S CHOICE AGAINST CORRECT VALUE
	let userAnswer = evt.target.textContent;
	if(question[5] == userAnswer){
		correctAnswers += 1;
	}else{
		wrongAnswers += 1;
	}

	//IF THE QUIZ IS OVER, ROLL THE CREDITS
	//IF NOT, DO HOUSEKEEPING AND MOVE ON
	if(correctAnswers + wrongAnswers == 2){
		cleanUp();
	}else{
		removeQuestion(question)
		updateQuestions();
		updateScore();
	}

	
}

const removeQuestion = (question) => {
	//FIND THE INDEX OF THE CURRENT QUESTION
	let index = 0;

	for(let i = 0; i < questions.length; i++){
		if(questions[i][0] == question[0]){
			break;
		}else{
			index += 1;
		}
	}

	//USE INDEX TO REMOVE
	questions.splice(index, 1);
}

const updateQuestions = () => {
	//GENERATE RANDOM NUMBER
	question = chooseRandomQuestion(questions)

	//WRITE VALUES TO ELEMENTS
	$("#question").textContent = question[0];
	$("#Q1").textContent = question[1];
	$("#Q2").textContent = question[2];
	$("#Q3").textContent = question[3];
	$("#Q4").textContent = question[4];

}

const updateScore = () => {
	let up = "\u25B2";
	let down = "\u25BC";
	var scoreString = `${up}: ${correctAnswers}   ${down}: ${wrongAnswers}`;
	$("#score").textContent = scoreString;
}


const cleanUp = () => {
	//RECONSTRUCT THE SPLASHFADE
	const newSplashFade = document.createElement('span');
	newSplashFade.textContent = "shall we try again?";
	newSplashFade.setAttribute("id", "splashfade");
	newSplashFade.setAttribute("class", "hide");
	$("#mainsplash").appendChild(newSplashFade);

	//PRINT OUT PARTING SCREEN
	let up = "\u25B2";
	let down = "\u25BC";
	let score = `${correctAnswers * 10}%`
	let partingMessage = `Quiz completed with ${score} correct!`;
	
	$("#score").textContent = "";
	$("#question").textContent = partingMessage;
	$("#Q1").textContent = up;
	$("#Q2").textContent = down;
	$("#Q3").textContent = correctAnswers;
	$("#Q4").textContent = wrongAnswers;

}


//---------------
const setUpQuiz = (evt) => {
	//ZERO EVERYTHING OUT
	removeMenu();
	removeLuckStamp();
	$("#score").textContent = "";
	questions = [];
	correctAnswers = 0;
	wrongAnswers = 0;
	updateScore();

	//CATCH ID OF CLICKED OPTION
	if(evt.target.id == "geo"){
		questions = geography;
	}else if(evt.target.id == "lit"){
		questions = literature;
	}else if(evt.target.id == "his"){
		questions = history;
	}

	updateQuestions();

	//CREATES EVENT HANDLERS FOR ALL THE ANSWER BOXES
	const elements = document.querySelectorAll(".questionBox");
	elements.forEach(element => {
		element.addEventListener("click", (e) =>{
			checkAnswer(e, question);
		});
	})



}

//ON PAGE LOAD, GET READY
document.addEventListener("DOMContentLoaded", () => {
	$("#quizdrop").addEventListener("click", toggleDropdown);
	$("#geo").addEventListener("click", setUpQuiz);
	$("#lit").addEventListener("click", setUpQuiz);
	$("#his").addEventListener("click", setUpQuiz);
	
});