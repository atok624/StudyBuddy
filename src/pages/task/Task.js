import React, { useState, useEffect } from "react";
import "./Task.css";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
  };

  const completeTask = (taskToComplete) => {
    setTasks(
      tasks.map(task =>
        task === taskToComplete
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (taskToEdit) => {
    setTaskToEdit(taskToEdit);
    // Prepopulate the form with the task's details (you can create a modal or form for this)
  };

  return (
    <div className="task--container">
      <h1>Study Planner</h1>
      <TaskForm addTask={addTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
        editTask={editTask}
      />
    </div>
  );
};

export default Task
