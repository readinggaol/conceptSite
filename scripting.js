"use strict";

const $ = (selector) => {document.querySelector(selector)};


const testListener = () =>{
	document.write(`<p>Hey there, cowboy</p>`);
	// console.log("Hey there, cowboy.");
}


document.addEventListener("DOMContentLoaded", () => {
	testListener;
	// $("#quizdrop").addEventListener("click", testListener);
});