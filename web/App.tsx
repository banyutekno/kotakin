import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { StrictMode } from 'react';

const Home = lazy(() => import('./features/Home'));
const TemplateList = lazy(() => import('./features/TemplateList'));
const BoxAdd = lazy(() => import('./features/BoxAdd'));
const RepoAdd = lazy(() => import('./features/RepoAdd'));

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<TemplateList />} />
          <Route path="/box/-/add" element={<BoxAdd />} />
          <Route path="/repo/-/add" element={<RepoAdd />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;

function NotFound() {
  return <div>Not Found</div>;
}
