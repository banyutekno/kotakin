export default function Search() {
  return (
    <div className="input-group">
      <input className="form-control" type="text" placeholder="Search..." />
      <span className="input-group-text">
        <i className="bi bi-search text-light" />
      </span>
    </div>
  );
}
