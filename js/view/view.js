export default class View {
    constructor() {
        this.domTaskList = document.getElementById('task-list');
        this.dataTaskList = [];
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

    taskListChanged() {
        this.dataTaskList = this.model.getTasks();
        this.domTaskList.querySelectorAll('*').forEach((node) => node.remove());
        this.dataTaskList.forEach((task) => {
            this.domTaskList.appendChild(this.createTaskCard(task));
        });
    }

    getFilters() {
        return [];
    }

    createTaskCard(task) {
        const container = document.createElement('div');
        container.classList.add('col-md-4', 'mb-3');
        container.setAttribute('id', `${task.id}`);

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

        cardBody.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'mb-2', 'ml-1');
        deleteBtn.innerText = 'Delete';

        cardBody.appendChild(deleteBtn);

        return container;
    }
}
