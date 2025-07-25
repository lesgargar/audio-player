import { ThreeDot } from "react-loading-indicators";

export default function Loader() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <h1>Loading</h1>
      <ThreeDot
        variant="bounce"
        color="#3E3938"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  );
}
