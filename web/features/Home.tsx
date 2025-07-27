import { Link } from 'react-router-dom';
import { Search } from './components/Search';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getBoxes, removeBox, startBox, stopBox } from '../services/box';
import { resolveName } from '../helpers/resolveName';

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

  const handleRemove = async (id: string) => {
    await removeBox(id);
    await loadBoxes();
  };

  const handleStart = async (id: string) => {
    await startBox(id);
    await loadBoxes();
  };

  const handleStop = async (id: string) => {
    await stopBox(id);
    await loadBoxes();
  };

  useEffect(() => {
    loadBoxes();
  }, [loadBoxes]);

  return (
    <>
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
            <Link to="/store">
              <Button>Add Application</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div>
        {boxes?.map((box) => (
          <div key={box.id} className="border p-2 m-2">
            <h4>{box.name ?? resolveName(box.id)}</h4>
            <p>
              {box.template ?? '(unmanaged)'} | {box.kind} | {box.state}
            </p>

            <div>
              <Button onClick={() => handleStart(box.id)}>Start</Button>

              <Button onClick={() => handleStop(box.id)}>Stop</Button>

              <Button onClick={() => handleRemove(box.id)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
