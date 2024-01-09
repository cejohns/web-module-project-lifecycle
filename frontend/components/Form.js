import React from 'react';

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.addTodo}>
        <input 
          type="text" 
          value={this.props.inputText} 
          onChange={this.props.handleInputChange} 
        />
        <button type="submit">Add Todo</button>
        <button type="button" onClick={this.props.clearCompleted}>Clear Completed</button>
      </form>
    );
  }
}
