class Store {
  static getData() {
    return JSON.parse(localStorage.getItem("todos"));
  }

  static addItem(todo) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static removeItem(id) {
    let todos = JSON.parse(localStorage.getItem("todos"));

    todos = todos.filter((t) => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  static toggleChecked(id) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      if (todo.id == id) {
        todo.checked = !todo.checked;
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

let init = () => {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  Store.getData().forEach((todo) => {
    let t = document.createElement("li");
    t.classList.add("w3-bar");
    t.innerHTML = `
<div class="w3-bar-item">
  <input type="checkbox" onclick="Store.toggleChecked(${todo.id})" id="${
      todo.id
    }" ${todo.checked && "checked"} />
  <label for="${todo.id}">${todo.title}</label>
</div>
<button class="w3-button w3-red w3-hover-pale-red w3-right w3-bar-item" onclick="deleteTodo(${
      todo.id
    })">
  X
</button>
    `;
    document.querySelector(".w3-ul").appendChild(t);
  });
};

let addTodo = (title) => {
  todo = { id: Math.floor(Date.now()), title, checked: false };
  Store.addItem(todo);
  let t = document.createElement("li");
  t.classList.add("w3-bar");
  t.innerHTML = `
<div class="w3-bar-item">
  <input type="checkbox" onclick="Store.toggleChecked(${todo.id})" id="${
    todo.id
  }" ${todo.checked && "checked"} />
  <label for="${todo.id}">${todo.title}</label>
</div>
<button class="w3-button w3-red w3-hover-pale-red w3-right w3-bar-item" onclick="deleteTodo(${
    todo.id
  })">
  X
</button>
    `;
  document.querySelector(".w3-ul").appendChild(t);
};

let deleteTodo = (id) => {
  Store.removeItem(id);
  document.getElementById(id).parentElement.parentElement.outerHTML = "";
};

document.querySelector("form#form").addEventListener("submit", function (e) {
  e.preventDefault();
  let input = document.querySelector("#item");
  addTodo(input.value);
  input.value = "";
});

init();
