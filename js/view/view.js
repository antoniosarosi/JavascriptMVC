export default class View {
  constructor() {
    this.list = document.getElementById("task-list");
    this.modalTitle = document.getElementById("modal-title");
    this.modalDescription = document.getElementById("modal-description");
    this.saveBtn = document.getElementById("save");

    this.task = {}
    this.tasks = [];
  }

  setModel(model) {
    this.model = model;
    this.taskListChanged();
    return this;
  }

  setController(controller) {
    this.controller = controller;
    return this;
  }

  editEvent(e) {
    const id = Number(e.target.attributes.task.value);
    const task = this.tasks.find((task) => task.id === id);

    this.modalTitle.value = task.title;
    this.modalDescription.value = task.description;
    this.saveBtn.setAttribute("action", "edit");
    this.saveBtn.setAttribute("task", id);
  }

  addTask() {
    this.modalTitle.value = "";
    this.modalDescription.value = "";
    this.saveBtn.setAttribute("action", "add");
  }

  saveTask() {
    const id = Number(this.saveBtn.attributes.task.value);
    this.task = {
      id,
      title: this.modalTitle.value,
      description: this.modalDescription.value,
      completed: false,
    };

    if (this.saveBtn.attributes.action.value === "add") {
      this.controller.addTask();
    } else {
      this.controller.updateTask();
    }

    $('#modal').modal('toggle');
  }

  deleteTask(e) {
    this.task.id = Number(e.target.attributes.task.value);
    this.controller.removeTask();
  }

  addListeners() {
    for (const btn of document.getElementsByClassName("edit")) {
      btn.addEventListener("click", (e) => this.editEvent(e));
    }

    for (const btn of document.getElementsByClassName("delete")) {
      btn.addEventListener("click", (e) => this.deleteTask(e));
    }
  }

  render() {
    document.getElementById("add")
      .addEventListener("click", (e) => this.addTask());

    this.addListeners();

    this.saveBtn.addEventListener("click", (e) => this.saveTask());
  }

  // Model

  taskListChanged() {
    this.tasks = this.model.getTasks();
    this.list.innerHTML = '';
    this.createCards().forEach((card) => this.list.appendChild(card));
    this.addListeners();
  }

  // Controller

  getTask() {
    return this.task;
  }

  error(err) {
    console.log(err);
  }

  log(msg) {
    console.log(msg);
  }

  // Private

  createCards() {
    return this.tasks.map((task) => {
      const div = document.createElement("div");
      div.classList.add("col-md-4", "mb-3");
      div.innerHTML = `
        <div class="card text-center">
          <div class="card-body">
            <h3 task="${task.id}" class="card-title">${task.title}</h3>
            <p task="${task.id}" class="m-2">${task.description}</p>
            <div class="form-check">
              <input
                class="form-check-input mt-1"
                type="checkbox"
                task="${task.id}"
                ${task.completed ? "checked" : ""}
              />
              <label class="form-check-label ml-1" for="check${task.id}">
                <p class="text-muted">Completed</p>
              </label>
            </div>
            <button
              task="${task.id}"
              class="btn btn-primary mb-2 edit"
              data-toggle="modal"
              data-target="#modal"
            >
              Edit
            </button>
            <button class="btn btn-danger mb-2 delete" task="${task.id}">
              Delete
            </button>
          </div>
        </div>
      `;

      return div;
    });
  }
}
