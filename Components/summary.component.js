import { capitalizeString } from "../Utils/generic.js";

// Based on a 60kg woman
const KCAL_PER_MINUTE = {
  jogging: 6,
  karate: 10,
  tennis: 7,
  swimming: 6,
  football: 7,
  handball: 12,
  volleyball: 3,
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Summary() {
  const activities = [];
  document.querySelectorAll("select").forEach((e) => {
    activities.push(e.value);
  });
  const fromTimes = [];
  document
    .querySelectorAll("input[name='from-time']")
    .forEach((e) => fromTimes.push(e.value));
  const toTimes = [];
  document
    .querySelectorAll("input[name='to-time']")
    .forEach((e) => toTimes.push(e.value));

  const summary = document.createElement("div");
  summary.classList.add("content-tab");
  summary.id = "summary";

  summary.innerHTML = "";

  WEEKDAYS.forEach((day, idx) => {
    summary.innerHTML += `<h4>${day}</h4>
      <p><span class="italic">Morning: </span>${
        activities[idx * 2] != ""
          ? `${fromTimes[idx * 2]} - ${toTimes[idx * 2]} -> ${capitalizeString(
              activities[idx * 2]
            )}`
          : "No Activity"
      }</p>
      <p><span class="italic">Evening: </span>${
        activities[idx * 2 + 1] != ""
          ? `${fromTimes[idx * 2 + 1]} - ${
              toTimes[idx * 2 + 1]
            } -> ${capitalizeString(activities[idx * 2 + 1])}`
          : "No Activity"
      }</p>`;
  });

  summary.innerHTML += `
    <div class="horizontal-line"></div>
    <div class="total-time">
    Total Workout Time: <span class="bolded">${calcTotalTime(
      activities,
      fromTimes,
      toTimes
    )}</span>
    </div>
    <div class="total-kc">
    Total Kilocalories Consumed: <span class="bolded">${calcTotalKC(
      activities,
      fromTimes,
      toTimes
    )}</span>
    </div>
  `;

  return summary;
}

function calcTotalTime(activities, fromTimes, toTimes) {
  let totalMinutes = 0;
  for (let idx = 0; idx < activities.length; idx++) {
    if (activities[idx] != "") {
      const toDate = new Date(`2022-01-01T${toTimes[idx]}`);
      const fromDate = new Date(`2022-01-01T${fromTimes[idx]}`);
      totalMinutes += Math.abs(fromDate - toDate) / 60000;
    }
  }
  const hours = totalMinutes / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours < 10 ? "0" + rhours : rhours}:${
    rminutes < 10 ? "0" + rminutes : rminutes
  }`;
}

function calcTotalKC(activities, fromTimes, toTimes) {
  let totalKC = 0;
  for (let idx = 0; idx < activities.length; idx++) {
    if (activities[idx] != "") {
      const toDate = new Date(`2022-01-01T${toTimes[idx]}`);
      const fromDate = new Date(`2022-01-01T${fromTimes[idx]}`);
      const minutes = Math.abs(fromDate - toDate) / 60000;
      totalKC += KCAL_PER_MINUTE[activities[idx]] * minutes;
    }
  }
  return totalKC;
}

export default Summary;
