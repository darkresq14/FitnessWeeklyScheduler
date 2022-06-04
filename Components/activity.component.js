function Activity(time, activity = null, from = null, to = null) {
  const newNode = document.createElement("div");
  newNode.classList.add("activity-container");
  newNode.innerHTML = `
  <div class="activity-time">${time}</div>
  <div class="div-form">
    <div class="form-option">
      <label for="activity" class="form-label">Activity</label>
      <select name="activity" class="form-control">
        <option selected value></option>
        <option value="jogging" ${
          activity === "jogging" ? 'selected="selected"' : ""
        }>Jogging</option>
        <option value="karate" ${
          activity === "karate" ? 'selected="selected"' : ""
        }>Karate</option>
        <option value="tennis" ${
          activity === "tennis" ? 'selected="selected"' : ""
        }>Tennis</option>
        <option value="swimming" ${
          activity === "swimming" ? 'selected="selected"' : ""
        }>Swimming</option>
        <option value="football" ${
          activity === "football" ? 'selected="selected"' : ""
        }>Football</option>
        <option value="handball" ${
          activity === "handball" ? 'selected="selected"' : ""
        }>Handball</option>
        <option value="volleyball" ${
          activity === "volleyball" ? 'selected="selected"' : ""
        }>Volleyball</option>
      </select>
    </div>
    <div class="form-option">
      <label for="from-time" class="form-label">From</label>
      <input name="from-time" type="time" class="form-control" value="${
        from ? from : ""
      }">
    </div>
    <div class="form-option">
      <label for="to-time" class="form-label">To</label>
      <input name="to-time" type="time" class="form-control" value="${
        to ? to : ""
      }">
    </div>
  </div>
  `;
  return newNode;
}

export default Activity;
