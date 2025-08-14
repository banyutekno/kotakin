import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!load) {
    return;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex text-center p-4 rounded" style={{ maxWidth: '650px' }}>
        <i className="bi bi-box animate-bounce" style={{ fontSize: '5rem' }} />
        <div className="mt-4 ms-2" style={{ fontSize: '3rem' }}>
          Kotakin....
        </div>
      </div>
    </div>
  );
}
