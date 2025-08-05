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
              <Search />
            </div>
          </div>
        </div>
      </nav>


      <div>
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} onReload={loadBoxes} />
      <div className="container-fluid">
        {boxes?.map((box) => (
          <div key={box.id} className="border p-2 m-2">
            <img src={`/repo-assets/${box.template}/logo.png`} alt="" />
            <h4>{box.name ?? resolveName(box.id)}</h4>
            <p>
              {box.template ?? '(unmanaged)'} | {box.kind} | {box.state}
            </p>

            <div>
              <Button onClick={() => handleStart(box.id)}>Start</Button>

              <Button onClick={() => handleStop(box.id)}>Stop</Button>

              {box.template && <Button onClick={() => handleRemove(box.id)}>Remove</Button>}

              {box.template && (
                <Link to={`/box/${box.id}/configure`}>
                  <Button>Configure</Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
