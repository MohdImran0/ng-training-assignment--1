  import React, { useState, useEffect } from 'react';
  import { Row, Col, Button } from 'react-bootstrap';

  const TaskForm = ({ addTask, currentTask, setCurrentTask, onCancel }) => {
    const [input, setInput] = useState({
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: 'low',
      comments: ''
    });

    useEffect(() => {
      if (currentTask) {
        setInput(currentTask); // Populate form with current task details
      } else {
        setInput({
          assignedTo: '',
          status: '',
          dueDate: '',
          priority: 'low',
          comments: ''
        });
      }
    }, [currentTask]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.assignedTo.trim()) { // Validate that assigned To is not empty
        addTask({ ...input }); // Pass task data to parent component
        setCurrentTask(null); // Reset current task after adding/updating
        setInput({
          assignedTo: '',
          status: '',
          dueDate: '',
          priority: 'low',
          comments: ''
        }); // Clear form fields
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <h6>Assigned To</h6>
            <input 
              type="text" 
              className="form-control" 
              value={input.assignedTo} 
              onChange={(e) => setInput({ ...input, assignedTo: e.target.value })} 
              placeholder="Enter Name" 
              required
            />
          </Col>
          <Col>
            <h6>Status</h6>
            <select 
              className="form-select" 
              value={input.status} 
              onChange={(e) => setInput({ ...input, status: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h6>Due Date</h6>
            <input 
              type="date" 
              className="form-control" 
              value={input.dueDate} 
              onChange={(e) => setInput({ ...input, dueDate: e.target.value })} 
              required
            />
          </Col>
          <Col>
            <h6>Priority</h6>
            <select 
              className="form-select" 
              value={input.priority} 
              onChange={(e) => setInput({ ...input, priority: e.target.value })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h6>Comments</h6>
            <textarea 
              className="form-control" 
              value={input.comments} 
              onChange={(e) => setInput({ ...input, comments: e.target.value })} 
              placeholder="Enter comments"
            />
          </Col>
        </Row>

        {/* Button Section */}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    );
  };

  export default TaskForm;