import { Badge, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { BProgress } from '@bprogress/core';
import { startBox, stopBox, removeBox } from '../../services/box';
import { resolveName } from '../../helpers/resolveName';
import { useToast } from '../../contexts/ToastProvider';
import { Link } from 'react-router-dom';
import type { Box } from '../types';
import { Icon } from './Icon';
import { RemoveModal } from './RemoveModal';

interface BoxCardProps {
  box: Box;
  isPinned: boolean;
  onActionPin: (id: string) => void;
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

export function BoxCard({ box, isPinned, onActionPin, onActionComplete }: BoxCardProps) {
  const [loading, setLoading] = useState<'start' | 'stop' | null>(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
  const { showToast } = useToast();


  const handleStart = async () => {
    setLoading('start');
    try {
      await startBox(box.id);
      showToast('Box started', { variant: 'success' });
      onActionComplete();
    } finally {
      setLoading(null);
    }
  };

  const handleStop = async () => {
    setLoading('stop');
    try {
      await stopBox(box.id);
      showToast('Box stopped', { variant: 'danger' });
      onActionComplete();
    } finally {
      setLoading(null);
    }
  };

  const handleRemove = async () => {
    setShowRemoveModal(false);
    BProgress.start();
    try {
      await removeBox(box.id);
      showToast('Box removed', { variant: 'danger' });
      onActionComplete();
    } catch (err) {
      if (err instanceof Error) {
        showToast(`Failed to remove box, ${err.message}`, { variant: 'danger' });
      }
    } finally {
      BProgress.done();
    }
  };

  return (
  <>
    <div className="rounded border p-3 m-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="me-3">
          <Icon src={box.template ? `/repo-assets/${box.template}/logo.png` : ''} alt={box.name || box.id} />
        </div>

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <h4>{box.name ?? resolveName(box.id)}</h4>
              <Button variant="outline-light" className="ms-2" size="sm" onClick={() => onActionPin(box.id)}>
                {isPinned ? <i className="bi bi-pin" /> : <i className="bi bi-pin-fill" />}
              </Button>
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
              <Button variant="outline-light" size="sm" onClick={handleStart} disabled={!!loading}>
                {loading === 'start' ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  <i className="bi bi-play-fill" />
                )}
                <span className="ms-1">Start</span>
              </Button>

              <Button variant="outline-light" size="sm" onClick={handleStop} disabled={!!loading}>
                {loading === 'stop' ? (
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                ) : (
                  <i className="bi bi-stop-fill" />
                )}
                <span className="ms-1">Stop</span>
              </Button>

              <Link to={`/box/${box.id}/configure`}>
                <Button variant="outline-light" size="sm">
                  <i className="bi bi-gear-fill me-1" />
                  Configure
                </Button>
              </Link>
            </div>

            <Button variant="danger" size="sm" className="ms-auto" onClick={() => setShowRemoveModal(true)}>
              <i className="bi bi-trash-fill" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <RemoveModal
      itemName={box.id}
      show={showRemoveModal}
      onHide={() => setShowRemoveModal(false)}
      onConfirm={handleRemove}
    />
  </>
);

