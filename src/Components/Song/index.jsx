import "./songStyle.css";
export default function Song({ num, name, onClick }) {
  return (
    <div onClick={onClick} className="song">
      <div className="d-flex">
        <div className="p-2 col-1 text-gray fw-bold">{num}</div>
        <div className="p-2 text-white justify-content-start">{name}</div>
      </div>
      <div className="base" />
    </div>
  );
}
