
// import React,{useState} from "react";
// import { render } from "react-dom";
// import useRecorder from "./useRecorder";
// import './App.css';
// import {app} from './base';
// import { storage } from './base';
// import {BrowserRouter,Routes,Route} from "react-router-dom";
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import Audio from "./Audio";
// import Navbar from "./Navbar";

// function App() {
// return(
//  <BrowserRouter>
//   <Navbar />
//   <Routes>
     
//   <Route exact path="/" element={<Audio/>}/>

// </Routes>
//  </BrowserRouter>

// )
// }
// export default App;

// import React from "react";
// import { WavRecorder } from "webm-to-wav-converter";


// function App() {
//   const ref = React.useRef();

//   React.useEffect(() => {
//     ref.current = new WavRecorder();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>WavRecorder class Usage</h1>

//         <button onClick={() => ref.current.start()}>Start</button>
//         <br />
//         <br />
//         <button onClick={() => ref.current.stop()}>Stop</button>
//         <br />
//         <br />
//         <button onClick={() => ref.current.download()}>Download 16 bit</button>
//         <br />
//         <br />
//         <button onClick={() => ref.current.download("MyWAVFile", true)}>
//           Download 32 bit
//         </button>
//       </header>
//     </div>
//   );
// }
import React,{useState} from "react";
import { ReactMic } from 'react-mic';

function App () {
    const [state,setState] = useState([]);


  const startRecording = () => {
    setState({ record: true });
  }

  const stopRecording = () => {
   setState({ record: false });
  }

  function onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  function onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    console.log('kkkkk',recordedBlob.blobURL);
    console.log('music',recordedBlob.blob);
    // aURL= URL.createObjectURL(recordedBlob.blob);
  }


    return (
      <div>
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          mimeType="audio/wav"
          onData={onData}
         />
        <button onClick={startRecording} type="button">Start</button>
        <button onClick={stopRecording} type="button">Stop</button>
        {/* <audio src={this.onStop.recordedBlob.blobURL} controls></audio> */}
      </div>
    );
  
}

export default App;

