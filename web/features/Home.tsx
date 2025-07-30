import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getBoxes, removeBox, startBox, stopBox } from '../services/box';
import { resolveName } from '../helpers/resolveName';
import { BProgress } from '@bprogress/core';
import { useToast } from '../contexts/ToastProvider';
import { Navbar } from './components/Navbar';

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
      <Navbar showBrandText />
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

              <Button onClick={() => handleRemove(box.id)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
