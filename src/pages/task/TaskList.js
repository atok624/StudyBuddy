import React from "react";

const TaskList = ({ tasks, deleteTask, completeTask, editTask }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className={`task ${task.completed ? "completed" : ""}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Category: {task.category}</p>
          <button onClick={() => completeTask(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => editTask(task)}>Edit</button>
          <button onClick={() => deleteTask(task)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
