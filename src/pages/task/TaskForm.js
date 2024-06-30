// src/pages/task/TaskForm.js
import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask, editTask, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate.split("T")[0]);
      setCategory(taskToEdit.category);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && dueDate && category) {
      const updatedTask = taskToEdit
        ? {
            ...taskToEdit,
            title,
            description,
            dueDate: new Date(dueDate).toISOString(),
            category,
          }
        : {
            id: Date.now(),
            title,
            description,
            dueDate: new Date(dueDate).toISOString(),
            category,
            completed: false,
            created: new Date().toISOString(),
          };

      if (taskToEdit) {
        editTask(updatedTask); // Call editTask prop
        setTaskToEdit(null); // Reset taskToEdit after editing
      } else {
        addTask(updatedTask);
      }

      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("");
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <input
          type="date"
          value={dueDate}
          min={today}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {["Math", "Science", "History", "English"].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
