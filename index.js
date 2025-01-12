//Plug these libraries into your project
//https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js
//https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js
//https://unpkg.com/split-type

document.addEventListener('DOMContentLoaded', function() {

    let text;

function runSplit() {
let currentElement = document.querySelector(".split-lines");

// Re-initialization SplitType
text = new SplitType(currentElement, { types: "lines, words" });
document.querySelectorAll(".line").forEach(line => {
let words = line.querySelectorAll('.word');
words.forEach((word, index) => {
    if (index === words.length - 1) {
        let div = document.createElement('div');
        div.classList.add('line-mask');
        div.style.width = '0%';
        line.appendChild(div);
    }
});
});

// Applying styles depending on the screen width

currentElement.style.display = 'flex';
currentElement.style.justifyContent = 'space-between';
currentElement.style.height = '100%';
currentElement.style.flexDirection = 'column';


runReveal();
}

function runReveal() {
document.querySelectorAll(".line").forEach((line, index) => {
let lineMasks = line.querySelectorAll('.line-mask');

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: line,
        start: "top center-=250",
        end: "bottom center",
        scrub: 1,
    },
});

tl.to(lineMasks, {
    backgroundPosition: 'left',
    width: '100%',
    duration: 1,
    ease: "slow(0.7,0.7,false)",
    stagger: 0.1
});
});
}

runSplit();

window.addEventListener("resize", function () {
currentElement.style.display = '';
text.revert();
runSplit();
});

    
const cursorSmall = document.querySelector(".cursor-small");
const cursorBig = document.querySelector(".cursor-big");

console.log(cursorSmall);

// Function for checking the desktop screen
function isDesktop() {
return window.matchMedia("(min-width: 1024px)").matches;
}

function mousemoveHandler(e) {
if (!isDesktop()) return; // Exit if it's not a desktop

const target = e.target;
const tl = gsap.timeline({
defaults: {
x: e.clientX,
y: e.clientY,
ease: "power2.out"
}
});

if (target.closest(".mouse-effect")) {
tl.to(cursorSmall, { opacity: 0 })
.to(cursorBig, { opacity: 1 }, "-=0.5");
} else {
let scale = target.closest(".mouse-effect") ? 4 : 1;

tl.to(cursorSmall, { opacity: 1, scale: scale })
.to(cursorBig, { opacity: 0 }, "-=0.5");
}
}

function mouseleaveHandler() {
if (!isDesktop()) return; // Exit if it's not a desktop
console.log('Custom.js is loaded and executed');
gsap.to(cursorSmall, { opacity: 0 });
gsap.to(cursorBig, { opacity: 0 });
}

function setupEventListeners() {
if (isDesktop()) {
document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);
} else {
document.removeEventListener("mousemove", mousemoveHandler);
document.removeEventListener("mouseleave", mouseleaveHandler);
}
}

// Initialization on page load
setupEventListeners();

// Re-check when changing window size
window.addEventListener("resize", setupEventListeners);


 gsap.registerPlugin(ScrollTrigger);


const texts = document.querySelectorAll('.inner-text');

texts.forEach((text, index) => {
    gsap.to(text.querySelector('h1'), {
        scrollTrigger: {
            trigger: text,
            start: "top-=100 top", // Start animation when top of each text reaches 80% of viewport height
            end: "top-=50 top", // End animation when top reaches 60% of viewport height
            scrub: true,
        },
        y: 100, // Move down by 100 pixels
        
        ease: "none"
    });
});

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const scaleValue = isMobile ? 3 : 4;
ScrollTrigger.create({
    animation: gsap.from(".logo",{
        y: "80vh",
        scale: scaleValue
        
    }),
    scrub: true,
    trigger: ".content",
    start: "top bottom",
    endTrigger: ".content",
    end: "top top",
    
});        
});