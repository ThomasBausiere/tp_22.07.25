"use strict";

//!Variables ----------------------------------------------------------
// condition du bouton suivant:
let pseudoValide = false;
let citationValide = false;
let avatarValide = false;
// DOM-Selector:
//? Citations ----------------
const quote = document.getElementById("quote");
const quoteBtn = document.getElementById("quote-btn");
const quoteSection = document.getElementById("citation")

//? Pseudo -------------------
const pseudo = document.querySelector('#pseudo');
const input = document.querySelector("input#pseudo");
const pseudoSection = document.getElementById("section-pseudo")

//? Avatar -------------------
const avatar = document.getElementsByClassName("img-avatar");
const sectionAvatar = document.getElementById("section-avatar");

//? NextBtn -----------------
const nextBtn = document.getElementById('next');

//? Mode ---------------------
const tm = document.getElementById('toggleMode');
const tmp = document.getElementById('darkmode')

//? Profil ---------------------
const prof = document.getElementById('profil');
const userp = document.querySelector(".user_pseudo");
const userq = document.querySelector(".user_quotation");
const usera = document.querySelector(".user_avatar");

//User Data
let avatarSelected="";
let userPseudo="";
let quoteSelected="";
let witchPage = false;


//utils
const x= /^[A-z]+$/;


//!Callbacks ----------------------------------------------------------
//? Citations ----------------
function changeQuote() {
    const rand = Math.floor(Math.random() * 3); //alea pour les quotes
    let message = "";

    if (rand === 0){
        message = "Rien ne sert de tester, il faut coder à point";
    } 
    else if (rand === 1) {
        message = "Tel est testé qui croyait tester";
    } 
    else {
        message = "Test qui roule n'amasse pas mousse";
    }
    quote.textContent = message;
    citationValide = true; // <= dependance du NextBtn
    quoteSelected = message; // <= Stockage de data                 //TODO
    localStorage.setItem('quoteSelected', quoteSelected);
    checkNextBtn()
}
//? Pseudo -------------------
function goodPseudo(){ 
    if (x.test(input.value)){
        pseudo.style.backgroundColor="green";
        pseudoValide = true; //<= dependance du NextBtn
        userPseudo = input.value; // Stockage de data
        localStorage.setItem('userPseudo', userPseudo);             //TODO
        console.log(userPseudo);
        
    }else{
        pseudo.style.backgroundColor="red";
        pseudoValide = false;
    }
    checkNextBtn()
}
//? Avatar -------------------
function selectAvatar(){
    let clicked = event.target;
    for(let i = 0; i < avatar.length; i++){
        avatar[i].classList.remove('selected');
    }       
    clicked.classList.add('selected');
    avatarValide = true; // <= dependance du NextBtn
    avatarSelected = clicked.getAttribute("src"); // Stockage de data
    localStorage.setItem('avatarSelected', avatarSelected);                 //TODO
    checkNextBtn()
}
//? NextBtn ----------------- 
function nextStep(){
  if(!witchPage){
      quoteSection.style.display="none";
      pseudoSection.style.display="none";
      sectionAvatar.style.display="none";
      prof.style.display="flex";
      userp.textContent = userPseudo;
      userq.textContent = quoteSelected;
      usera.setAttribute("src", avatarSelected);
      nextBtn.textContent = "retour";
      witchPage = true;
  }else{
      prof.style.display="none";
      quoteSection.style.display="";
      pseudoSection.style.display="";
      sectionAvatar.style.display="";
      nextBtn.textContent = "Désactivé";
      witchPage = false;
  }


}
//? Mode ---------------------
function light_dark(){
    if(tm.checked){
        tmp.setAttribute("href", "./lightmode.css")
    }else{
        tmp.setAttribute("href", "./darkmode.css")
    }
}

//? Storage ------------------ 
                                                                 //TODO 
function checkStorage(){
    if(localStorage.getItem("quoteSelected")){
        quoteSelected = localStorage.getItem("quoteSelected")
    }
    if(localStorage.getItem("userPseudo")){
        userPseudo = localStorage.getItem("userPseudo")
    }
    if(localStorage.getItem("avatarSelected")){
        avatarSelected =localStorage.getItem("avatarSelected")
    }
}

//! Events Listeners ----------------------------------------------------------

//? Citations ----------------
quoteBtn.addEventListener('click', changeQuote);
//? Pseudo -------------------
pseudo.addEventListener("input",goodPseudo);
//? Avatar -------------------
sectionAvatar.addEventListener('click', selectAvatar);
//? Next Btn ----------------- 
nextBtn.addEventListener('click', nextStep);
//? Mode ---------------------
tm.addEventListener("change", light_dark)
//? Storage ------------------
window.addEventListener('DOMcontentloaded', checkStorage)            //TODO 



//! Fonctions ----------------------------------------------------------
// MAJ de l'état du bouton Suivant
function checkNextBtn(){ 
    if(pseudoValide && citationValide && avatarValide){
        nextBtn.disabled=false;
        nextBtn.textContent="Suivant: activé";
    }else{
        nextBtn.disabled=true;
        nextBtn.textContent="Suivant: désactivé";
    }
}









