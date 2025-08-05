import { Badge, Button } from 'react-bootstrap';
import { BProgress } from '@bprogress/core';
import { startBox, stopBox, removeBox } from '../../services/box';
import { resolveName } from '../../helpers/resolveName';
import { useToast } from '../../contexts/ToastProvider';
import { Link } from 'react-router-dom';

interface Box {
  id: string;
  name: string;
  template: string;
  kind: string;
  state: string;
}

interface BoxCardProps {
  box: Box;
  onActionComplete: () => void;
}

function badgeVariant(state: string) {
  switch (state.toLowerCase()) {
    case 'running':
      return 'success';
    case 'exited':
      return 'danger';
    default:
      return 'secondary';
  }
}

export function BoxCard({ box, onActionComplete }: BoxCardProps) {
  const { showToast } = useToast();

  const handleStart = async () => {
    BProgress.start();
    try {
      await startBox(box.id);
      showToast('Box started', { variant: 'success' });
      onActionComplete();
    } finally {
      BProgress.done();
    }
  };

  const handleStop = async () => {
    BProgress.start();
    try {
      await stopBox(box.id);
      showToast('Box stopped', { variant: 'danger' });
      onActionComplete();
    } finally {
      BProgress.done();
    }
  };

  const handleRemove = async () => {
    BProgress.start();
    try {
      await removeBox(box.id);
      showToast('Box removed', { variant: 'danger' });
      onActionComplete();
    } catch (err) {
      if (err instanceof Error) {
        showToast(`Failed to remove box, ${err.message}`);
      }
    } finally {
      BProgress.done();
    }
  };

  return (
    <div className="text-light p-3 rounded shadow-sm mb-3 border p-2 m-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          <strong>{box.name ?? resolveName(box.id)}</strong>
        </div>
        <Badge bg={badgeVariant(box.state)} className="text-capitalize">
          {box.state}
        </Badge>
      </div>

      <div className="text-muted mb-3">
        {box.template ?? '(unmanaged)'} | {box.kind}
      </div>

      <div className="d-flex align-items-center">
        <div className="d-flex gap-2">
          <Button variant="outline-light" size="sm" onClick={handleStart}>
            <i className="bi bi-play-fill me-1" />
            Start
          </Button>
          <Button variant="outline-light" size="sm" onClick={handleStop}>
            <i className="bi bi-stop-fill me-1" />
            Stop
          </Button>
          <Link to={`/box/${box.id}/configure`}>
            <Button variant="outline-light" size="sm">
              <i className="bi bi-gear-fill me-1" />
              Configure
            </Button>
          </Link>
        </div>
        <Button variant="danger" size="sm" className="ms-auto" onClick={handleRemove}>
          <i className="bi bi-trash-fill" />
        </Button>
      </div>
    </div>
  );
}
