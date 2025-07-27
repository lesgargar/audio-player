import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./Components/Footer";
import Button from "./Components/Button";
import { ReactComponent as Play } from "./assets/Icons/play.svg";
import { ReactComponent as Pause } from "./assets/Icons/pause.svg";
import { ReactComponent as Backward } from "./assets/Icons/backward.svg";
import { ReactComponent as Forward } from "./assets/Icons/forward.svg";
import Song from "./Components/Song";
import Loader from "./Components/Loader";
import { useEffect, useRef, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

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

  const playSong = (index) => {
    if (!songs.length || index < 1 || index >= songs.length) return;
    const song = songs[index];
    const songFullUrl = `https://playground.4geeks.com${song.url}`;
    setCurrentIndex(index);
    setCurrentSong(songFullUrl);

    if (audioRef.current) {
      audioRef.current.src = songFullUrl;
      audioRef.current.play();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    if (currentIndex == null) return;
    let nextIndex = currentIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0; //si se acabo el index entonces el siguiente reinicia en 0
    playSong(nextIndex);
  };

  const prevSong = () => {
    if (currentIndex == null) return;
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
    playSong(prevIndex);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App ">
      {songs.length &&
        songs.map((song, index) => (
          <>
            <Song
              key={song.id} //se asigna la key para que no tenga problemas de children lo ideal que sea ID
              num={song.id}
              name={song.name}
              onClick={() => playSong(index)}
              active={index === currentIndex}
            />
          </>
        ))}
      <audio ref={audioRef} hidden />
      <Footer>
        <Button
          onClick={() => prevSong()}
          icon={<Backward width={20} height={20} />}
        />
        <Button
          onClick={() => togglePlay()}
          icon={
            !isPlaying ? (
              <Play width={20} height={20} />
            ) : (
              <Pause width={20} height={20} />
            )
          }
        />
        <Button
          onClick={() => nextSong()}
          icon={<Forward width={20} height={20} />}
        />
      </Footer>
    </div>
  );
}

export default App;
