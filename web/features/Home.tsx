import { Link } from 'react-router-dom';
import { Search } from './components/Search';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getBoxes } from '../services/box';

export interface Box {
  id: string;
  name: string;
  kind: string;
  template: string;
}

export default function Home() {
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    (async () => {
      const boxes = await getBoxes();
      setBoxes(boxes);
    })();
  }, []);

  return (
    <>
      <nav className="p-3 column-bg">
        <div className="d-flex align-items-center justify-content-between w-100">
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

      <div className="home-wrapper p-5">
        <div className="p-3 d-flex gap-3">
          {boxes?.map((box) => (
            <div key={box.name}>
              <div className="d-inline-block rounded p-4 column-bg">
                <i className="bi bi-google-play text-light fs-1 ms-3" />
                <p className="mb-0">{box.name ?? box.id}</p>
                <p className="mb-0">{box.template ?? '-'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
