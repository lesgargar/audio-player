import "./buttonStyle.css";
export default function Button({ icon, onClick }) {
  return (
    <div>
      <button onClick={onClick} className="p-2 m-2 rounded btn-style">
        {icon}
      </button>
    </div>
  );
}
