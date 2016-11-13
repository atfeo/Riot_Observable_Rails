<task-list>
  <ul>
    <li each={task in this.opts.tasks}>
      <label class={completed: task.isComplete}>
        <input
          type="checkbox"
          id={task.id}
          checked={task.isComplete}
          onchange={handleCheck}
        >
        {task.name}
      </label>
      <button
        class="del"
        id={task.id}
        show={task.isComplete}
        onclick={handleClick}
      >
        Del
      </button>
    </li>
  </ul>

  <script>
    handleCheck(e) {
      this.opts.handlecheck(e.target.id, e.target.checked)
    }

    handleClick(e) {
      this.opts.handledeletetask(e.target.id)
    }
  </script>

  <style scoped>
    :scope .del {
      float: right;
    }
  </style>
</task-list>
