export default class Model {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.filters = [];
        this.taskId = 1;

        this.tasks.push({ 
            id: this.taskId,
            title: 'Example Task',
            description: 'Example Description',
        });
    }

    setView(view) {
        this.view = view;
        return this;
    }

    getTasks() {
        this.filters = this.view.getFilters();
        const filteredTasks = [...this.tasks];
        this.filters.forEach((filter) => filteredTasks.filter(filter));

        return filteredTasks;
    }

    addTask(task) {
        task.id = ++this.taskId;
        this.tasks.push(task);
        this.storeTasks();
        this.view.taskListChanged();
    }

    updateTask(updatedTask) {
        const index = this.tasks.find((task) => task.id === updatedTask.id);
        this.tasks[index] = updatedTask;
        this.storeTasks();
        this.view.taskListChanged();
    }

    removeTask(taskToRemove) {
        this.tasks.filter((task) => task.id === taskToRemove.id);
        this.storeTasks();
        this.view.taskListChanged();
    }

    storeTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}
