import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-wrapper p-5">
      <div className="p-3">
        <div className="d-inline-block rounded p-4 column-bg">
          <Link to="/store" className="text-decoration-none text-reset">
            <i className="bi bi-google-play text-light fs-1 ms-3" />
            <p className="mb-0">App Store</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
