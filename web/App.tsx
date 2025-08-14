import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { StrictMode } from 'react';
import { ToastProvider } from './contexts/ToastProvider';
import { LoadingScreen } from './features/components/LoadingScreen';

const Home = lazy(() => import('./features/Home'));
const TemplateList = lazy(() => import('./features/TemplateList'));
const RepoAdd = lazy(() => import('./features/RepoAdd'));
const BoxAdd = lazy(() => import('./features/BoxAdd'));
const BoxConfigure = lazy(() => import('./features/BoxConfigure'));
const NotFound = lazy(() => import('./features/NotFound'));

function App() {
  return (
    <StrictMode>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<TemplateList />} />
              <Route path="/repo/-/add" element={<RepoAdd />} />
              <Route path="/box/-/add" element={<BoxAdd />} />
              <Route path="/box/:id/configure" element={<BoxConfigure />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </StrictMode>
  );
}

export default App;
