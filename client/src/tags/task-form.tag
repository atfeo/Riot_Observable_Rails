<task-form>
  <form onsubmit={handleSubmit}>
    <input
      type="text"
      name="newTask"
      onkeyup={handleKeyup}
      placeholder="new task"
    >
    <button
      type="submit"
      disabled={!this.opts.istext}
    >
      Add Task # {this.opts.objects.length + 1}
    </button>
  </form>

  <script>
    handleSubmit() {
      if (!this.newTask.value) {
        return
      }

      this.opts.addtask(this.newTask.value)
      this.newTask.value = ''
    }

    handleKeyup() {
      this.opts.handlekeyup(this.newTask.value)
    }
  </script>
</task-form>
