const toDoForm = document.querySelector(".js-toDoForm"),
  toDoinput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".pending"),
  finishedList = document.querySelector(".finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDos = []; //pendings
let done = []; //finished

function deleteToDo(event, who) {
  const btn = event.target;
  const li = btn.parentNode;
  if (who === "finished") {
    finishedList.removeChild(li);
    const cleanToDos = done.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    done = cleanToDos;
    saveToDos("FINISHED");
  } else if (who === "pending") {
    pendingList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos("PENDING");
  }
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span").innerText;
  paintToDo(text, "finished");
  deleteToDo(event, "pending");
}

function backToPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span").innerText;
  paintToDo(text, "pending");
  deleteToDo(event, "finished");
}

function saveToDos(LS_KEY) {
  if (LS_KEY === "PENDING") {
    localStorage.setItem(LS_KEY, JSON.stringify(toDos));
  } else if (LS_KEY === "FINISHED") {
    localStorage.setItem(LS_KEY, JSON.stringify(done));
  }
}

function paintToDo(text, who) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", (e) => deleteToDo(e, who));
  const span = document.createElement("span");
  span.innerText = text;
  const newId = who === "pending" ? toDos.length + 1 : done.length + 1;
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  li.appendChild(span);
  li.appendChild(delBtn);
  if (who === "pending") {
    const finishBtn = document.createElement("button");
    finishBtn.innerHTML = "✅";
    finishBtn.addEventListener("click", finishToDo);
    li.appendChild(finishBtn);
    pendingList.appendChild(li);
    toDos.push(toDoObj);
    saveToDos(PENDING_LS);
  } else if (who === "finished") {
    const backBtn = document.createElement("button");
    backBtn.innerHTML = "⏪";
    backBtn.addEventListener("click", backToPending);
    li.appendChild(backBtn);
    finishedList.appendChild(li);
    done.push(toDoObj);
    saveToDos(FINISHED_LS);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintToDo(currentValue, "pending");
  toDoinput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending !== null) {
    const parsedToDos = JSON.parse(loadedPending);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, "pending");
    });
  }
  if (loadedFinished !== null) {
    const parsedToDos = JSON.parse(loadedFinished);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, "finished");
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
