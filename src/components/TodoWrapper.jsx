import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import '../App.css'; 

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('date');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = task => {
        const newTodo = { id: uuidv4(), task, completed: false, isEditing: false, date: new Date() };
        setTodos([...todos, newTodo]);
    };

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: false } : todo));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        return true;
    });

    const sortedTodos = filteredTodos.sort((a, b) => {
        if (sort === 'alphabetical') return a.task.localeCompare(b.task);
        return new Date(a.date) - new Date(b.date);
    });

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            <div>
                <button className="filter" onClick={() => setFilter('all')}>All</button>
                <button className="filter" onClick={() => setFilter('completed')}>Completed</button>
                <button className="filter" onClick={() => setFilter('active')}>Active</button>
                <button className="sort" onClick={() => setSort('date')}>Sort by Date</button>
                <button className="sort" onClick={() => setSort('alphabetical')}>Sort by Alphabetical</button>
            </div>
            {sortedTodos.map(todo => (
                todo.isEditing ? (
                    <EditTodoForm editTask={editTask} task={todo} key={todo.id} />
                ) : (
                    <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};
