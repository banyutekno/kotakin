import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { BoxProvider } from './contexts/BoxProvider';
import AppStore from './features/AppStore';

const Home = lazy(() => import('./features/Home'));
function App() {
  return (
    <BoxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<AppStore />} />
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
