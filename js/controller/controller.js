export default class Controller {
  constructor() {}

  setView(view) {
    this.view = view;
    return this;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  // View

  addTask() {
    const task = this.view.getTask();
    if (!this.emptyTitleError(task)) {
      this.model.addTask(task);
      this.view.log("Task added");
    }
  }

  updateTask() {
    const task = this.view.getTask();
    if (!this.emptyTitleError(task)) {
      this.model.updateTask(task);
      this.view.log("Task updated");
    }
  }

  removeTask() {
    this.model.removeTask(this.view.getTask().id);
  }

  // Private

  emptyTitleError(task) {
    if (task.title.length === 0) {
      this.view.error("Title cannot be empty");
      return true;
    }
    return false;
  }
}
