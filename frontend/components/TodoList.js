import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  render() {
    const { todos, onToggleCompleted, toggleCompleted } = this.props;

    return (
      <div>
        <h2>Todo List</h2>
        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} onToggleCompleted={onToggleCompleted || toggleCompleted} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;