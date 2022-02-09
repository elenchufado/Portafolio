import '../styles/style.css'
import './cat3d.js'
import './lantern3d.js'

/**
ScrollMagic
**/
const controllerScroll = new ScrollMagic.Controller();
// create a scene
const stickyDuration = document.getElementsByClassName('about-me')[0].offsetHeight;
const stickyTotem = new ScrollMagic.Scene({
        triggerElement: "#totem",
        triggerHook: -1,
        duration: stickyDuration
    })
    //.setClassToggle("#totemCanvas", 'stick') //add class
    .setPin("#totemCanvas")
    //.addIndicators({name: "sticky"})
    .addTo(controllerScroll);

const navAppear = new ScrollMagic.Scene({
        triggerElement: "#works",
    })
    .setClassToggle(".nav", 'display-nav') //add class
    //.addIndicators({name: "nav"})
    .addTo(controllerScroll);

const worksAppear = new ScrollMagic.Scene({
        triggerElement: "#works",
        triggerHook: -1,
        reverse: false
    })
    //.setClassToggle("#totemCanvas", 'stick') //add class
    .setClassToggle("#accordion", 'slideInLeft')
    //.addIndicators({name: "works"})
    .addTo(controllerScroll);

const contactAppear = new ScrollMagic.Scene({
        triggerElement: "#contact-me",
        reverse: false
    })
    //.setClassToggle("#totemCanvas", 'stick') //add class
    .setClassToggle(".content-left", 'slideInLeft')
    //.addIndicators({name: "contact"})
    .addTo(controllerScroll);

/**
Parallax
**/
const catBg = document.getElementsByClassName('cat-image')[0].style
const worksText = document.getElementsByClassName('works-text')[0]

window.addEventListener("scroll", function() {
  let value = window.scrollY
  catBg.bottom = '-' + value/80 + '%'
  worksText.style.top = value/40 + '%'
})

/**
Scrolling 3d cards
**/
const cardsTrigger = document.querySelector("#accordion");
const currCardsTrigger = cardsTrigger.getBoundingClientRect().top + window.pageYOffset;
window.addEventListener("resize",scrollGrid);
window.addEventListener("scroll",scrollGrid);

function scrollGrid() {
  let bodyHeight = document.body.offsetHeight,
		//mainHeight = document.querySelector(".clients").offsetHeight,
		cards = document.querySelector(".cards"),
		//transY = (window.pageYOffset / (mainHeight - bodyHeight)) * -10000;
    transY = (window.pageYOffset / (bodyHeight)) *-150;

  if(window.pageYOffset > currCardsTrigger) {
	cards.style.setProperty("--scroll",transY + "%");
  //console.log(transY);
  }
}
scrollGrid();

/**
Menu
**/
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});

/**
Page Loader
**/
window.addEventListener("load", function(){
  const loader = document.querySelector(".loader-container");
  loader.className += " hidden";
  const bodyScroll = document.querySelector(".loading-scroll");
  bodyScroll.className -= "loading-scroll"
})
