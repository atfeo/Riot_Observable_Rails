import riot from 'riot';

import './tags/todo-app.tag';
import './tags/task-list.tag';
import './tags/loading-indicator.tag';

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

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('todo-app', { store });
});
