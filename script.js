import Activity from "./Components/activity.component.js";
import Summary from "./Components/summary.component.js";
import {
  clearLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./Utils/persistance.js";
import validateActiveSlide from "./Utils/validation.js";

const SLIDES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Summary",
];

let activeSlide = 0;

const content = document.querySelector(".content");

// Initiate Activities
const { activities, fromTimes, toTimes } = getFromLocalStorage();

for (let i = 0; i < SLIDES.length - 1; i++) {
  const contentTab = document.createElement("div");
  contentTab.classList.add("content-tab");
  contentTab.id = SLIDES[i];
  if (i === 0) {
    contentTab.classList.add("show");
  }
  contentTab.appendChild(
    Activity(
      "Morning",
      activities[2 * i] ? activities[2 * i] : null,
      fromTimes[2 * i] ? fromTimes[2 * i] : null,
      toTimes[2 * i] ? toTimes[2 * i] : null
    )
  );
  contentTab.appendChild(
    Activity(
      "Evening",
      activities[2 * i + 1] ? activities[2 * i + 1] : null,
      fromTimes[2 * i + 1] ? fromTimes[2 * i + 1] : null,
      toTimes[2 * i + 1] ? toTimes[2 * i + 1] : null
    )
  );
  content.appendChild(contentTab);
}

// Calculate Summary
function createSummary() {
  const summary = Summary();
  content.appendChild(summary);
}

// Button Listeners
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const clearBtn = document.querySelector(".cls");

previousBtn.addEventListener("click", () => {
  if (validateActiveSlide(activeSlide)) {
    activeSlide--;
    handleSlideChange();
  } else {
    alert(
      "If a activity has been selected you must also select a From Time and a to Time. The From Time has to be before the To Time."
    );
  }
});

nextBtn.addEventListener("click", () => {
  if (validateActiveSlide(activeSlide)) {
    activeSlide++;
    handleSlideChange();
  } else {
    alert(
      "If a activity has been selected you must also select a From Time and a to Time. The From Time has to be before the To Time."
    );
  }
});

clearBtn.addEventListener("click", () => clearLocalStorage());

// Tab Listeners
const menuItems = document.querySelectorAll("li");
menuItems.forEach((mi, idx) => {
  mi.addEventListener("click", () => {
    if (validateActiveSlide(activeSlide)) {
      activeSlide = idx;
      handleSlideChange();
    } else {
      alert(
        "If a activity has been selected you must also select a From Time and a to Time. The From Time has to be before the To Time."
      );
    }
  });
});

// Slide Change Functions
function handleSlideChange() {
  handleButtons();
  handleTabs();
  showCurrentSlide();
  saveToLocalStorage();
}

function handleButtons() {
  previousBtn.innerText = SLIDES[activeSlide - 1];
  nextBtn.innerText = SLIDES[activeSlide + 1];

  if (activeSlide === SLIDES.length - 1) {
    nextBtn.classList.add("hidden");
    previousBtn.classList.remove("hidden");
  } else if (activeSlide < 1) {
    previousBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    previousBtn.classList.remove("hidden");
  }
}

function handleTabs() {
  menuItems.forEach((mi, idx) => {
    if (activeSlide === idx) {
      mi.classList.add("active");
    } else {
      mi.classList.remove("active");
    }
  });
}

function showCurrentSlide() {
  const contentTabs = document.querySelectorAll(".content-tab");
  contentTabs.forEach((ct, idx) => {
    if (idx === activeSlide) {
      ct.classList.add("show");
    } else {
      ct.classList.remove("show");
    }
  });

  if (activeSlide === SLIDES.length - 1) {
    createSummary();
    const summary = document.querySelector("#summary");
    summary.classList.add("show");
  } else {
    const summary = document.querySelector("#summary");
    if (summary != null) {
      summary.remove();
    }
  }
}
