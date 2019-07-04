import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class TagForm extends Component {
  renderInput = ({ input, label }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="tag" component={this.renderInput} label="Enter tag" />
          <button className="ui button primary">Search</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "streamForm" })(TagForm);
