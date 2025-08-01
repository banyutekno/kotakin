import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h4 className="mb-3">Oops! Page not found</h4>
      <p className="text-muted mb-4">
        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </div>
  );
}
