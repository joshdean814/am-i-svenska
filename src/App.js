import './App.css';
import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';

// icon imports
import { FaMicrophone } from "react-icons/fa";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audio, setAudio] = useState(null);
  const [chunks, setChunks] = useState([]);

  async function getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
    .then((stream) => {
      setAudio(new MediaRecorder(stream))
    });
  }

  useEffect(() => {
    console.log(audio)
    if(audio != null && audio.ondataavailable == null) {
      audio.ondataavailable = e => {
        setChunks(prevChunks => [...prevChunks, e.data])
      }
    }
  }, [audio])


  useEffect(() => {
    console.log(chunks)
  }, [chunks])
  

  const startRecording = () => {
    getMicrophone();
    setIsRecording(true);
  };

  const handleClick = () => {
    console.log(chunks)
  }
  

  // startRecording = () => {
    // this.setState({ record: true });
  // }
 
  // stopRecording = () => {
    // this.setState({ record: false });
  // }
 
  const handleAudio = (blob) => {
    console.log(blob);
  };


  // onData(recordedBlob) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  // }
 
  // onStop(recordedBlob) {
    // console.log('recordedBlob is: ', recordedBlob);
  // }

  return (
    <div className="App">
      <header className="App-header">
      {isRecording && (<ReactMic
                        record={true}
                        // className="sound-wave"
                        // onStop={this.onStop}
                        onData={handleAudio}
                        // strokeColor="#000000"
                        // backgroundColor="#FF4081" 
                      />
                      // <button onClick={this.stopRecording} type="button">Stop</button>
        )}
        <FaMicrophone onClick={startRecording}/>
        <button onClick={handleClick}>LOG DATA</button>
        Click the microphone to record an audio file!
      </header>
    </div>
  );
}

export default App;
