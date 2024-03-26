import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Task } from '../utils/types';

interface TaskModalProps {
  show: boolean;
  action: string;
  task?: Partial<Task>;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ show, action, onClose, onSave, task }) => {
  const [title, setTitle] = useState(action === 'edit' ? task?.title : '');
  const [description, setDescription] = useState(action === 'edit' ? task?.description : '');
  const [status, setStatus] = useState(action === 'edit' ? task?.status : 'pending');

  useEffect(() => {
    if (action === 'edit') {
      setTitle(task?.title || '');
      setDescription(task?.description || '');
      setStatus(task?.status || 'pending');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [action, task]);

  const handleSave = () => {
    const newTask: Partial<Task> = {
      id: action === 'edit' ? task?.id : null,
      title,
      description,
      status,
    };
    onSave(newTask);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'edit' ? 'Edit Task' : 'Create Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {action === 'edit' ? 'Save Changes' : 'Create Task'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;