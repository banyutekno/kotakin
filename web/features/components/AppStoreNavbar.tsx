import { Button } from 'react-bootstrap';
import { Search } from './Search';
import { Link } from 'react-router-dom';

export function AppStoreNavbar() {
  return (
    <nav className="p-2 column-bg">
      <div className="d-flex align-items-center justify-content-between w-100">
        <Link to="/" className="text-decoration-none text-reset">
          <div className="ms-3">
            <i className="bi bi-arrow-left-short fs-1" />
          </div>
        </Link>

        <div className="flex-grow-1 d-flex justify-content-center">
          <div className="w-50">
            <Search />
          </div>
        </div>

        <div className="me-3">
          <Button>Add</Button>
        </div>
      </div>
    </nav>
  );
}
