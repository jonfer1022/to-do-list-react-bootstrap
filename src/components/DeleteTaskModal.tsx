import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Task } from '../utils/types';

interface DeleteTaskModalProps {
  task: Partial<Task>;
  showModal: boolean;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ task, showModal, onClose, onDelete }) => {

  const handleDelete = () => {
    if(task.id) onDelete(task.id);
    onClose();
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this task?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTaskModal;