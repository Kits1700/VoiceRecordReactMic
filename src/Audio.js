


import React,{useState,useRef,useEffect} from "react";
import { ReactMic } from 'react-mic';
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from './base';
import './Audio.css';
import Footer from "./Footer";
import { saveAs } from "file-saver";


export default function Audio () {

    const [state,setState] = useState({record:false});
    const [aURL,setaURL] = useState([]);
    const [rec,setRec] = useState([]);
    const [item,setItem] = useState([]);
    const [text,setText] = useState([]);
    const [audio,setAudio] = useState([]);
    const [time,setTime] =useState(0);
    const [timerOn,setTimeOn] = useState(false);
    const countRef = useRef(null);
    var pinCode = " ";
    var gender = " ";
    var language = " ";
    // var fname = " ";
    var lname = " ";
    var file_name = " ";
    var comments = " ";
    var key = [];
    var value = [];
    var lsdata = [];
    var arr = new Array();
    var i =0;
    const subProcess = require('child_process')
    // var exec = require('child_process').exec;
    
   useEffect(() => {
    let interval = null;
    if(timerOn){
       interval = setInterval(() => {
            setTime(prevTime => prevTime +10);
       },10)
    }
    else{

      clearInterval(interval);
    }

    return () => clearInterval(interval);



   },[timerOn]
   )
   const getInfo = () => {
    pinCode = document.getElementById("pincode").value;
    gender = document.getElementById("gender").value;
    language = document.getElementById("language").value;
    // fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;

}
const getComm = () => {
  comments = document.getElementById("comments").value;
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
function savedtoast() {
  var x = document.getElementById("savedtoast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function stoptoast() {
  var x = document.getElementById("stoptoast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
  const startRecording = () => {
    file_name = lname + "_" + gender + "_" + pinCode + "_" + language;
    setState({ record: true });
    setTimeOn(true);
    setText("Recording in progress")
    starttoast();

  
  }

  const setData = () => {
    // getData();

    arr.push({fileName: file_name,
      recording:rec}
  )
  
  localStorage.setItem("localData",JSON.stringify(arr));
  
  }
  const stopRecording = () => {

   setState({ record: false });
   setTimeOn(false);
   setText("")
   setData();
   clearTimeout( setTimeOn(false),5000);
   var i = setInterval(stopTime,4000);
  setTimeout(function( ) { clearInterval( i ); }, 5000);

   stoptoast();
   for (let x in localStorage){
    console.log(localStorage.getItem(x));
    console.log(typeof(arr));
}
  //  getInfo();
  //  file_name = fname + "_" + lname + "_" + gender + "_" + pinCode + "_" + language;

  

  

  }

 

  const keyValue = () => {
  //   for(var i=0, len=localStorage.length; i<len; i++) {
  //     key[i] = localStorage.key(i);
  //     value[i] = localStorage[key[i]];
      
  //     lsdata[i] = key[i] + " => " + value[i];
  //     document.getElementById("key").innerHTML = lsdata;
  //     // document.getElementById("value").innerHTML = value;
  // }
  
  
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
  const storageRef = ref(storage, `/voices/${file_name}`);

  uploadBytes(storageRef, rec).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    uploadToast();
  
       });
   
}
const onChange = (e) => {
  getInfo();

  // const file = e.target.files[0];
  for(let i = 0; i<e.target.files.length; i++)
  {
    const file = e.target.files[i];
    const storageRef = ref(storage, `/voices/${file.name}`);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a file!');
  
  
       });
       uploadToast();
}
   
    
  } 
  // const f_name = e.target.files[0].name;
//   const storageRef = ref(storage, `/voices/${f_name}`);

//   uploadBytes(storageRef, file).then((snapshot) => {
//     console.log('Uploaded a file!');
  
  
//        });
//        uploadToast();
// }
const onData = (recordedBlob) => {

    console.log('chunk of real-time data is: ', recordedBlob);
  }

  const stopTime = () => {
    

setTime(0);

  }

  const onStop = (recordedBlob)  => {
        // keyValue();
    console.log('recordedBlob is: ', recordedBlob);
    console.log('kkkkk',recordedBlob.blobURL);
    console.log('music',recordedBlob.blob);
   var audioURL= URL.createObjectURL(recordedBlob.blob);
   setaURL(audioURL);
   localStorage.setItem("audio",audioURL);
   console.log("LLLLL");
   console.log(typeof(recordedBlob.blob));
   setRec(recordedBlob.blob);
 
  //  console.log("ffmpeg -i"+" "+recordedBlob.blob+" "+recordedBlob.blob+".wav")
  //  saveAs(audioURL,"i");
   setItem(recordedBlob)
   console.log(rec);
   

  }


  const saveLocal = () => {
   getInfo();
   getComm();
   lname = lname.replace(" ","");
   file_name = lname+"_"+gender+"_"+pinCode+"_"+language+"_"+"comments: "+comments; 
   file_name = file_name.replace(" ","_");
   saveAs(rec,file_name);
   setData();
   setTime(0);
   savedtoast();

   const storage = getStorage();
  const storageRef = ref(storage, `/voices/${file_name}`);

  uploadBytes(storageRef, rec).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  
  
   
  }

  )
}
const getData = () => {
  var str = localStorage.getItem("localData");
  if(str!=null){
    arr = JSON.parse(str);
  }
}

