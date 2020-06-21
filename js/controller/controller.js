export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    emptyTitleError(task) {
        if (task.title.length === 0) {
            this.view.error("Title cannot be empty");
            return true;
        }
        return false;
    }

    addTask() {
        task = view.getTask();
        if (!this.emptyTitleError(task)) {
            this.model.addTask(task);
            this.view.log("Task added");
        }
    }

    updateTask() {
        task = this.view.getTask();
        if (!this.emptyTitleError(task)) {
            this.model.updateTask(task);
            this.view.log("Task updated"); 
        }
    }

    removeTask(task) {
        this.model.removeTask(this.view.getTask());
    }
}
