import React from 'react';

export default class Todo extends React.Component {
  render() {
    return (
      <div 
        style={{ textDecoration: this.props.todo.completed ? 'line-through' : 'none' }} 
        onClick={() => this.props.toggleCompleted(this.props.todo.id)}
      >
        {this.props.todo.name}
      </div>
    );
  }
}
