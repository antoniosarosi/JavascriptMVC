export default class Model {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks"));
    this.id = 1;
    if (this.tasks) {
      this.id = this.tasks[this.tasks.length - 1].id + 1;
    } else {
      this.tasks = [
        {
          id: 0,
          title: "Example Task",
          description: "Example Description",
          completed: false,
        },
      ];
    }
  }

  setView(view) {
    this.view = view;
    return this;
  }

  // View

  getTasks() {
    return [...this.tasks];
  }

  // Controller

  addTask(task) {
    task.id = ++this.id;
    this.tasks.push(task);
    this.updateData();
  }

  updateTask(updatedTask) {
    const task = this.tasks.find((task) => task.id === updatedTask.id);
    Object.assign(task, updatedTask);
    this.updateData();
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.updateData();
  }

  updateData() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    this.view.taskListChanged();
  }
}
