class Store {
	static getItems() {
		return JSON.parse(localStorage.getItem("todos")) || []
	}

	static addItem(title) {
		let todo = {id: Date.now(), title, checked: false};
		let todos = this.getItems();
		todos.push(todo)
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	static removeItem(id) {
		let todos = this.getItems();
		todos = todos.filter(i => i.id !== id);
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	static checkItem(id) {
		let todos = this.getItems();
		todos.forEach(todo => {
			if (todo.id === id) {
				todo.checked = !todo.checked
			}
		});
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	static syncItemsToUI() {
		let todos = this.getItems();
		let ul = document.querySelector(".w3-ul")
		ul.innerHTML = ''
		if (todos.length === 0) ul.innerHTML = `<li><span class="w3-center">You have no items</span></li>`
		todos.forEach(todo => {
			let li = document.createElement("li")
			li.classList.add("w3-bar")
			li.innerHTML = `<div class="w3-bar-item"><input onclick="Store.checkItem(${todo.id})" type="checkbox" id="${todo.id}" ${todo.checked && "checked"}> <label for="${todo.id}" class="text">${todo.title}</label></div> <button class="w3-button w3-red w3-hover-pale-red w3-right w3-bar-item" onclick="deleteItem(${todo.id})">X</button>`
			ul.appendChild(li)
		})
	}
};

document.getElementById("form").addEventListener("submit", function (e) {
	e.preventDefault();
	let input = document.getElementById("addinput");
	Store.addItem(input.value);
	input.value = ""
	Store.syncItemsToUI();
});

function deleteItem(id) {
	Store.removeItem(id);
	Store.syncItemsToUI();
}

Store.syncItemsToUI();