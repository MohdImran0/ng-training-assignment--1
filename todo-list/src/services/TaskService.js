import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

// Create a new task
const createTask = (task) => {
  const newTask = {
    AssignedTo: task.assignedTo,
    Status: task.status,
    DueDate: task.dueDate,
    Priority: task.priority,
    Comments: task.comments
  };

  return axios.post(API_URL, newTask)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating task:', error);
      throw error;
    });
};

// Update an existing task
const updateTask = (taskId, task) => {
  const updatedTask = {
    AssignedTo: task.assignedTo,
    Status: task.status,
    DueDate: task.dueDate,
    Priority: task.priority,
    Comments: task.comments
  };

  return axios.put(`${API_URL}/${taskId}`, updatedTask)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating task:', error);
      throw error;
    });
};

// Delete a task
const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting task:', error);
      throw error;
    });
};

const TaskService = {
  createTask,
  updateTask,
  deleteTask,
};

export default TaskService;
