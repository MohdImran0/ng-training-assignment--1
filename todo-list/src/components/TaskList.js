import React from 'react';
import { Button } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, setCurrentTask, toggleTaskCompletion }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th></th> {/* Empty header for the checkbox column */}
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center">No tasks available</td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input 
                  type="checkbox" 
                  checked={task.completed || false} // Ensure 'completed' is initialized
                  onChange={() => toggleTaskCompletion(task.id)} // Call function to toggle completion
                />
              </td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="me-2" 
                  onClick={() => setCurrentTask(task)} // Set task for editing and open modal
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => deleteTask(task.id)} // Use task.id for deletion
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TaskList;