// #1 Allah

// variables :

let divisionsBtns = Array.from(document.getElementsByClassName("division-btn"));
let tasks = []; // all tasks in html page
let tasksStorage = []; // all tasks in localStorage
let taskContainer = document.getElementById("task-container");
let newTask;
let newTaskInput = document.getElementById("newtask-input");
let colorsBox = Array.from(document.getElementsByClassName("colorbox-btn"));
let newTaskSubmit = document.getElementById("newtask-submit");
let newTaskBG;
let footerBtn = document.getElementById("footer-btn")
let footerIcon = document.getElementById("footer-icon")

let header = document.getElementById("my-header");
let footer = document.getElementById("my-footer")

let them;

///////////////////////////////////////////////////////////////////////

// functions :
//
//
// changing divisions:
function divBtnSelect(item) {
  item.onclick = function () {
    divisionsBtns.forEach(function (e) {
      e.classList.remove("active-btn");
      e.classList.add("inactive-btn");
    });
    this.classList.remove("inactive-btn");
    this.classList.add("active-btn");
    divisionChanges(this);
  };

  // drop
  item.ondragover = function (e) {
    e.preventDefault();
  };
  item.ondrop = function (e) {
    let droppedtaskTitle = e.dataTransfer.getData("taskTxt");
    let changedDiv = e.target.innerText.toLowerCase();
    let changedTask = createTask(newTaskBG, changedDiv, droppedtaskTitle);
    tasks.push(changedTask);
    taskContainer.append(changedTask);
    alert("Your task added to " + changedDiv + " divition :)");
    console.log("dropped");
  };
}
function divisionChanges(btn) {
  if (btn.classList.contains("active-btn")) {
    switch (btn.id) {
      case "daily-btn":
        tasks.forEach(function (item) {
          if (item.dataset.division != "daily") {
            item.classList.add("fade");
            setTimeout(function () {
              item.classList.add("d-none");
            }, 300);
            item.classList.remove("d-flex");
            item.classList.remove("fadeIn");
          } else {
            item.classList.remove("fade");
            item.classList.add("fadeIn");
            item.classList.add("d-flex");
          }
        });
        newTaskInput.dataset.taskdivision = "daily";
        break;

      case "weekly-btn":
        tasks.forEach(function (item) {
          if (item.dataset.division != "weekly") {
            item.classList.add("fade");
            setTimeout(function () {
              item.classList.add("d-none");
            }, 300);
            item.classList.remove("d-flex");
            item.classList.remove("fadeIn");
          } else {
            item.classList.remove("fade");
            item.classList.add("fadeIn");
            item.classList.add("d-flex");
          }
        });
        newTaskInput.dataset.taskdivision = "weekly";
        break;

      case "monthly-btn":
        tasks.forEach(function (item) {
          if (item.dataset.division != "monthly") {
            item.classList.add("fade");
            setTimeout(function () {
              item.classList.add("d-none");
            }, 300);
            item.classList.remove("d-flex");
            item.classList.remove("fadeIn");
          } else {
            item.classList.remove("fade");
            item.classList.add("fadeIn");
            item.classList.add("d-flex");
          }
        });
        newTaskInput.dataset.taskdivision = "monthly";
        break;

      default:
        break;
    }
  }
}
// changing divisions End !
//
//
// change task color :
function taskBGcolor(item) {
  item.onclick = function () {
    if (searchClassName(item, "bg-warning")) {
      newTaskInput.classList = "shadow rounded-pill bg-warning";
      newTaskBG = "bg-warning";
    }
    if (searchClassName(item, "bg-orange")) {
      newTaskInput.classList = "shadow rounded-pill bg-orange";
      newTaskBG = "bg-orange";
    }
    if (searchClassName(item, "bg-info")) {
      newTaskInput.classList = "shadow rounded-pill bg-info";
      newTaskBG = "bg-info";
    }
    if (searchClassName(item, "bg-primary")) {
      newTaskInput.classList = "shadow rounded-pill bg-primary";
      newTaskBG = "bg-primary";
    }
    if (searchClassName(item, "bg-purple")) {
      newTaskInput.classList = "shadow rounded-pill bg-purple";
      newTaskBG = "bg-purple";
    }
  };
}
function searchClassName(item, name) {
  return item.classList.contains(name);
}
// change task color End !
//
//
// new task submit | create a task :
function newTaskSub(item) {
  let inputData = newTaskInput.dataset.taskdivision;
  let inputValue = newTaskInput.value;

  if (inputValue.trim() != "") {
    newTask = createTask(newTaskBG, inputData, inputValue);
    tasks.push(newTask);
    taskContainer.append(newTask);
    newTaskInput.value = "";

    // drag
    newTask.draggable = "true";
    newTask.ondragstart = function (e) {
      e.dataTransfer.setData("taskTxt", e.target.firstChild.innerHTML);
    };
  } else {
    alert("Please write a task !!!");
  }
}
function createTask(bg, data, title, check) {
  const newTaskBox = document.createElement("article");
  const taskTitle = document.createElement("p");
  const iconBox = document.createElement("span");
  const checkIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");
  
  newTaskBox.classList = "task d-flex align-items-center fadeIn shadow-out";
  newTaskBox.classList.add(bg);
  newTaskBox.dataset.division = data;
  taskTitle.classList = "task-title mr-5 mb-0";
  taskTitle.innerHTML = title;
  iconBox.classList = "task-iconbox";
  checkIcon.classList = "fa fa-check mr-2 pointer check-icon";
  deleteIcon.classList = "fa fa-trash pointer delete-icon";
  if(check == "true"){
    taskTitle.classList.add("check")
    checkIcon.classList.add("text-success")
  }else{
    taskTitle.classList.remove("check")
    checkIcon.classList.remove("text-success")
  }
  
  iconBox.append(checkIcon, deleteIcon);
  newTaskBox.append(taskTitle, iconBox);
  
  checkIcon.onclick = checkTask;
  deleteIcon.onclick = deleteTask;
  
  const taskObj = {
    id: idSet(),
    name: title,
    dataType: data,
    background: bg,
    isChecked: "",
  };
  tasksStorage.push(taskObj);
  setLocalStorage()
  newTaskBox.setAttribute("objid", taskObj.id);

  return newTaskBox;
}
function idSet() {
  const randomNum = Math.random() * 100000;
  return Math.round(randomNum);
}
// new task submit | create a task End !
//
//
// check & delete tasks :
function checkTask(e) {
  e.target.parentElement.previousElementSibling.classList.toggle("check");
  e.target.classList.toggle("text-success");

  const taskBox = e.target.parentElement.parentElement;
  const taskId = taskBox.getAttribute("objid");
  const targetObj = tasksStorage.filter(function (e) {
    let theObj; 
    e.id == taskId ? theObj = e : null;
    return theObj;
  });
  if (targetObj[0].isChecked != "true") {
    targetObj[0].isChecked = "true";
  } else {
    targetObj[0].isChecked = "";
  }

  setLocalStorage()
}

