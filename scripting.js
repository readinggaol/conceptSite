"use strict";

const $ = (selector) => document.querySelector(selector);


const toggleDropdown = () =>{
	document.getElementById("droplinks").classList.toggle("show");
}


document.addEventListener("DOMContentLoaded", () => {
	$("#quizdrop").addEventListener("click", toggleDropdown);
});