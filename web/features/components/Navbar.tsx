import { Link } from 'react-router-dom';
import { Search } from './Search';
import { Button } from 'react-bootstrap';

interface NavbarProps {
  showBrandText?: boolean;
  showBackIcon?: boolean;
}

export function Navbar({ showBrandText = false, showBackIcon = false }: NavbarProps) {
  return (
    <>
      <nav className={`column-bg ${showBackIcon ? 'p-2' : 'p-3'}`}>
        <div className="d-flex align-items-center justify-content-between w-100">
          {showBackIcon && (
            <Link to="/" className="text-decoration-none text-reset">
              <div className="ms-3 rounded-circle p-2 hover-shadow">
                <i className="bi bi-arrow-left-short fs-1" />
              </div>
            </Link>
          )}

          {showBrandText && (
            <div className="ms-5 d-flex align-items-center gap-2">
              <i className="bi bi-box fs-2 " />
              <span className="fw-bold fs-2">Kotakin</span>
            </div>
          )}

          <div className="flex-grow-1 d-flex justify-content-center">
            <div className="w-50">
              <Search />
            </div>
          </div>

          <div className="me-3">
            <Link to="/store">
              <Button>Add Application</Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
