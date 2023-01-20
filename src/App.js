
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Audio from "./Audio";
import Navbar from "./Navbar";
  
function App() {
    
  return (
      <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
        <Route exact path="/" element={<Audio/>}/>
        
      </Routes>
   </BrowserRouter>
    
 
      </>
  );
}
  
export default App;
