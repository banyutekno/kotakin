import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { StrictMode } from 'react';
import { ToastProvider } from './contexts/ToastProvider';

const Home = lazy(() => import('./features/Home'));
const TemplateList = lazy(() => import('./features/TemplateList'));
const BoxAdd = lazy(() => import('./features/BoxAdd'));
const BoxConfigure = lazy(() => import('./features/BoxConfigure'));
const NotFound = lazy(() => import('./features/NotFound'));

function App() {
  return (
    <StrictMode>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<TemplateList />} />
            <Route path="/box/-/add" element={<BoxAdd />} />
            <Route path="/box/:id/configure" element={<BoxConfigure />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </StrictMode>
  );
}

export default App;
