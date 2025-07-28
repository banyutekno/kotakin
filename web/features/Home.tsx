import { Link } from 'react-router-dom';
import { Search } from './components/Search';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getBoxes, removeBox, startBox, stopBox } from '../services/box';
import { BProgress } from '@bprogress/core';
import { useToast } from '../contexts/ToastProvider';
import { CardBoxView } from './CardBoxView';

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

      <div className="row g-3 p-5">
        {boxes?.map((box) => (
          <CardBoxView
            key={box.id}
            {...box}
            onStart={handleStart}
            onStop={handleStop}
            onRemove={handleRemove}
            resolveName={(id) => id}
          />
        ))}
      </div>
    </>
  );
}
