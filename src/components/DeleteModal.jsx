import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteModal({ showModal, setShowModal, deleteStock, stockText }) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size={'sm'} centered>
      <Modal.Body className="text-center">
        <FontAwesomeIcon icon={faTrashAlt} className="text-danger fs-1" width={20} />
        <h4>Are you sure?</h4>
        <p className="mb-0">Are you sure you want to delete the {stockText}?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant=" " className="web-button text-white" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={deleteStock}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
