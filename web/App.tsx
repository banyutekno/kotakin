import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { BoxProvider } from './contexts/BoxProvider';

const Home = lazy(() => import('./features/Home'));
function App() {
  return (
    <BoxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BoxProvider>
  );
}

export default App;

function About() {
  return <div>About</div>;
}

function NotFound() {
  return <div>Not Found</div>;
}
