import riot from 'riot';

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

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('todo-app', { store });
});