const uploadAll = () => {
getData();
//   arr.push({fileName: file_name,
//     recording:rec}
// )

console.log(typeof(rec));
console.log(typeof(arr[0].recording));
// localStorage.setItem("localData",JSON.stringify(arr));


  
  console.log(arr.length);
  
   for( i=0;i<arr.length-1;i++)
   {
  
   
    const storageRef = ref(storage, `/voices/${arr[i].fileName}`);
  
    uploadString(storageRef, arr[i].recording).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      uploadToast();
    
     
    }
  
    )
    
   }
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
  
    <label for="lname">Name</label>
    <input type="text" id="lname" name="lastname" placeholder="Enter Name" required/>
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

<div class = "stopwatch">
<span>{("0"+Math.floor((time / 60000) % 60)).slice(-2)}</span>:
<span>{("0"+Math.floor((time / 1000) % 60)).slice(-2)}</span>:
  <span class = "last">{("0"+((time / 10) % 100)).slice(-2)}</span>
</div>
        <div class = "mic" >

        <ReactMic
          record={state.record}
          visualSetting="sinewave"
          className="sound-wave"
          onStop={onStop}
          mimeType="audio/wav"
          strokeColor="#FF4949"
          echoCancellation={true} // defaults -> false
          autoGainControl={true}  // defaults -> false
          noiseSuppression={true}
          channelCount={1}
          bitRate={256000}  
          sampleRate={16000}   
          onData={onData}

         />
        </div>
        <div id="uploadtoast">Uploaded All Files!</div>
        <div id="savedtoast">Saved & Uploaded File!</div>
        <div id="starttoast">Recording Started!</div>
        <div id="stoptoast">Recording Stopped!</div>
        <p id = "progress">{text}</p>
       

        <button class = "startrec"id = "recordBegin" onClick={startRecording} type="button" disabled ={state.record}> <i  class="fa" id = "starticon">&#xf130;</i></button>
        <button class ="stoprec" onClick={stopRecording} type="button" disabled ={!state.record}><i class="fa" id = "stopicon">&#xf04d;</i></button>
      
        <input type="file" name="file[]" class = "addFileBtn" multiple = "multiple" onChange={onChange} /> 
        <audio class = "stream"  src={aURL} controls></audio> 
        {/* <table>
      <th>Recording</th>
      <tr id = "key"></tr>
    </table> */}
 
    <input type="text" class="comments" id = "comments" name="lastname" placeholder="Enter Comments"  maxlength="144" required/>
    <button class ="saverec" onClick={saveLocal} type="button" disabled ={state.record} >Save Recording</button>
    <button class ="uploadrec" onClick={uploadAll} type="button" disabled ={state.record} >Upload Saved Files</button>


    {/* <p>{localStorage.}</p> */}
   
    {/* <p id = "key"> </p>
        -
        <p id = "value"> </p> */}
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
