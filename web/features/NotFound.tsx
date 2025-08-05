import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNav } from '../hooks/nav';

export default function NotFound() {
  const { popPage } = useNav();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h4 className="mb-3">Oops! Page not found</h4>
      <p className="text-muted mb-4">
        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
        {' or '}
        <Button variant="primary" onClick={() => popPage('/')}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
