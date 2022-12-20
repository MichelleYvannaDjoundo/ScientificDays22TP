
// import {v4 as uuidv4} from 'uuid';

// let myuuid = uuidv4();

// console.log('Your UUID is: ' + myuuid);
type Task = {
    id: number
    title: string
    completed: boolean
    createdAt: Date
}
const list = document.querySelector("#list")
const form = document.getElementById("#new-task-form") as HTMLFormElement | null
const input = document.querySelector("#new-task-title") as HTMLInputElement

const tasks: Task[]= []

const button = document.querySelector("[type='button']")

form?.addEventListener("submit", e => { e.preventDefault()})
button?.addEventListener("click", (e) => {
    
    e.preventDefault();

    if(input.value == "" || input.value == null) return

    const newTask : Task = {
        id: 0,
        title: input.value,
        completed:false,
        createdAt: new Date()
    }
    tasks.push(newTask)
    addListItem(newTask)
    input.value = ""
})
function addListItem(task: Task){
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change", () =>{
        task.completed = checkbox.checked
        saveTasks()
        console.log(tasks)
    } )
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)

}

function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(){
    const taskJSON = localStorage.getItem("TASKS")
    if(taskJSON == null) return []
    return JSON.parse(taskJSON)
}