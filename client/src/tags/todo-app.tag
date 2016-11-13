<todo-app>
  <h3>Todo List</h3>
  <task-form
    addtask={this.handleNewTask}
    handlekeyup={handleInputForm}
    objects={this.state.tasks}
    istext={this.state.isText}
  >
  </task-form>
  <button
    class="del"
    onclick={handleDeleteTasks}
    disabled={this.state.tasks.filter(complete).length == 0}
  >
    Del Tasks X {this.state.tasks.filter(complete).length}
  </button>
  <div style="clear: both"></div>
  <error-message
    message={this.state.errorMessage}
    iserror={this.state.isError}
  >
  </error-message>
  <loading-indicator loading={this.state.isLoading}></loading-indicator>
  <task-list
    tasks={this.state.tasks}
    handlecheck={handleTaskCompletionChange}
    handledeletetask={handleDeleteTask}
  >
  </task-list>

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

    handleTaskCompletionChange(id, isComplete) {
      actions.toggleComplete(store, id, isComplete)
    }

    complete(task) {
      return task.isComplete == true
    }

    handleDeleteTasks() {
      let ids = []
      const comp = this.state.tasks.filter((task) => this.complete(task))
      for (let i = 0; i < comp.length; i += 1) {
        ids[i] = comp[i].id
      }
      actions.deleteTasks(store, ids)
    }

    handleDeleteTask(id) {
      actions.deleteTask(store, id)
    }
  </script>
</todo-app>
