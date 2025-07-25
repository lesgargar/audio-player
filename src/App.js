import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./Components/Footer";
import Button from "./Components/Button";
import { ReactComponent as Play } from "./assets/Icons/play.svg";
import { ReactComponent as Backward } from "./assets/Icons/backward.svg";
import { ReactComponent as Forward } from "./assets/Icons/forward.svg";
import Song from "./Components/Song";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState(null);
  useEffect(() => {
    fetch("https://playground.4geeks.com/sound/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.songs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App ">
      {songs.length &&
        songs.map((song) => (
          <Song key={song.id} num={song.id} name={song.name} /> //se asigna la key para que no tenga problemas de children lo ideal que sea ID
        ))}
      <Footer>
        <Button
          onClick={() => console.log("back")}
          icon={<Backward width={20} height={20} />}
        />
        <Button
          onClick={() => console.log("play")}
          icon={<Play width={20} height={20} />}
        />
        <Button
          onClick={() => console.log("for")}
          icon={<Forward width={20} height={20} />}
        />
      </Footer>
    </div>
  );
}

export default App;
