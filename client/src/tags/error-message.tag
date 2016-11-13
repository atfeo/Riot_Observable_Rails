<error-message>
  <div show={this.opts.iserror}>
    {this.opts.message}
  </div>

  <style scoped>
    :scope div {
      margin-top: 5px;
      padding-left: 10px;
      color: white;
      background-color: red;
    }
  </style>
</error-message>
