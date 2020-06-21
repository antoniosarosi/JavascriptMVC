import Model from './model/model.js';
import View from './view/view.js';

document.addEventListener("DOMContentLoaded", (e) => {
    const model = new Model();
    const view = new View();

    model.setView(view);
    view.setModel(model);
});
