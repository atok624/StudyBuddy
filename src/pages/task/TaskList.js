import React, { useState } from "react";
import "./TaskList.css";

const TaskList = ({ tasks, deleteTask, completeTask, editTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    priority: '',
  });

  const closeModal = () => {
    setSelectedTask(null);
    setEditingTask(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    editTask({
      ...editingTask, // Keep existing properties of editingTask
      ...editedTask    // Update with edited properties
    });
    closeModal();
  };

  if (!tasks || tasks.length === 0) {
    return <div>No tasks to display.</div>;
  }

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-card-content" onClick={() => setSelectedTask(task)}>
            <span className="task-title">{task.title}</span>
            <span className="task-status">Status: {task.completed ? "Completed" : "Incomplete"}</span>
          </div>
          <div className="task-actions">
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            <button className="complete-button" onClick={() => completeTask(task.id)}>
              {task.completed ? "Incomplete" : "Complete"}
            </button>
            <button className="edit-button" onClick={() => {
              setEditingTask(task);
              setEditedTask({
                title: task.title,
                description: task.description,
                priority: task.priority,
              });
            }}>Edit</button>
          </div>
        </div>
      ))}
      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedTask.title}</h2>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Status:</strong> {selectedTask.completed ? "Completed" : "Incomplete"}</p>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editedTask.description}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Priority:
              <input
                type="text"
                name="priority"
                value={editedTask.priority}
                onChange={handleEditChange}
              />
            </label>
            <button className="save-button" onClick={handleEditSubmit}>Save</button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
