import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
    const [task, setTask] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (task.trim()) {
            addTodo(task);
            setTask('');
        }
    };

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="Add a todo"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};
