import { Link } from 'react-router-dom';
import { useBox } from '../contexts/BoxProvider';
import { Search } from './components/Search';

export default function Home() {
  const { boxes } = useBox();

  return (
    <>
      <div className="home-wrapper p-5">
        <Search />
        <div className="p-3">
          <div className="d-inline-block rounded p-4 column-bg">
            <Link to="/store" className="text-decoration-none text-reset">
              <i className="bi bi-google-play text-light fs-1 ms-3" />
              <p className="mb-0">App Store</p>
            </Link>
          </div>
        </div>
        <div>
          {boxes?.map((box) => {
            return (
              <div key={box.name}>
                {box.name} {box.kind} {box.containers.length}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
