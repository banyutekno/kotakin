import { Badge, Button } from 'react-bootstrap';

interface BoxCardProps {
  id: string;
  name: string;
  template: string;
  kind: string;
  state: string;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onRemove: (id: string) => void;
  resolveName: (id: string) => string;
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

export function CardBoxView({ id, name, template, kind, state, onStart, onStop, onRemove, resolveName }: BoxCardProps) {
  return (
    <div className="text-light p-3 rounded shadow-sm mb-3 border p-2 m-2">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center">
          <strong>{name ?? resolveName(id)}</strong>
        </div>
        <Badge bg={badgeVariant(state)} className="text-capitalize">
          {state}
        </Badge>
      </div>

      <div className="text-muted mb-3">
        {template ?? '(unmanaged)'} | {kind}
      </div>

      <div className="d-flex align-items-center">
        <div className="d-flex gap-2">
          <Button variant="outline-light" size="sm" onClick={() => onStart(id)}>
            <i className="bi bi-play-fill me-1" />
            Start
          </Button>
          <Button variant="outline-light" size="sm" onClick={() => onStop(id)}>
            <i className="bi bi-stop-fill me-1" />
            Stop
          </Button>
        </div>
        <Button variant="danger" size="sm" className="ms-auto" onClick={() => onRemove(id)}>
          <i className="bi bi-trash-fill" />
        </Button>
      </div>
    </div>
  );
}
