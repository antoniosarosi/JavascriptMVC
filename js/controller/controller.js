export default class Controller {
    constructor() {

    }

    /**
     * Set view
     * 
     * @param {View} view 
     */
    setView(view) {
        this.view = view;
        return this;
    }

    /**
     * Set model
     * 
     * @param {Model} model 
     */
    setModel(model) {
        this.model = model;
        return this;
    }

    // View

    /**
     * Adds task if no error
     */
    addTask() {
        const task = this.view.getTask();
        if (!this.emptyTitleError(task)) {
            this.model.addTask({ 
                id: task.id,
                title: task.title,
                description: task.description,
             });
            this.view.log("Task added");
        }
    }

    /**
     * Updates task if there is no error
     */
    updateTask() {
        const task = this.view.getTask();
        console.log(task);
        if (!this.emptyTitleError(task)) {
            this.model.updateTask({
                id: task.id,
                title: task.title,
                description: task.description,
            });
            this.view.log("Task updated"); 
        }
    }

    /**
     * Delete task
     */
    removeTask() {
        this.model.removeTask(this.view.getTask().id);
    }

    // Private

    /**
     * Check if task has empty title
     * 
     * @param {Object} task
     * 
     * @returns true if empty title, false otherwise
     */
    emptyTitleError(task) {
        if (task.title.length === 0) {
            this.view.error("Title cannot be empty");
            return true;
        }
        return false;
    }
}
