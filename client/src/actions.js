module.exports = {
  loadTasks,
  addTask,
  textExists,
};

function loadTasks(store) {
  toggleLoading(store, true);
  $.ajax({
    url: '/api/tasks.json',
    dataType: 'json',
    success: (res) => {
      setTimeout(() => {
        tasksloaded(store, res.tasks);
        toggleLoading(store, false);
      }, 2000)
    },
    error: (xhr, status, err) => {
      toggleLoading(store, false);
      console.log('/api/tasks.json', status, err.toString());
    },
  });
}

function tasksloaded(store, tasks) {
  store.trigger('TASKS_LOADED', { data: tasks });
}

function toggleLoading(store, isLoading) {
  store.trigger('TOGGLE_LOADING', { data: isLoading });
}

function addTask(store, newTask) {
  toggleLoading(store, true);
  $.ajax({
    url: '/api/tasks.json',
    type: 'POST',
    dataType: 'json',
    data: { name: newTask },
    success: (res) => {
      newTaskAdded(store, res.id, res.name);
      toggleLoading(store, false);
    },
    error: (xhr, status, err) => {
      toggleLoading(store, false);
      console.log('/api/tasks.json', status, err.toString());
    },
  });
}

function newTaskAdded(store, id, name) {
  store.trigger('TASK_ADDED', { data: { id, name } });
}

function textExists(store, value) {
  store.trigger('TEXT_EXISTS', { data: value });
}
