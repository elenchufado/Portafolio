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
Parallax (uses pageYOffset instead of window.scrollY for CrossPlatform)
**/
const worksText = document.getElementsByClassName('works-text')[0]
window.addEventListener("scroll", function () {
  let bodyHeight = document.body.offsetHeight
  let value = (window.pageYOffset / (bodyHeight)) * 100;
  worksText.style.setProperty("--scroll", value + "%");
})

/**
Scrolling 3d cards
**/
const cardsTrigger = document.querySelector("#accordion");
const currCardsTrigger = cardsTrigger.getBoundingClientRect().top + window.pageYOffset;
window.addEventListener("resize", scrollGrid);
window.addEventListener("scroll", scrollGrid);

function scrollGrid() {
  let bodyHeight = document.body.offsetHeight,
    //mainHeight = document.querySelector(".clients").offsetHeight,
    cards = document.querySelector(".cards"),
    //transY = (window.pageYOffset / (mainHeight - bodyHeight)) * -10000;
    transY = (window.pageYOffset / (bodyHeight)) * -150;

  if (window.pageYOffset > currCardsTrigger) {
    cards.style.setProperty("--scroll", transY + "%");
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

hamburger.addEventListener('click', () => {
  //Animate Links
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', () => {
    //Animate Links
    navLinks.classList.remove("open");
    links.forEach(link => {
      link.classList.remove("fade");
    });
    //Hamburger Animation
    hamburger.classList.remove("toggle");
  });
}

/**
Page Loader
**/
window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.querySelector(".loader-container");
    loader.className += " hidden";
    const bodyScroll = document.querySelector(".loading-scroll");
    bodyScroll.className -= "loading-scroll";
  }, 5000);
})