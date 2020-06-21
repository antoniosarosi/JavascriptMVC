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
            });
        }
    }

    setView(view) {
        this.view = view;
        return this;
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        task.id = `${++this.taskId}`;
        this.tasks.push(task);
        this.storeTasks();
        this.view.taskListChanged();
    }

    updateTask(updatedTask) {
        const task = this.tasks.find((task) => task.id == updatedTask.id);
        console.log(task);
        Object.assign(task, updatedTask);
        this.storeTasks();
        this.view.taskListChanged();
    }

    removeTask(id) {
        console.log(id);
        this.tasks = this.tasks.filter((task) => task.id != id);
        this.storeTasks();
        this.view.taskListChanged();
    }

    storeTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('lastId', `${this.taskId}`);
    }
}
