let rootContainerEl = document.getElementById("rootContainer");
let inputTodoEl = document.getElementById("inputTodo");

// let todoList = [
//      {
//           title:"HTML",
//           id:1
//      },
//      {
//           title:"CSS",
//           id:2
//      },
//      {
//           title:"BOOTSTRAP",
//           id:3
//      }
// ]

function getTodoList(){
     let myTodoList = localStorage.getItem("myTodo");
     if(myTodoList === null){
          return [];
     }
     else{
          let parsedTodo = JSON.parse(myTodoList);
          return parsedTodo;
     }
}

let todoList = getTodoList();

function onSaveTodo(){
     let strTodo = JSON.stringify(todoList);
     localStorage.setItem("myTodo",strTodo);
}

function onTodoStatusChange(checkboxId,titleId,todoId){
     let checkboxIdEl = document.getElementById(checkboxId);
     let titleIdEl = document.getElementById(titleId);
     // console.log(checkboxIdEl);
     if(checkboxIdEl.checked === true){
          titleIdEl.classList.add("checked");
     }
     else{
          titleIdEl.classList.remove("checked");
     }

     let todoIndex = todoList.findIndex(function(each){
          let myTodoId = "todo" + each.id;
          if(myTodoId === todoId){
               return true;
          }
          else{
               return false;
          }
     })
     // console.log(todoIndex);

     let selectedTodo = todoList[todoIndex];
     // console.log(selectedTodo);
     if(selectedTodo.isChecked === true){
          selectedTodo.isChecked = false;
     }
     else{
          selectedTodo.isChecked = true;
     }
     
     
     
}

function onDeleteTodo(todoId,deleteId){
     let todoIdEl = document.getElementById(todoId)
     let deleteIdEl = document.getElementById(deleteId);
     // console.log(todoIdEl);
     // console.log(deleteId);
     rootContainerEl.removeChild(todoIdEl);
     todoList.shift(deleteIdEl);
     
}

function onAppendTodo(todo){
     let checkboxId = "checkbox" + todo.id;
     let titleId = "title" + todo.id;
     let todoId = "todo" + todo.id;
     let deleteId = "delete" + todo.id;

     let listContEl = document.createElement("li");
     listContEl.classList.add("list-cont");
     listContEl.id = todoId;
     rootContainerEl.appendChild(listContEl);

     let checkboxEl = document.createElement("input");
     checkboxEl.type = "checkbox";
     checkboxEl.id = checkboxId;
     if(todo.isChecked===true){
          checkboxEl.checked = true;
     }
     listContEl.appendChild(checkboxEl);

     let labelEl = document.createElement("label");
     labelEl.classList.add("label-cont");
     labelEl.htmlFor = checkboxId;
     checkboxEl.onclick = function(){
          onTodoStatusChange(checkboxId,titleId,todoId);
     }
     listContEl.appendChild(labelEl);

     let titleEl = document.createElement("h5");
     titleEl.textContent = todo.title;
     titleEl.id = titleId;
     if(todo.isChecked===true){
          titleEl.classList.add("checked");
     }
     labelEl.appendChild(titleEl);

     let deleteBtnEl = document.createElement("button");
     deleteBtnEl.classList.add("delete-btn");
     deleteBtnEl.id = deleteId;
     deleteBtnEl.onclick = function(){
          onDeleteTodo(todoId,deleteId);
     }
     labelEl.appendChild(deleteBtnEl);

     //<i class="fa-solid fa-trash"></i>
     let deleteIconEl = document.createElement("i");
     deleteIconEl.classList.add("fa-solid","fa-trash");
     deleteBtnEl.appendChild(deleteIconEl);
}

function onAddTodo(){
     let myTodo = inputTodoEl.value.toUpperCase();
     let myDate = new Date();
     let uniqueId = Math.ceil(Math.random()*myDate.getTime());
     // console.log(uniqueId);
     
     let newTodo = {
          title: myTodo,
          id: uniqueId,
          isChecked: false
     }

     onAppendTodo(newTodo);
     todoList.push(newTodo);
     inputTodoEl.value = "";
}

for(let each of todoList){
     onAppendTodo(each);
}