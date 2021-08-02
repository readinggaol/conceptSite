"use strict";

const $ = (selector) => document.querySelector(selector);


//----GLOBAL (REGRETTABLY FLEXIBLE) VARIABLES
let questions = [];
let question = [];
let correctAnswers = 0;
let wrongAnswers = 0;


//----QUESTION BANKS
const geography = [
	["The title of 'most populous African country' belongs to this nation.", "Egypt", "S. Africa", "Ethiopia", "Nigeria", "Nigeria"],
	["Which of these countries is NOT a member of the Caucases?", "Armenia", "Georgia", "Bulgaria", "Azerbaijan", "Bulgaria"],
	["The island once called Hispaniola is now home to the Dominican Republic and which other country?", "Haiti", "Jamaica", "Puerto Rico", "Barbados", "Haiti"],
	["This European mountain range stretches from France to Austria.", "Himalayas", "Andes", "Alps", "Rockies", "Alps"],
	["While not the largest by surface area, this freshwater lake is the largest by volume.", "Superior", "Baikal", "Chad", "Victoria", "Baikal"],
	["Pakistan enjoys the fruits of this historically significant river.", "Indus", "Rhine", "Amazon", "Yangtze", "Indus"],
	["The sandstone formation called Uluru is significant to the aboriginal peoples of this country.", "New Zealand", "Philippines", "Indonesia", "Australia", "Australia"],
	["Kinshasa and Brazzaville sit on opposite sides of this powerful African river.", "Congo", "Nile", "Ubangi", "Zambezi", "Congo"],
	["Which of these lakes failed to inherit the moniker of 'Great'?", "Superior", "St. Claire", "Michigan", "Erie", "St. Claire"],
	["Scandinavian capitals at Stockholm, Helsinki, and Copenhagen are all on this sea.", "Black", "Caspian", "Dead", "Baltic", "Baltic"]
];

const literature = [
	["This Irish author penned 'The Importance of Being Ernest'.", "James Joyce", "Oscar Wilde", "Lord Byron", "William Shakespeare", "Oscar Wilde"],
	["This novel by Nabokov was banned for it's depiction of taboo relationships.", "Metamorphosis", "War and Peace", "Lolita", "Sound and the Fury", "Lolita"],
	["Sylvia Plath wrote this novel that focused on a realistic depiction of depression.", "The Bell Jar", "Gravity's Rainbow", "Call of Cthulhu", "Of Mice and Men", "The Bell Jar"],
	["This English philologist wrote 'The Hobbit', and studied Beowulf translations.", "A.A. Milne", "J.R.R. Tolkien", "G.R.R. Martin", "J.K. Rowling", "J.R.R. Tolkien"],
	["Hemingway's 'For Whom the Bell Tolls' follows the struggles of revolutionaries in which country's civil war?", "Spain", "Italy", "Turkey", "Portugal", "Spain"],
	["Anthony Burgess famously did not want to be remembered for this iconic novel.", "Opus Posthumous", "A Clockwork Orange", "Frankenstein", "The Man In the High Castle", "A Clockwork Orange"],
	["Ridley Scott owes much of his film 'Blade Runner' to this author.", "Marquis de Sade", "Stephen King", "Philip K. Dick", "Mary Shelley", "Philip K. Dick"],
	["Bram Stoker wrote this cultural landmark in an epistolary style.", "Dracula", "Peter Rabbit", "Rumplestiltskin", "Treasure Island", "Dracula"],
	["'The Lion, the Witch, and the Wardrobe' is the product of this English author and theologian.", "Lewis Carroll", "Daniel Day-Lewis", "Lewis & Clark", "C.S. Lewis", "C.S. Lewis"],
	["Synonymous with the genre of 'cosmic horror', this American writer created the Cthulhu mythos.", "H.P. Lovecraft", "Stephen King", "Thomas Pynchon", "Edgar Allen Poe", "H.P. Lovecraft"]
];

