import { Badge, Button } from 'react-bootstrap';

interface boxCardProps {
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
    case 'unknown':
      return 'light text-dark';
  }
}

export function CardBoxView({ id, name, template, kind, state, onStart, onStop, onRemove, resolveName }: boxCardProps) {
  return (
    <>
      <div className="col-12 col-sm-6 col-md-4 ">
        <div className="card h-100 column-bg">
          <div className="card-body d-flex flex-column">
            <div className="d-flex mb-1 gap-2 align-items-center">
              <h5 className="card-title mb-0">{name ?? resolveName(id)}</h5>
              <Badge bg={badgeVariant(state)}>{state}</Badge>
            </div>
            <small className="text-muted mb-3">
              {template ?? '(unmanaged)'} | {kind} | {state}
            </small>
            <div className="mt-auto d-flex align-items-center">
              <div>
                <Button variant="primary" className="me-2" onClick={() => onStart(id)}>
                  <i className="bi bi-play-fill me-1" />
                  Start
                </Button>
                <Button variant="secondary" onClick={() => onStop(id)}>
                  <i className="bi bi-stop-fill me-1" />
                  Stop
                </Button>
              </div>
              <Button variant="danger" className="ms-auto" onClick={() => onRemove(id)}>
                <i className="bi bi-trash-fill" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
