import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getBoxes } from '../services/box';
import { BoxCard } from './components/BoxCard';
import { Search } from './components/Search';
import { Link } from 'react-router-dom';

export interface Box {
  id: string;
  name: string;
  kind: string;
  template: string;
  state: string;
}

export default function Home() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  const loadBoxes = useCallback(async () => {
    const boxes = await getBoxes();
    setBoxes(boxes);
  }, []);

  useEffect(() => {
    document.title = 'Kotakin';

    loadBoxes();
  }, [loadBoxes]);

  return (
    <>
      <nav className="nav-bg p-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-box fs-2" />
                <span className="fs-2">Kotakin</span>
              </div>
            </div>

            <div className="col-12 col-md-6 mb-3 mb-md-0 d-flex justify-content-center">
              <div className="w-100">
                <Search />
              </div>
            </div>

            <div className="col-12 col-md-3 d-flex justify-content-center justify-content-md-end">
              <Link to="/store">
                <Button>Add Application</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div>
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} onReload={loadBoxes} />
        ))}
      </div>
    </>
  );
}
