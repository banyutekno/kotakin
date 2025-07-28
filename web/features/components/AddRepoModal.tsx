import { Button } from 'react-bootstrap';

interface ModalRepo {
  onAdd: () => void;
  onCancel: () => void;
}

export function AddRepoModal({ onCancel, onAdd }: ModalRepo) {
  return (
    <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="modal-wrapper column-bg p-4 rounded shadow">
        <h5 className="text-light mb-5 d-flex align-items-center justify-content-center">Add Repository</h5>
        <input type="text" className="form-control mb-3 " placeholder="Id" />
        <input type="text" className="form-control mb-3 " placeholder="Name" />
        <input type="text" className="form-control mb-3" placeholder="URL" />
        <input type="text" className="form-control mb-3" placeholder="Maintainer" />
        <div className="d-flex justify-content-end mt-5">
          <Button variant="secondary" onClick={onCancel} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" onClick={onAdd}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
