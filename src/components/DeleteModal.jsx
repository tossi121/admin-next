import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

function DeleteModal({ showModal, setShowModal, deleteStock, stockText }) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size={'sm'} centered>
      <Modal.Body className="text-center py-4">
        <FontAwesomeIcon icon={faTrashAlt} className="text-danger fs-1 mb-2" width={30} />
        <h4>Are you sure?</h4>
        <p className="mb-0 fs-14">Are you sure you want to delete the {stockText}?</p>
        <Row>
          <Col className='mt-4'>
            <Button variant=" " className="web-button text-white me-2" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteStock}>
              Delete
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
