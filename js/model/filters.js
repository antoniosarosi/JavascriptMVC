const completedTasksFilter = (task) => task.completed;

const notCompletedTasksFilter = (task) => !task.completed;

const emptyFilter = (task) => {};

export default {
    completedTasksFilter,
    notCompletedTasksFilter,
    emptyFilter,
};
