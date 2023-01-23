


import React,{useState} from "react";
import { ReactMic } from 'react-mic';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from './base';
import './Audio.css';
import Footer from "./Footer";


export default function Audio () {

    const [state,setState] = useState({record:false});
    const [aURL,setaURL] = useState([]);
    const [rec,setRec] = useState([]);
    var pinCode = " ";
    var gender = " ";
    var language = " ";
    var fname = " ";
    var lname = " ";
    
   const getInfo = () => {
    pinCode = document.getElementById("pincode").value;
    gender = document.getElementById("gender").value;
    language = document.getElementById("language").value;
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;

}

function uploadToast() {
  var x = document.getElementById("uploadtoast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function starttoast() {
  var x = document.getElementById("starttoast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function stoptoast() {
  var x = document.getElementById("stoptoast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
  const startRecording = () => {
    setState({ record: true });
    starttoast();
  }

  const stopRecording = () => {
   setState({ record: false });
   stoptoast();

  }

  // const btnNext = () => {
  //   document.getElementById("recordBegin").scrollIntoView();
  // }
const save = () =>{
    getInfo();
    console.log(pinCode);
    console.log(gender);
    console.log(language);
    console.log("Added info");
  const storage = getStorage();
  const storageRef = ref(storage, `/voices/${fname}_${lname}_${gender}_${pinCode}_${language}`);

  uploadBytes(storageRef, rec).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    uploadToast();
  
       });
  
}
const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = (recordedBlob)  => {
    console.log('recordedBlob is: ', recordedBlob);
    console.log('kkkkk',recordedBlob.blobURL);
    console.log('music',recordedBlob.blob);
   var audioURL= URL.createObjectURL(recordedBlob.blob);
   setaURL(audioURL);
   console.log("LLLLL");
   console.log(typeof(recordedBlob.blob));
   setRec(recordedBlob.blob);
   console.log(rec);
  

  }




    //  pincCode = document.getElementById("pincode").value;
  




    return (

      <div class = "full">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
<link rel="stylesheet" href="stylesheets/ie.css">

</link>
           {/* <input type="text" id = "pincode" placeholder="Enter pincode"/>
        <input type="text" id = "gender" placeholder="Enter gender"/>
        <input type="text" id = "language" placeholder="Enter language used"/> */}
<div  class = "formcomp">
  

  <form>
  <br></br>
  <label for="lname">First Name</label>
    <input type="text" id="fname" name="lastname" placeholder="Enter First Name" required/>
    <br></br>
    <br></br>
    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lastname" placeholder="Enter Last Name" required/>
    <br></br>
    <br></br>
    <label for="country">Gender</label>
    <select id="gender" name="country" placeholder="Gender" required>
      
      <option value="Female">Female</option>
      <option value="Male">Male</option>
      <option value="Other">Other</option>
    </select>
    <br></br>
    <br></br>
    <label for="fname">Pincode</label>
    <input type="text" id="pincode" name="firstname" placeholder="Enter Pincode" required/>
    <br></br>
    <br></br>
  
    <label for="lname">Language Used</label>
    <input type="text" id="language" name="lastname" placeholder="Enter Language" required/>

 
  
  </form>
</div>


        <div class = "mic" >

        <ReactMic
          record={state.record}
          className="sound-wave"
          onStop={onStop}
          mimeType="audio/wav"
          strokeColor="#1684A7"
          echoCancellation={true} // defaults -> false
          autoGainControl={true}  // defaults -> false
          noiseSuppression={true}
          channelCount={1}
          bitRate={256000}  
          sampleRate={16000}   
          onData={onData}

         />
        </div>
        <div id="uploadtoast">Uploaded!</div>
        <div id="starttoast">Recording Started!</div>
        <div id="stoptoast">Recording Stopped!</div>
       
        <button class = "startrec"id = "recordBegin" onClick={startRecording} type="button" disabled ={state.record}> <i  class="fa" id = "starticon">&#xf130;</i></button>
        <button class ="stoprec" onClick={stopRecording} type="button" disabled ={!state.record}><i class="fa" id = "stopicon">&#xf04d;</i></button>
        <button class="upload" onClick={save}><i class="fa" id = "uploadicon">&#xf093;</i></button>
        <audio class = "stream"  src={aURL} controls></audio> 
       
        <Footer />
      </div>


    );
  
}



// import React,{useState} from "react";
// import { render } from "react-dom";
// import useRecorder from "./useRecorder";
// import './Audio.css';
// import {app} from './base';
// import { storage } from './base';
// import { getStorage, ref, uploadBytes } from "firebase/storage";


// function Audio() {
//   const stream = navigator.mediaDevices.getUserMedia({ audio: true });
//   const [aUrl, setaUrl] = useState(null);
  
//   let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
//   const file1 = audioURL;



//   const save = () => {
//     const storage = getStorage();
//     const storageRef = ref(storage, 'a');
//     setaUrl(audioURL);
//     uploadBytes(storageRef, aUrl).then((snapshot) => {
//       console.log('Uploaded a blob or file!');
//       console.log(typeof(audioURL));
//          });


//   }


  
//   return (


//     <div className="Audio">
// <div class="hero-image">
//   <div class="hero-text">
//   <input type="text" class="pincode" placeholder="Enter Pincode"/> 
//   <input type="text" class="gender" placeholder="Enter Gender"/> 
//   <input type="text" class="language" placeholder="Enter Language Used"/> 
//   <button class = "startrec" onClick={startRecording} disabled={isRecording}>
//         Start recording
//       </button>
//       <button class ="stoprec" onClick={stopRecording} disabled={!isRecording}>
//         Stop recording
//       </button>
//       <audio class ="stream" src={audioURL} type="audio/mpeg" controls />
//       <button class ="upload" onClick={save} >Upload</button>
//   </div>
//   </div>

    

  
//     </div>
//   );

// }
// export default Audio;
