export function getFromLocalStorage() {
  const activities = JSON.parse(localStorage.getItem("activities"));
  const fromTimes = JSON.parse(localStorage.getItem("fromTimes"));
  const toTimes = JSON.parse(localStorage.getItem("toTimes"));

  if (activities && fromTimes && toTimes) {
    return { activities, fromTimes, toTimes };
  } else {
    return { activities: [], fromTimes: [], toTimes: [] };
  }
}

export function saveToLocalStorage() {
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

  localStorage.setItem("activities", JSON.stringify(activities));
  localStorage.setItem("fromTimes", JSON.stringify(fromTimes));
  localStorage.setItem("toTimes", JSON.stringify(toTimes));
}

export function clearLocalStorage() {
  localStorage.removeItem("activities");
  localStorage.removeItem("fromTimes");
  localStorage.removeItem("toTimes");
}
