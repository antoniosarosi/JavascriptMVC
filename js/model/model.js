export default class Model {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
        this.taskId = JSON.parse(localStorage.getItem('lastId')) || 1;
        this.filters = [];

        if (!this.tasks) {
            this.tasks = [];
            this.tasks.push({ 
                id: `${this.taskId}`,
                title: 'Example Task',
                description: 'Example Description',
                completed: false,
            });
        }
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

    // View

    /**
     * @returns task list
     */
    getTasks() {
        return this.tasks;
    }

    // Controller

    /**
     * Add a new task
     * 
     * @param {Object} task 
     */
    addTask(task) {
        task.id = `${++this.taskId}`;
        this.tasks.push(task);
        this.updateData();
    }

    /**
     * Update a task
     * 
     * @param {Object} updatedTask 
     */
    updateTask(updatedTask) {
        const task = this.tasks.find((task) => task.id == updatedTask.id);
        Object.assign(task, updatedTask);
        this.updateData();
    }

    /**
     * Delete a task
     * 
     * @param {String} id 
     */
    removeTask(id) {
        this.tasks = this.tasks.filter((task) => task.id != id);
        this.updateData();
    }

    // Private

    /**
     * Stores data and notifies view
     */
    updateData() {
        this.storeTasks();
        this.view.taskListChanged();
    }

    /**
     * Store tasks in the browser
     */
    storeTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('lastId', `${this.taskId}`);
    }
}
