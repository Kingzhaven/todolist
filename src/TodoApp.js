import React, { useEffect, useState } from 'react';
import './TodoApp.css'; 
import axios from 'axios';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [categories] = useState(['Housework', 'Errands', 'Kids chore list', 'Homework', 'Grocery list']);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

// Filter todos by selected category whenever `filterCategory` changes
    useEffect(() => {
        const categoryQuery = filterCategory ? `?category=${filterCategory}` : '';
        axios.get(`http://localhost:5000/todos${categoryQuery}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, [filterCategory]);

// Add Todo item with the selected category and task
    const addTodo = (e) => {
        e.preventDefault();
        if (newTask.trim() && selectedCategory) {
            axios.post('http://localhost:5000/todos', { task: newTask, category: selectedCategory })
                .then(response => setTodos([...todos, response.data]))
                .catch(error => console.error('Error adding todo:', error));
            setNewTask('');
            setSelectedCategory('');
        }
    };

// Delete Todo item by ID
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('Error deleting todo:', error));
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>

            <div className="category-filter">
                <label htmlFor="category-select">Filter by category: </label>
                <select 
                    id="category-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <form className="todo-form" onSubmit={addTodo}>
                <input
                    type="text"
                    className="todo-input"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task" />
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='category-select'
                    required >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button type="submit" className="todo-button">
                    Add Todo
                </button>
            </form>

            <ul className="todo-list">
                {todos.map(todo => (
                    <li className="todo-item" key={todo.id}>
                        <span className="todo-text">{todo.task}</span>
                        <button 
                            className="delete-button"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
