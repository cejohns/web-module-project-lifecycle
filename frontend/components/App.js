import React, { Component } from 'react';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filterCompleted: false,
      inputValue: '',
      showCompleted: true,
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Received data:', result);
        const data = result.data || []; 
        if (Array.isArray(data)) {
          this.setState({ todos: data });
        } else {
          console.error('Invalid data format received from the server:', data);
          throw new Error('Invalid data format received from the server');
        }
      })
      .catch((error) => console.error('Error fetching todos:', error));
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleAddTodo = () => {
    const { inputValue, todos } = this.state;
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        task: inputValue,
        completed: false,
      };
      this.setState({
        todos: [...todos, newTodo],
        inputValue: '',
      });
    }
  };

  handleToggleCompleted = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  handleClearCompleted = () => {
    const filteredTodos = this.state.todos.filter((todo) => !todo.completed);
    this.setState({ todos: filteredTodos });
  };

  addTodo = (name, completed = false) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, completed }),
    })
      .then((response) => response.json())
      .then((data) => this.setState((prevState) => ({ todos: [...prevState.todos, data] })))
      .catch((error) => console.error('Error adding todo:', error));
  };

  toggleCompleted = (id) => {
    fetch(`${URL}/${id}`, {
      method: 'PATCH',
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          todos: prevState.todos.map((todo) =>
            todo.id === data.id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      })
      .catch((error) => console.error('Error toggling completed:', error));
  };

  render() {
    const { todos, filterCompleted, inputValue, showCompleted } = this.state;
    const filteredTodos = filterCompleted
      ? todos.filter((todo) => todo.completed)
      : showCompleted
      ? todos
      : todos.filter((todo) => !todo.completed);

    return (
      <div>
        <h1>Todo App</h1>
        <Form onInputChange={this.handleInputChange} onAddTodo={this.addTodo} onClearCompleted={this.clearCompleted} />
        <TodoList
          todos={filteredTodos}
          onToggleCompleted={filterCompleted ? this.handleToggleCompleted : this.toggleCompleted}
        />
      </div>
    );
  }
}

export default App;
