import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getBoxes } from '../services/box';
import { BoxCard } from './components/BoxCard';
import { Search } from './components/Search';
import { Link } from 'react-router-dom';
import type { Box } from './types';

export default function Home() {
  const [allBoxes, setAllBoxes] = useState<Box[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [search, setSearch] = useState('');

  const loadBoxes = useCallback(async () => {
    const boxes = await getBoxes();
    setAllBoxes(boxes);
  }, []);

  useEffect(() => {
    document.title = 'Kotakin';

    loadBoxes();
  }, [loadBoxes]);

  useEffect(() => {
    const boxes = allBoxes.filter((box) => box.id.includes(search) || box.name?.includes(search));
    setBoxes(boxes);
  }, [allBoxes, search]);

  // if (boxes.length === 0) {
  //   return (
  //     <div className="text-center py-5">
  //       <i className="bi bi-box-seam display-1 text-muted" />
  //       <p className="mt-3 text-muted">No boxes available.</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row w-100 g-0">
            <div className="col-6 col-md-3 text-start order-1 order-md-1">
              <span className="navbar-brand d-flex align-items-center">
                <i className="bi bi-box me-2" />
                <span>Kotakin</span>
              </span>
            </div>

            <div className="col-6 col-md-3 text-end order-2 order-md-3">
              <Link to="/store">
                <Button>
                  <i className="bi bi-plus me-1" />
                  Add Application
                </Button>
              </Link>
            </div>

            <div className="col text-center order-3 order-md-2 mt-3 mt-md-0">
              <Search value={search} onChange={setSearch} />
            </div>
          </div>
        </div>
      </nav>

      <div>
        {boxes.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-box-seam display-1 text-muted" />
            <p className="mt-3 text-muted">No boxes available.</p>
          </div>
        )}

        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} onActionComplete={loadBoxes} />
        ))}
      </div>
    </>
  );
}
