import { Modal, Button } from 'react-bootstrap';

interface ConfirmActionModal {
  itemName: string;
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

export function RemoveModal({ itemName, show, onHide, onConfirm }: ConfirmActionModal) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Remove Box</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove <strong>{itemName}</strong> ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
