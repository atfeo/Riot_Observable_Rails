module.exports = {
  loadTasks,
  addTask,
  textExists,
  toggleComplete,
  deleteTasks,
  deleteTask,
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
      tempErrorMessage(store, 'API Error');
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
      tempErrorMessage(store, 'API Error');
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

function toggleComplete(store, id, isComplete) {
  $.ajax({
    url: `/api/tasks/${id}`,
    type: 'PATCH',
    dataType: 'json',
    data: { isComplete },
    success: (res) => {
      completeChanged(store, res.id, res.isComplete);
    },
    error: (xhr, status, err) => {
      tempErrorMessage(store, 'API Error');
      completeChanged(store, id, !isComplete);
      console.log(`/api/tasks/${id}`, status, err.toString());
    },
  });
}

function completeChanged(store, id, isComplete) {
  store.trigger('TASK_COMPLETION_CHANGED', { data: { id, isComplete } });
}

function showError(store, message) {
  store.trigger('SHOW_ERROR', { data: message });
}

function hideError(store) {
  store.trigger('HIDE_ERROR');
}

function tempErrorMessage(store, message) {
  showError(store, message);
  setTimeout(() => {
    hideError(store);
  }, 2000);
}

function deleteTasks(store, ids) {
  $.ajax({
    url: '/api/tasks/del_tasks',
    type: 'DELETE',
    dataType: 'json',
    data: { ids },
    success: () => {
      deletedTasks(store, ids);
    },
    error: (xhr, status, err) => {
      toggleLoading(store, false);
      tempErrorMessage(store, 'API Error');
      console.log('/api/tasks/del_tasks', status, err.toString());
    },
  });
}

function deletedTasks(store, ids) {
  store.trigger('DELETED_TASKS', { data: ids });
}

function deleteTask(store, id) {
  toggleLoading(store, true);
  $.ajax({
    url: `/api/tasks/${id}`,
    type: 'DELETE',
    dataType: 'json',
    success: () => {
      deletedTask(store, id);
      toggleLoading(store, false);
    },
    error: (xhr, status, err) => {
      toggleLoading(store, false);
      tempErrorMessage(store, 'API Error');
      console.log('/api/tasks/del_tasks', status, err.toString());
    },
  });
}

function deletedTask(store, id) {
  store.trigger('DELETED_TASK', { data: id });
}
