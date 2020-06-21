const completedTasksFilter = (task) => task.completed;

const notCompletedTasksFilter = (task) => !task.completed;

const emptyFilter = () => {};

export default {
    completedTasksFilter,
    notCompletedTasksFilter,
    emptyFilter,
};
