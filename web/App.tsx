import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { BoxProvider } from './contexts/BoxProvider';

const Home = lazy(() => import('./features/Home'));
const Store = lazy(() => import('./features/AppStore'));

function App() {
  return (
    <BoxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BoxProvider>
  );
}

export default App;

function NotFound() {
  return <div>Not Found</div>;
}
