import { useEffect, useState } from "react";
import {app} from './base';
import { storage } from './base';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { AudioContext, OfflineAudioContext } from 'standardized-audio-context';

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = e => {
      console.log(e.data);
      setAudioURL(URL.createObjectURL(e.data));
    };


    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);



  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
 
    

  };

  return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: {	autoGainControl: false, //(2) [true, false]
  // channelCount: 1, // {max: 2, min: 1}
  // deviceId: device?.deviceId || "default",
  // groupId: null,
  echoCancellation: false, //(2) [true, false]
  latency: 0, //{max: 0.01, min: 0.01}
  noiseSuppression: false, //(2) [true, false]
  //{max: 16, min: 16}}});
 }});
 return new MediaRecorder(stream)
}
export default useRecorder;
