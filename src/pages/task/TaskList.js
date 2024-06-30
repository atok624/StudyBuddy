// src/pages/task/TaskList.js
import React from 'react';

const TaskList = ({ tasks, deleteTask, completeTask, editTask }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No tasks to display.</div>;
  }

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.title}</span>
          {/* Additional task details and actions */}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => completeTask(task.id)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => editTask(task)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
