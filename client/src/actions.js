module.exports = {
  loadTasks,
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
