const Value=document.getElementById("text");
 const listItems = document.getElementById("list-items");
 const addUpdateClick = document.getElementById("AddUpdateClick");
 const AlertMessage = document.getElementById("AlertMessage");
let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData"));
if(!todoData) {
    todoData = [];
}

Value.addEventListener("keypress", function(e){
    SetAlertMessage("");
    if(e.key === "Enter"){
        addUpdateClick.click();
    }
});
ReadToDoItems();

function ReadToDoItems() {
    todoData.forEach((element) => {
let li = document.createElement("li");
let style = "";
if (element.status){
    style = "style='text-decoration: line-through'";
}
const todoItems = `<div  ondblclick="CompleteTodoItems(this)" >${element.item}</div>
   ${style === "" ? '<div><img class="edit todo-controls" onclick="UpdateToDoItems(this)"  src="/image/pencil.jpg"  /><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/image/delete.png" /></div>' : ""}`;
li.innerHTML = todoItems;
listItems.appendChild(li);
    });
}


function CreateToDoData() {
    if (Value.value === "") {
        SetAlertMessage ("Please Enter your text!") ;
        Value.focus();
      
    }
    let li = document.createElement("li");
    const todoItems = `<div ondblclick="CompleteTodoItems(this)">${Value.value}</div><div><img class="edit todo-controls" onclick="UpdateToDoItems(this)"  src="image/pencil.jpg" /><img class="delete  todo-controls" onclick="DeleteToDoItems(this)" src="/image/delete.png" /></div> `;

    li.innerHTML =todoItems;
    listItems.appendChild(li);
    

if(!todoData) {
    todoData = [];
}
    let dataItem = {item: Value.value, status: false };
    todoData.push(dataItem);
    setLocalStorage();

    Value.value ="";
    SetAlertMessage("todo created successfully.");
}



 function CompleteToDoItems(e) {
    if(e.parentElement.querySelector("div").style.textDecoration === "") {
        e.parentElement.querySelector("div").style.textDecoration = "line-through"
        e.parentElement.querySelector("img.edit").remove();

        todoData.forEach((element)=>{
if(
    e.parentElement.querySelector("div").innerText.trim() == element.item
){
element.status = true;
}
        });
        setLocalStorage();
 }
}

 function UpdateOnSelectionItems(){

todoData.forEach(element => {
    if(element.item == updateText.innerText.trim()){
       element.item = Value.value; 
    }
 });

 setLocalStorage();
 updateText.innerText = Value.value;
addUpdateClick.setAttribute("onclick", "CompleteToDoItems()");
addUpdateClick.setAttribute("src", "/image/plus.png");
Value.value = "";

}

 function UpdateToDoItems(e){
if(e.parentElement.parentElement.querySelector("div").style.textDecoration ===
 ""
){
    Value.value =  
e.parentElement.parentElement.querySelector("div").innerText;
addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
addUpdateClick.setAttribute("src", "/image/refresh.png");
updateText = e.parentElement.parentElement.querySelector("div");
Value.focus();
 }
}

 function DeleteToDoItems(e) {
    let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;
    if (confirm('Are you sure?. Do you want to delete this ${deleteValue}!')){
        e.parentElement.parentElement.parentElement.querySelector("li").remove();
        e.parentElement.parentElement.setAttribute("class", "deleted-item");
        Value.focus();

        todoData.forEach((element)=>{
            if(element.item == deleteValue.trim()){
             todoData.splice(element, 1);   
            }
        });
        setLocalStorage();
  }
 }
 function setLocalStorage() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
}
function SetAlertMessage(message){
    AlertMessage.removeAttribute("class");
    AlertMessage.innerText = message;


    setTimeout(() => {
        AlertMessage.classList.add("togggleMe");
    }, 1000);
}

 