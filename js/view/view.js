export default class View {
    constructor() {
        this.domTaskList = document.getElementById('task-list');
        this.dataTaskList = [];
        this.currentTask = {};

        this.addBtn = document.getElementById('add');
        this.saveBtn = document.getElementById('save');

        this.titleInput = document.getElementById('title');
        this.descriptionInput = document.getElementById('description');
    }

    /**
     * Entry point
     */
    view() {
        this.addBtn.addEventListener('click', () => {
            this.saveBtn.setAttribute('action', 'add');
            this.titleInput.value = '';
            this.descriptionInput.value = '';
        });

        this.saveBtn.addEventListener('click', () => {
            this.currentTask.title = this.titleInput.value;
            this.currentTask.description = this.descriptionInput.value;

            if (this.saveBtn.getAttribute('action') == 'add') {
                this.controller.addTask();
            } else {
                this.controller.updateTask();
            }

            $('#modal').modal('toggle');
        });
    }

    /**
     * Changes the model from where the view gets data
     * 
     * @param {Model} model 
     */
    setModel(model) {
        this.model = model;
        this.taskListChanged();
        return this;
    }

    /**
     * Sets a new controller
     * 
     * @param {Controller} controller 
     */
    setController(controller) {
        this.controller = controller;
        return this;
    }

    /**
     * Returns the task data that the user has typed
     * 
     * @returns {Object} task
     */
    getTask() {
        return this.currentTask;
    }

    /**
     * Notifies the view about new data
     */
    taskListChanged() {
        this.dataTaskList = this.model.getTasks();
        this.domTaskList.innerHTML = '';
        this.dataTaskList.forEach((task) => {
            this.domTaskList.appendChild(this.createTaskCard(task));
        });
    }

    /**
     * Filters selected by the user
     */
    getFilters() {
        return [];
    }

    /**
     * Displays an error on the view
     * 
     * @param {String} err 
     */
    error(err) {
        console.log(err);
    }

    /**
     * Displays a message for the user
     * 
     * @param {String} msg 
     */
    log(msg) {
        console.log(msg);
    }

    /**
     * Creates a Bootstrap card to display info about a task
     * 
     * @param {Object} task
     */
    createTaskCard(task) {
        const container = document.createElement('div');
        container.classList.add('col-md-4', 'mb-3');

        const card = document.createElement('div');
        card.classList.add('card', 'text-center');

        container.appendChild(card);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        card.appendChild(cardBody);

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title', 'text-capitalize');
        cardTitle.innerText = task.title;

        cardBody.appendChild(cardTitle);

        const cardDescription = document.createElement('p');
        cardDescription.classList.add('m-2');
        cardDescription.innerText = task.description;

        cardBody.appendChild(cardDescription);

        const completedCheckboxContainer = document.createElement('div');
        completedCheckboxContainer.classList.add('form-check');

        cardBody.appendChild(completedCheckboxContainer);

        const completedCheckboxInput = document.createElement('input');
        completedCheckboxInput.classList.add('form-check-input', 'mt-1');
        completedCheckboxInput.setAttribute('type', 'checkbox');
        completedCheckboxInput.setAttribute('id', `checkbox${task.id}`);

        completedCheckboxContainer.appendChild(completedCheckboxInput);

        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.classList.add('form-check-label', 'ml-1');
        checkBoxLabel.setAttribute('for', `checkbox${task.id}`);

        const labelText = document.createElement('p');
        labelText.classList.add('text-muted');
        labelText.innerText = 'Completed';

        checkBoxLabel.appendChild(labelText);
        completedCheckboxContainer.appendChild(checkBoxLabel);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-2', 'mr-1');
        editBtn.innerText = 'Edit';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.addEventListener('click', () => {
            this.currentTask.id = `${task.id}`;
            this.titleInput.value = task.title;
            this.descriptionInput.value = task.description;
    
            this.saveBtn.setAttribute('action', 'edit');
        });

        cardBody.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'mb-2', 'ml-1');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
            this.currentTask.id = task.id;
            this.controller.removeTask();
        }); 

        cardBody.appendChild(deleteBtn);

        return container;
    }
}
