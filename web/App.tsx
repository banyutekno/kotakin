import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { StrictMode } from 'react';
import { ToastProvider } from './contexts/ToastProvider';

const Home = lazy(() => import('./features/Home'));
const TemplateList = lazy(() => import('./features/TemplateList'));
const BoxAdd = lazy(() => import('./features/BoxAdd'));

function App() {
  return (
    <StrictMode>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<TemplateList />} />
            <Route path="/box/-/add" element={<BoxAdd />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </StrictMode>
  );
}

export default App;

function NotFound() {
  return <div>Not Found</div>;
}