const history = [
	["William of Normandy invaded England at the famous Battle of ______", "The Bulge", "Boyne", "Hastings", "Britain", "Hastings"],
	["This U.S. president guided construction of the Panama Canal and Mount Rushmore.", "Carter", "Carver", "Roosevelt", "Lincoln", "Roosevelt"],
	["The Protestant Reformation began with this rebellious priest.", "Jan Hus", "Martin Luther", "Antonio Vivaldi", "Friar Tuck", "Martin Luther"],
	["Invading Huns and Germanic tribes led some Italians to board their boats and found this Italian city.", "Palermo", "Naples", "Rome", "Venice", "Venice"],
	["Constantinople and Byzantium are both old names for this Turkish city.", "Ankara", "Athens", "Istanbul", "Cyprus", "Istanbul"],
	["The re-imagination of the cotton gin by this American inventor changed American history.", "Thomas Edison", "Eli Whitney", "Charles Babbage", "Lewis Howard Latimer", "Eli Whitney"],
	["These Russian revolutionaries seized power in 1917 and began the Soviet era.", "Bolsheviks", "Mensheviks", "Stalinists", "KGB", "Bolsheviks"],
	["This Chinese politician is credited as the father of Chinese communism.", "Zhou Enlai", "Zhao Lijian", "Xi Jinping", "Mao Zedong", "Mao Zedong"],
	["Remembered as a traitor, this American officer switched sides in 1780.", "Benedict Arnold", "George Washington", "James Livingston", "John Butler", "Benedict Arnold"],
	["This landmark English legal document significantly reduced royal influence and guaranteed church rights.", "Treaty of Versailles", "Treaty of Westminster", "Balkan Pact", "Magna Carta", "Magna Carta"]
];


//----MANAGING CSS+ELEMENTS
const toggleDropdown = () => {
	document.getElementById("droplinks").classList.toggle("show");
}

const removeMenu = () => {
	document.getElementById("droplinks").classList.remove("show");
}

const removeLuckStamp = () => {
	let check = $("#splashfade");
	if(check !== null){
		$("#splashfade").remove();
	}

}

const reconstructStamp = () => {
	//RECONSTRUCT THE SPLASHFADE
	const newSplashFade = document.createElement('span');
	newSplashFade.textContent = "shall we try again?";
	newSplashFade.setAttribute("id", "splashfade");
	newSplashFade.setAttribute("class", "hide");
	$("#mainsplash").appendChild(newSplashFade);
}


//----MANAGING THE GAME
const setUpQuiz = (evt) => {
	//ZERO EVERYTHING OUT
	removeQuestionBoxes();
	createQuestionBoxes(true);
	removeMenu();
	removeLuckStamp();
	questions = [];
	question = [];
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
}

const pauseForFeedback = () => {
	let answerText = $("#question");
	let continueButton = document.createElement("img");
	continueButton.src = "chevron.png";
	continueButton.id = "chevron";
	answerText.parentNode.insertBefore(continueButton, answerText.nextSibling);

	$("#chevron").addEventListener("click", nextQuestion);
	removeQuestionBoxes();
}

const removeQuestionBoxes = () => {
	//REMOVE QUESTIONS TO AVOID DOUBLE-CLICKS
	//CAN'T REMOVE LISTENERS ON ANONYMOUS FUNCTIONS
	const elements = document.querySelectorAll(".questionBox");
	elements.forEach(element => {
		element.remove();
	})

}

//CREATES THE QUESTION BOXES AND TAKES A BOOLEAN TRUE/FALSE
//IF TRUE, IF IT WILL ALSO CREATE THE LISTENERS
const createQuestionBoxes = (boolean) => {
	let box = document.createElement("div");
		box.id = "questionBox";
		box.classList.add("questionBox");
		let Q1 = document.createElement("p");
		Q1.id = "Q1";
		let Q2 = document.createElement("p");
		Q2.id = "Q2";
		let Q3 = document.createElement("p");
		Q3.id = "Q3";
		let Q4 = document.createElement("p");
		Q4.id = "Q4";
	
		$("#image").parentNode.parentNode.appendChild(box);
	
		box.appendChild(Q1);
		box.appendChild(Q2);
		box.appendChild(Q3);
		box.appendChild(Q4);
	
	if(boolean){
		//----CREATES EVENT HANDLERS FOR ALL THE ANSWER BOXES
		const elements = document.querySelectorAll(".questionBox");
		elements.forEach(element => {
		element.addEventListener("click", (e) =>{
			checkAnswer(e, question);
			});
		})
	}
}

