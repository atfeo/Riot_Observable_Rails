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
    </li>
  </ul>

  <script>
    handleCheck(e) {
      this.opts.handlecheck(e.target.id, e.target.checked)
    }
  </script>
</task-list>