function deleteTask(e) {
  e.target.parentElement.parentElement.remove();

  const taskBox = e.target.parentElement.parentElement;
  const taskId = taskBox.getAttribute("objid");
  const targetObj = tasksStorage.findIndex(function(e) {
    let theObj; 
    e.id == taskId ? theObj = e : null;
    return theObj;
  });
  tasksStorage.splice(targetObj, 1)

  setLocalStorage()
}
// check & delete tasks End .
//
//
// dark & light background :
function windowBG() {
  document.body.classList.toggle("bg-dark");
  if (document.body.classList.contains("bg-dark")) {
    header.classList.remove("bg-dark");
    header.classList.add("bg-secondary");
    footer.classList.remove("bg-dark");
    footer.classList.add("bg-secondary");
    footerIcon.classList = "fa fa-sun";
    footerBtn.classList.add("bg-warning")
    footerBtn.classList.remove("bg-secondary")
    localStorage.setItem("them", "dark");
  } else {
    header.classList.add("bg-dark");
    header.classList.remove("bg-secondary");
    footer.classList.add("bg-dark");
    footer.classList.remove("bg-secondary");
    footerIcon.classList = "fa fa-moon";
    footerBtn.classList.remove("bg-warning")
    footerBtn.classList.add("bg-secondary")
    localStorage.setItem("them", "light");
  }
}
// dark & light End !
//
//
// window onload :
function winLoad(e) {

  // them loading
  them = localStorage.getItem("them");
  if (them === "dark") {
    document.body.classList.add("bg-dark");
    header.classList.remove("bg-dark");
    header.classList.add("bg-secondary");
    footer.classList.remove("bg-dark");
    footer.classList.add("bg-secondary");
  } else {
    document.body.classList.remove("bg-dark");
    header.classList.add("bg-dark");
    header.classList.remove("bg-secondary");
    footer.classList.add("bg-dark");
    footer.classList.remove("bg-secondary");
  }

  // tasks loading
  let savedTasks = JSON.parse(localStorage.getItem("tasks"))
  savedTasks.forEach(function(e) {
    const taskId = e.id
    const taskName = e.name;
    const taskData = e.dataType;
    const taskBG = e.background;
    const taskCheck = e.isChecked
    let loadedtask = createTask(taskBG, taskData, taskName, taskCheck)
    tasks.push(loadedtask);
    taskContainer.append(loadedtask);
  })
}
// window onload End !
//
//
// window keyDown :
function winKey(e) {
  switch (e.keyCode) {
    case 27:
      windowBG();
      break;

    case 13:
      newTaskSub();
      break;

    default:
      break;
  }
}
// window keyDown End !
// 
// 
// set localStorage :
function setLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasksStorage))
}
// set localStorage End !

///////////////////////////////////////////////////////////////////////

// Elements calls & events :

divisionsBtns.forEach(divBtnSelect);
colorsBox.forEach(taskBGcolor);
newTaskSubmit.onclick = newTaskSub;
window.onkeydown = winKey;
window.onload = winLoad;
footerBtn.onclick = windowBG