const nextQuestion = () => {
	$("#chevron").remove();
	$("#image").src = "clip.png";
	
	// IF THE QUIZ IS OVER, ROLL THE CREDITS
	// IF NOT, DO HOUSEKEEPING AND MOVE ON
	if(correctAnswers + wrongAnswers == 10){
		createQuestionBoxes(false);
		cleanUp();
	}else{
		
		createQuestionBoxes(true);
		removeQuestion(question)
		updateQuestions();
		updateScore();
	}
}

const chooseRandomQuestion = (questions) => {
	let random = Math.floor(Math.random() * questions.length);
	return questions[random];
}

const checkAnswer = (evt, question) => {
	//CHECK USER'S CHOICE AGAINST CORRECT VALUE
	let userAnswer = evt.target.textContent;
	if(question[5] == userAnswer){
		correctAnswers += 1;
		$("#image").src = "check.png";
		$("#question").textContent = "Correct! Well done!";
	}else{
		wrongAnswers += 1;
		$("#image").src = "ex.png";
		$("#question").textContent = `Incorrect. The correct answer was: ${question[5]}`;
	}

	pauseForFeedback();
	
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
	//REMOVE OLD SCORE
	$("#score").textContent = "";


	//CONSTRUCT SPAN ELEMENTS FOR COLORED ARROWS AND SCORES
	const upArrow = document.createElement('span');
	upArrow.textContent = "\u25B2";
	upArrow.setAttribute("id", "uparrow");
	upArrow.setAttribute("class", "uparrow");

	const downArrow = document.createElement('span');
	downArrow.textContent = "\u25BC";
	downArrow.setAttribute("id", "downarrow");
	downArrow.setAttribute("class", "downarrow");

	const correct = document.createElement('span');
	correct.textContent = `: ${correctAnswers} `;

	const wrong = document.createElement('span');
	wrong.textContent = `: ${wrongAnswers}`;

	//APPEND ALL NEW ELEMENTS TO THE SCORE TAG
	$("#score").appendChild(upArrow);
	$("#score").appendChild(correct);
	$("#score").appendChild(downArrow);
	$("#score").appendChild(wrong);
}

const cleanUp = () => {
	reconstructStamp();

	//----CONSTRUCT ARROWS
	const upArrow = document.createElement('span');
	upArrow.textContent = "\u25B2";
	upArrow.setAttribute("id", "uparrow");
	upArrow.setAttribute("class", "uparrow");

	const downArrow = document.createElement('span');
	downArrow.textContent = "\u25BC";
	downArrow.setAttribute("id", "downarrow");
	downArrow.setAttribute("class", "downarrow");

	//----SET UP PARTING SCREEN
	let score = `${correctAnswers * 10}%`
	let partingMessage = `Quiz completed with ${score} correct!`;
	

	//----REMOVE TEXT CONTENT FROM ARROW LOCATIONS
	$("#Q1").textContent = "";
	$("#Q2").textContent = "";

	//----INSERT SCORE VALUES
	$("#score").textContent = "";
	$("#question").textContent = partingMessage;
	$("#Q1").appendChild(upArrow);
	$("#Q2").appendChild(downArrow);
	$("#Q3").textContent = correctAnswers;
	$("#Q4").textContent = wrongAnswers;
}


//----ON PAGE LOAD, GET READY
document.addEventListener("DOMContentLoaded", () => {
	$("#quizdrop").addEventListener("click", toggleDropdown);
	$("#geo").addEventListener("click", setUpQuiz);
	$("#lit").addEventListener("click", setUpQuiz);
	$("#his").addEventListener("click", setUpQuiz);
});