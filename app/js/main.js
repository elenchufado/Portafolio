import '../styles/style.css'
import './cat3d.js'
import './lantern3d.js'

/**
ScrollMagic
**/
const controllerScroll = new ScrollMagic.Controller();

// create a scene
const worksCat = new ScrollMagic.Scene({
        triggerElement: ".works",
        triggerHook: 0.6
    })
    .setClassToggle(".works-intro", 'animatron') //add class
    //.addIndicators({name: "CAT HERE"})
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


//sticky
/*const stickyElem = document.querySelector(".intro-text-inner");

/* Gets the amount of height
of the element from the
viewport and adds the
pageYOffset to get the height
relative to the page */
/*const currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset;
window.onscroll = function() {

    /* Check if the current Y offset
    is greater than the position of
    the element */
    /*if(window.pageYOffset > currStickyPos) {
        stickyElem.style.position = "fixed";
        stickyElem.style.top = "0px";
        stickyElem.style.right = "50vw";
    } else {
        stickyElem.style.position = "relative";
        stickyElem.style.top = "initial";
    }
}*/


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
    transY = (window.pageYOffset / (bodyHeight)) *-110;


  if(window.pageYOffset > currCardsTrigger) {
	cards.style.setProperty("--scroll",transY + "%");
  //console.log(transY);
  }

}
scrollGrid();


/**
Play all videos
**/
// Get all videos.
const videos = document.querySelectorAll('video');

// Create a promise to wait all videos to be loaded at the same time.
// When all of the videos are ready, call resolve().
let promise = new Promise(function(resolve) {
  const loaded = 0;

  videos.forEach(function(v) {
    v.addEventListener('loadedmetadata', function() {
      loaded++;

      if (loaded === videos.length) {
        resolve();
      }
    });
  });
});

// Play all videos one by one only when all videos are ready to be played.
promise.then(function() {
  videos.forEach(function(v) {
    v.play();
  });
});
