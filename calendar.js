const calContainer = document.querySelector(".js-calendar"),
  calTitle = calContainer.querySelector("h1");

function getCalendar() {
  const d = new Date(),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    date = d.getDate(),
    day = d.toString().substring(0, 3);
  calTitle.innerText = `${year}.${month}.${date} ${day}`;
}

function init() {
  getCalendar();
}
init();
