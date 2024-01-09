import React from 'react';
import TodoList from './TodoList';
import Form from './Form';

export default class App extends React.Component {
  state = {
    todos: [
      { id: 1528817077286, name: 'Organize Garage',  completed: false },
      { id: 1528817084358, name: 'Bake Cookies',  completed: false }
    ],
    inputText: ''
  };

  componentDidMount() {
    fetch('http://localhost:9000/api/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        if (result && Array.isArray(result.data)) {
          this.setState({ todos: result.data });
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => console.error('Error:', error));
  }

  toggleCompleted = (id) => {
    fetch(`http://localhost:9000/api/todos/${id}`, {
      method: 'PATCH'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      if (result && result.data && result.data.id) {
        this.setState(prevState => ({
          todos: prevState.todos.map(todo => 
            todo.id === id ? result.data : todo
          )
        }));
      } else {
        throw new Error('Invalid data structure received from PATCH request');
      }
    })
    .catch(error => console.error('Error:', error));
  };
  

  addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      name: this.state.inputText,
      completed: false // default value
    };
  
    fetch('http://localhost:9000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      // Make sure result.data contains the new todo object
      if (result && result.data && result.data.id) {
        this.setState(prevState => ({
          todos: [...prevState.todos, result.data],
          inputText: ''
        }));
      } else {
        throw new Error('Invalid data structure received from POST request');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed)
    });
  };

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos} toggleCompleted={this.toggleCompleted} />
        <Form 
          addTodo={this.addTodo} 
          inputText={this.state.inputText} 
          handleInputChange={this.handleInputChange} 
          clearCompleted={this.clearCompleted} 
        />
      </div>
    );
  }
}
