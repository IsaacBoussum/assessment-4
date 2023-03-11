


const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton");
const goalForm = document.getElementById("goalForm");
const goalInput = document.getElementById("goalInput");
const deadlineInput = document.getElementById("deadlineInput");
const goalList = document.getElementById("goalList");


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};



const submitGoal = (event) => {
    event.preventDefault();

    const goal = goalInput.value;
    const deadline = deadlineInput.value;

    axios.post("http://localhost:4000/api/goals", { goal, deadline })
        .then(res => {
            
            const newGoal = res.data;

            const listItem = document.createElement("li");
            listItem.innerText = `${newGoal.goal}  ${newGoal.deadline}`;
            goalList.appendChild(listItem);

            const completeBtn = document.createElement("button");
            completeBtn.innerText = "Complete";
            completeBtn.addEventListener("click", () => {
              axios
                .put(`http://localhost:4000/api/goals/${newGoal.id}`, { completed: true })
                .then(() => {
                  listItem.style.color = "green";
                })
                .catch((error) => {
                  console.error(error);
                });
            });
           

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => {
                axios.delete(`http://localhost:4000/api/goals/${newGoal.id}`)
                    .then(() => {
                        listItem.remove();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
            
            
            listItem.appendChild(completeBtn);
            listItem.appendChild(deleteButton);
            goalList.appendChild(listItem);

            goalInput.value = "";
            deadlineInput.value = "";
        });
};








goalForm.addEventListener('submit', submitGoal)
complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener("click", getFortune);
