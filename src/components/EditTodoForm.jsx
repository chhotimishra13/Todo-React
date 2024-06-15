import React, { useState } from 'react';

export const EditTodoForm = ({ editTask, task }) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = e => {
        e.preventDefault();
        editTask(value, task.id);
    };

    return (
        <form className="EditTodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Edit todo"
            />
            <button type="submit">Update Todo</button>
        </form>
    );
};
