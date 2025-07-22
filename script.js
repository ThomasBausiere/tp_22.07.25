"use strict";

// condition du bouton suivant:
let userPseudo;
let pseudoValide;
let citationValide;
let avatarValide;
let avatarSelected = false;

//? Gestion de la partie citations ----------------
//variables
const quote = document.getElementById("quote");
const quoteBtn = document.getElementById("quote-btn")
//fonction callback
function changeQuote() {
    const rand = Math.floor(Math.random() * 3); //alea pour les quotes
    let message = "";

    if (rand === 0) {
        message = "Rien ne sert de tester, il faut coder à point";
    } else if (rand === 1) {
        message = "Tel est testé qui croyait tester";
    } else {
        message = "Test qui roule n'amasse pas mousse";
    }
    quote.textContent = message;
    citationValide = true;
    checkNextBtn()
}
//Appel de la fonction
quoteBtn.addEventListener('click', changeQuote);



//? Pseudo -------------------------------------

//variables
const x= /^[A-z]+$/
const pseudo = document.querySelector('#pseudo');
const input = document.querySelector("input#pseudo")
//CallBack
function goodPseudo(){ 
    if (x.test(input.value)){
        pseudo.style.backgroundColor="green";
        pseudoValide = true;
        userPseudo = input.value;
        console.log(userPseudo);
        
    }else{
        pseudo.style.backgroundColor="red";
        pseudoValide = false;
    }
    checkNextBtn()
}
//appel de la fonction 
pseudo.addEventListener("input",goodPseudo);

//? Avatar -------------------------------------

//variables
let avatar = document.getElementsByClassName("img-avatar");
let sectionAvatar = document.getElementById("section-avatar");

//callback
function selectAvatar(){
    let clicked = event.target;
    for(let i = 0; i < avatar.length; i++){
        avatar[i].classList.remove('selected');
    }       
    clicked.classList.add('selected');
    avatarValide = true;
    checkNextBtn()
}

//appel de la fonction
sectionAvatar.addEventListener('click', selectAvatar);

//TODO Suivant
const nextBtn = document.getElementById('next');

function checkNextBtn(){
    if(pseudoValide && citationValide && avatarValide){
        nextBtn.disable = false
        nextBtn.textContent="Suivant: activé";
    }else{
        nextBtn.disable = true;
        nextBtn.textContent="Suivant: désactivé";
    }
}

//TODO Mode

const tm = document.getElementById('toggleMode');
const tmp = document.getElementById('darkmode')
function light_dark(){
    if(tm.checked){
        tmp.setAttribute("href", "./lightmode.css")
    }else{
        tmp.setAttribute("href", "./darkmode.css")
    }
}

tm.addEventListener("change", light_dark)