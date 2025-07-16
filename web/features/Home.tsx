import { useBox } from '../contexts/BoxProvider';

export default function Home() {
  const { boxes } = useBox();

  return (
    <>
      <div className="d-flex flex-row">
        <div className="flex-fill">
          <h1>Home</h1>
        </div>
        <div className="flex-fill">
          <input type="text" />
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
    </>
  );
}
