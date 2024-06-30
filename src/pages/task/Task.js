// src/pages/task/Task.js
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./Task.css";

const Task = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        return Array.isArray(parsedTasks) ? parsedTasks : [];
      } catch (e) {
        console.error("Error parsing tasks from localStorage", e);
        return [];
      }
    }
    return [];
  });

  const [taskToEdit, setTaskToEdit] = useState(null); // State for editing

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div className="task--container">
      <h1>Study Planner</h1>
      <TaskForm
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
      />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
        editTask={setTaskToEdit} // Pass setTaskToEdit to TaskList
      />
    </div>
  );
};

export default Task;
