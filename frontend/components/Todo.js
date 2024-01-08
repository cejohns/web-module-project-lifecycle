import React from 'react';

class Todo extends React.Component {
  render() {
    const { todo, onToggleCompleted, toggleCompleted } = this.props;
    console.log('Todo:', todo); // Add this line for debugging

    return (
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => (onToggleCompleted ? onToggleCompleted(todo.id) : toggleCompleted(todo.id))}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.task || todo.name}
        </span>
      </div>
    );
  }
}

export default Todo;
