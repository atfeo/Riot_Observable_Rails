import riot from 'riot';

import './tags/todo-app.tag';
import './tags/task-list.tag';
import './tags/loading-indicator.tag';
import './tags/task-form.tag';
import './tags/error-message.tag';

class Store {
  constructor() {
    this.state = { tasks: [] };
    riot.observable(this);
  }

  getState() {
    return this.state;
  }

  setState(value) {
    this.state = Object.assign({}, this.state, value);
  }
}

const store = new Store();

store.on('TASKS_LOADED', (tasks) => {
  store.setState({ tasks: tasks.data });
});

store.on('TOGGLE_LOADING', (action) => {
  store.setState({ isLoading: action.data });
});

store.on('TASK_ADDED', (action) => {
  store.setState({ tasks: store.getState().tasks.concat(action.data) });
});

store.on('TEXT_EXISTS', (action) => {
  store.setState({ isText: action.data });
});

store.on('TASK_COMPLETION_CHANGED', (action) => {
  const taskIndex = store.getState().tasks.findIndex((task) => {
    return task.id == action.data.id;
  });
  const newTasks = [
    ...store.getState().tasks.slice(0, taskIndex),
    Object.assign({}, store.getState().tasks[taskIndex], { isComplete: action.data.isComplete }),
    ...store.getState().tasks.slice(taskIndex + 1),
  ];
  store.setState({ tasks: newTasks });
});

store.on('SHOW_ERROR', (action) => {
  store.setState({ isError: true, errorMessage: action.data });
});

store.on('HIDE_ERROR', () => {
  store.setState({ isError: false, errorMessage: '' });
});

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('todo-app', { store });
});
