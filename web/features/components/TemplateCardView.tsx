import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function TemplateCardView({ id }: { id: string }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <div className="card h-100 column-bg">
        <img
          className="card-img-top object-fit-contain p-3"
          style={{ height: '180px', width: '100%' }}
          src={`/repo-assets/${id}/logo.png`}
          alt={`${id} logo`}
        />
        <div className="card-body">
          <p className="card-text">{id}</p>
          <Link to={`/box/-/add?template=${id}`} className="text-decoration-none text-reset">
            <Button>Install</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
