import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Modal, Button, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';   

import './App.css'; 


let nextId = 1; // Simple ID counter

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5); // Adjust number of tasks per page as needed

  useEffect(() => {
    setSearchResults(tasks);
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    let updatedTasks; 

    if (currentTask) {
      updatedTasks = tasks.map((t) =>
        t.id === currentTask.id ? { ...t, ...task } : t
      );
    } else {
      updatedTasks = [...tasks, { id: nextId++, ...task }];
    }

    setTasks(updatedTasks);
    setCurrentTask(null);
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setTaskIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (taskIdToDelete !== null) {
      const newTasks = tasks.filter((task) => task.id !== taskIdToDelete);
      setTasks(newTasks);
      setTaskIdToDelete(null);
    }
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setCurrentTask(null);
    setShowModal(false);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleSearch = () => {
    const filteredTasks = tasks.filter((task) =>
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredTasks);
    setCurrentPage(1); // Reset to first page when search is done
  };

  const handleSearchIconClick = () => {
    handleSearch(); // Trigger search when the icon is clicked
  };

  const refreshTasks = () => {
    setSearchResults(tasks);
    setSearchQuery('');
    setCurrentPage(1); // Reset to first page when refreshing
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks   
 = searchResults.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(searchResults.length / tasksPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <Row className="mb-0 align-items-center">
        <Col xs={12} md={6}>
          <h1>Tasks</h1>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
          <div className="d-flex align-items-center">
            <Button variant="primary" className="me-2" onClick={() => setShowModal(true)}>
              New Task
            </Button>
            <Button variant="secondary" onClick={refreshTasks}>
              Refresh
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4 align-items-center">
        <Col xs={12} md={6}>
          <p>{tasks.length} records</p>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end">
          <InputGroup style={{ width: '300px' }} className="search-input-group">
            <FormControl
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroup.Text onClick={handleSearchIconClick} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentTask ? 'Edit Task' : 'Add New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            addTask={addOrUpdateTask}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            onCancel={handleCancel}
          />
        </Modal.Body>
      </Modal>

<Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
  <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'red', color: 'white' }}>
    <Modal.Title style={{ flexGrow: 1, textAlign: 'center' }}>Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
  <Modal.Footer>
    <Button style={{ backgroundColor: 'grey', color: 'white', borderColor: 'grey' }} onClick={() => setShowConfirmModal(false)}>
      No
    </Button>
    <Button style={{ backgroundColor: 'yellow', color: 'black', borderColor: 'yellow' }} onClick={confirmDelete}>
      Yes
    </Button>
  </Modal.Footer>
</Modal>




      <TaskList
        tasks={currentTasks} // Pass only current tasks to TaskList
        deleteTask={handleDeleteClick}
        setCurrentTask={handleEditTask}
      />

      {/* Pagination Footer */}
      <div className="d-flex justify-content-end mt-4" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <Button
          variant="outline-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
          style={{ margin: '0 5px' }}
        >
          First
        </Button>
        <Button
          variant="outline-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ margin: '0 5px' }}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant="outline-primary"
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: '0 5px' }}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ margin: '0 5px' }}
        >
          Next
        </Button>
        <Button
          variant="outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          style={{ margin: '0 5px' }}
        >
          Last
        </Button>
      </div>
    </div>
  );
}

export default App;