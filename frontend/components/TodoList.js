import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    // Check if todos is an array
    if (!Array.isArray(todos)) {
      // Handle the error or return null or some placeholder
      return <div>Todo list is not available at the moment.</div>;
    }

    return (
      <div>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} toggleCompleted={this.props.toggleCompleted} />
        ))}
      </div>
    );
  }
}
