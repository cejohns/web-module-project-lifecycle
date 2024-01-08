import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { input } = this.state;

    // Call the addTodo function with the input value
    this.props.addTodo(input);

    // Reset the input field after submitting
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={input} onChange={this.handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

export default Form;
