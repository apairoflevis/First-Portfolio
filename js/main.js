// Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");

const navItems = document.querySelectorAll(".nav-item");

//Set initial state
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);
function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    //Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //Set Menu State
    showMenu = false;
  }
}

//ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    //Current index of Word
    const current = this.wordIndex % this.words.length;

    //Full text of curent word
    const fulltxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      //Remove char
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    //Insert Txt into element, use ` (next to 1 on keyboard)
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Init Type Speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed = 150;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fulltxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Brief Pause
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM Load
document.addEventListener("DOMContentLoaded", init);
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //Init Typewriter
  new TypeWriter(txtElement, words, wait);
}
