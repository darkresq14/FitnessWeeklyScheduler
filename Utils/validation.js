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

  for (let idx = 0; idx < dayActivities.length; idx++) {
    if (dayActivities[idx] != "") {
      const toDate = new Date(`2022-01-01T${dayToTimes[idx]}`);
      const fromDate = new Date(`2022-01-01T${dayFromTimes[idx]}`);
      const minutes = toDate - fromDate;
      if (!(minutes > 0)) {
        return false;
      }
    }
  }

  return true;
}

export default validateActiveSlide;
