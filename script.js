let list = document.querySelector("ul.list");
let btnAdd = document.getElementById("btnAdd");
let listTask = [
  {
    content: "content task 1",
    status: "doing",
  },
  {
    content: "content task 2",
    status: "complete",
  },
];

// Check if there's data of listTask in local storage
if (localStorage.getItem("listTask") != null) {
  listTask = JSON.parse(localStorage.getItem("listTask"));
}

// Function for saving the data/tasks to local storage so that after refresh/re-open, data doesn't disappear
function saveLocalStorage() {
  localStorage.setItem("listTask", JSON.stringify(listTask));
}

btnAdd.onclick = (event) => {
    event.preventDefault(); //Everytime we click the button, the page refreshes, to avoid that preventdefualt is used
    
    let content = document.getElementById("task").value; //Get the value written in text area

    if(content != ''){
        listTask.unshift({ //Used unshift to add the task in the beginning of the array
            content: content,
            status: "doing"
        })
    }

    addTaskToHTML(); //It will refresh the page

    document.getElementById("task").value = ""; //Delete the content in the text area

    saveLocalStorage(); //To save the data in the local storage
}

// Function to add tasks
function addTaskToHTML() {
  list.innerHTML = "";
  listTask.forEach((task, index) => {
    let newTask = document.createElement("li");
    newTask.classList.add(task.status);
    newTask.innerHTML = `
        <div class="complete-icon" onclick="completeTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div class="content">${task.content}</div>
          <div class="close-icon" onclick="deleteTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
          `;
          list.appendChild(newTask);
  });
}

addTaskToHTML();

// When a task is completed, run completeTask function and change the status to complete
function completeTask(index){
    listTask[index].status = "complete"; // Changes the status to complete

    addTaskToHTML(); //Refreshes the page

    saveLocalStorage(); // Save the data to local storage
}

// Delete a task
function deleteTask(index){
    listTask = listTask.filter((task, newIndex) => {
        return newIndex != index
    }); //It takes out the task from the list whose index is clicked

    addTaskToHTML(); // Refreshes the page

    saveLocalStorage(); // Save the data to local storage
}