document.addEventListener("DOMContentLoaded", loadTasks);

        function addTask() {
            let input = document.getElementById("task-input");
            let timeInput = document.getElementById("task-time");
            let taskText = input.value.trim();
            let taskTime = timeInput.value.trim();
            
            if (taskText === "" || taskTime === "") {
                alert("Please enter both task and time.");
                return;
            }
            
            let task = { text: taskText, time: taskTime };
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            displayTask(task);
            input.value = "";
            timeInput.value = "";
        }

        function displayTask(task) {
            let li = document.createElement("li");
            li.innerHTML = '<strong>${task.text}</strong><br><span>${task.time.replace("T", " ")}</span>';
            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");
            
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.onclick = function() {
                removeTask(task);
                li.remove();
            };
            
            buttonContainer.appendChild(deleteBtn);
            li.appendChild(buttonContainer);
            document.getElementById("task-list").appendChild(li);
        }

        function loadTasks() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(displayTask);
        }

        function removeTask(taskToRemove) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(task => task.text !== taskToRemove.text || task.time !== taskToRemove.time);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        
