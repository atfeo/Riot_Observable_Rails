<todo-app>
  <h3>Todo List</h3>
  <task-form
    addtask={this.handleNewTask}
    handlekeyup={handleInputForm}
    objects={this.state.tasks}
    istext={this.state.isText}
  >
  </task-form>
  <loading-indicator loading={this.state.isLoading}></loading-indicator>
  <task-list tasks={this.state.tasks}></task-list>

  <script>
    const actions = require('../actions.js')
    const store = this.opts.store

    this.on('mount', () => {
      actions.loadTasks(store)
    })

    store.on('*', () => {
      this.state = store.getState()
      this.update()
    })

    handleNewTask(task) {
      actions.addTask(store, task)
    }

    handleInputForm(value) {
      actions.textExists(store, value)
    }
  </script>
</todo-app>
