import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getBoxes, removeBox, startBox, stopBox } from '../services/box';
import { resolveName } from '../helpers/resolveName';
import { BProgress } from '@bprogress/core';
import { useToast } from '../contexts/ToastProvider';
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
  const { showToast } = useToast();

  const loadBoxes = useCallback(async () => {
    const boxes = await getBoxes();
    setBoxes(boxes);
  }, []);

  const handleRemove = async (id: string) => {
    BProgress.start();
    try {
      await removeBox(id);
      showToast('Box removed', { variant: 'success' });
      await loadBoxes();
    } catch (err) {
      if (err instanceof Error) {
        showToast(`Failed to remove box, ${err.message}`);
      }
    } finally {
      BProgress.done();
    }
  };

  const handleStart = async (id: string) => {
    BProgress.start();
    try {
      await startBox(id);
      showToast('Box started', { variant: 'success' });
      await loadBoxes();
    } finally {
      BProgress.done();
    }
  };

  const handleStop = async (id: string) => {
    BProgress.start();
    try {
      await stopBox(id);
      showToast('Box stopped', { variant: 'success' });
      await loadBoxes();
    } finally {
      BProgress.done();
    }
  };

  useEffect(() => {
    document.title = 'Kotakin';

    loadBoxes();
  }, [loadBoxes]);

  return (
    <>
      <nav className="navbar nav-bg">
        <div className="container-fluid">
          <div className="row w-100 g-0">
            <div className="col-6 col-md-3 text-start order-1 order-md-1">
              <a className="navbar-brand d-flex align-items-center" href="/">
                <i className="bi bi-box me-2" />
                <span>Kotakin</span>
              </a>
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
