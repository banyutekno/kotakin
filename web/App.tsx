import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import AppStore from './features/AppStore';

const Home = lazy(() => import('./features/Home'));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<AppStore />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function NotFound() {
  return <div>Not Found</div>;
}
