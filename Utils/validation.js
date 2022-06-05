function validateActiveSlide(activeSlide) {
  const dayActivities = [];
  document.querySelectorAll("select").forEach((e, idx) => {
    if (idx === activeSlide * 2 || idx === activeSlide * 2 + 1) {
      dayActivities.push(e.value);
    }
  });
  const dayFromTimes = [];
  document.querySelectorAll("input[name='from-time']").forEach((e, idx) => {
    if (idx === activeSlide * 2 || idx === activeSlide * 2 + 1) {
      dayFromTimes.push(e.value);
    }
  });
  const dayToTimes = [];
  document.querySelectorAll("input[name='to-time']").forEach((e, idx) => {
    if (idx === activeSlide * 2 || idx === activeSlide * 2 + 1) {
      dayToTimes.push(e.value);
    }
  });

  // console.log(dayActivities);
  // console.log(dayFromTimes);
  // console.log(dayToTimes);

  const morningActivity = dayActivities[0];
  const morningFromDate = new Date(`2022-01-01T${dayFromTimes[0]}`);
  const morningToDate = new Date(`2022-01-01T${dayToTimes[0]}`);

  // Check if the morning activity is a valid time range
  if (morningActivity != "") {
    const minutes = morningToDate - morningFromDate;
    if (!(minutes > 0)) {
      return "The Morning Activity time range is invalid.";
    }
  }

  const eveningActivity = dayActivities[1];
  const eveningFromDate = new Date(`2022-01-01T${dayFromTimes[1]}`);
  const eveningToDate = new Date(`2022-01-01T${dayToTimes[1]}`);

  // Check if evening activity is a valid time range
  if (eveningActivity != "") {
    const minutes = eveningToDate - eveningFromDate;
    if (!(minutes > 0)) {
      return "The Evening Activity time range is invalid.";
    }
  }

  if (morningActivity != "" && eveningActivity != "") {
    // Check if the morning activity is finished when the evening activity is starting
    const minutesBetweenMorningAndEvening = eveningFromDate - morningToDate;
    if (!(minutesBetweenMorningAndEvening >= 0)) {
      return "The Morning Activity needs to happen and be finished before the Evening Activity is starting.";
    }
  }

  const error = document.querySelector(".error");
  error.style.display = "none";
  return true;
}

export default validateActiveSlide;
