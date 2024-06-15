import React from 'react';

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
    return (
        <div className="Todo">
            <p
                className={task.completed ? 'completed' : ''}
                onClick={() => toggleComplete(task.id)}
            >
                {task.task}
            </p>
            <button className="edit" onClick={() => editTodo(task.id)}>Edit</button>
            <button className="delete" onClick={() => deleteTodo(task.id)}>Delete</button>
        </div>
    );
};
