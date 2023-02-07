import React, { useState, useRef, useEffect } from "react";
import { ReactMic } from "react-mic";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from "./base";
import "./Audio.css";
import Footer from "./Footer";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import data from "./kw.json";
import axios from "axios";
import Audio from "./Audio";

export default function Prompt() {
    const [texts,setTexts] = useState([]);
    const [links,setLinks] = useState([]);
    var index = Math.floor(Math.random() * data.length);

    useEffect(() => {

        setTexts(data[index].english);
        setLinks(data[index].link);
    },[])


    return(

        <div class="kw">
        Prompt:{" "}
        <a class="kwa" href={links} target="_blank">
          {texts}
        </a>
       
      </div>

    
    );

}