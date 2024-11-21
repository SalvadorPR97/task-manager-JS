import "./style.css";
const allDivs = document.querySelectorAll("div");
allDivs[0].className = "container";
allDivs[1].className = "search";
allDivs[2].className = "li-container";
const divNoPendingTasks = allDivs[3];
divNoPendingTasks.className = "empty";
allDivs[4].className = "task-count";

let taskList;
console.log(localStorage);
if (localStorage.getItem("taskList") === null) {
    localStorage.setItem("taskList", "");
} else {
    taskList = localStorage.getItem("taskList").split(",");
}


let ulTasks = document.querySelector("ul");

const addButton = document.querySelector("button");
addButton.className = "btn-add";

const txtField = document.querySelector("input");
txtField.value = "";

const allSpans = document.querySelectorAll("span");
const spanCounter = allSpans[1];

if (taskList[0] != "") {
    taskList.forEach((task) => {
        addTask(task);
    });
}

spanCounter.textContent = ulTasks.childElementCount;
spanCounter.textContent == 0
    ? (divNoPendingTasks.style.display = "block")
    : (divNoPendingTasks.style.display = "none");
function countTask() {
    spanCounter.textContent = ulTasks.childElementCount;
    spanCounter.textContent == 0
        ? (divNoPendingTasks.style.display = "block")
        : (divNoPendingTasks.style.display = "none");
    taskList = [];
    let spanList = document.querySelectorAll(".spanTask");
    spanList.forEach((span) => {
        taskList.push(span.textContent);
    })
    localStorage.clear();
    localStorage.setItem("taskList", taskList);
}

function addTask(txtTask) {
    const newLi = document.createElement("li");
    const newP = document.createElement("p");
    newP.addEventListener("click", () => {
        newSpan.style.textDecoration == "line-through"
            ? (newSpan.style.textDecoration = "none")
            : (newSpan.style.textDecoration = "line-through");
    });
    const newSpan = document.createElement("span");
    newSpan.className = "spanTask";
    newSpan.textContent = txtTask;
    const closeButton = document.createElement("button");
    closeButton.className = "btn-delete";
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
        ulTasks.removeChild(newLi);
        countTask();
    });
    newP.append(newSpan);
    newLi.append(newP, closeButton);
    ulTasks.append(newLi);
}

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (txtField.value != "") {
        addTask(txtField.value);
        countTask();
        txtField.value = "";
    }
});