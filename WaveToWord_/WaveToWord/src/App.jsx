import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > 5) {
        alert('File size exceeds 5MB. Please choose a smaller file.');
        event.target.value = ''; 
      }
    } else {
      alert('No file selected.');
    }
  };

  return (
    <form class="bg">
      <div className="bgclass">
        <input
          className="custom-file-label"
          type="file"
          id="Files"
          accept=".mp3, .wav"
          onChange={handleFileChange} 
        />
      </div>
      <br />
      <br />
      <br />
      <button type="submit" id="gentext">
        Generate Text
      </button>
      <button type="reset" id="change">
        Resubmit File
      </button>
    </form>
  );
}

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const fileSizeMB = file.size / (1024 * 1024);

  //     if (fileSizeMB > 5) {
  //       alert('File size exceeds 5MB. Please choose a smaller file.');
  //       event.target.value = '';
  //     }
  //   } else {
  //     alert('No file selected.');
  //   }
  // };




  // return(
  //   <form>
  //     <div class="bgclass">
  //       <input class="custom-file-label" type = "file" id="Files" for="Files" accept=".mp3, .wav" onChange={handleFileChange}  ></input>
  //     </div>
  //       <br></br>
  //       <br></br>
  //       <br></br>
  //       <button type="submit" id="gentext">Generate Text</button>
  //       <button type="reset" id="change">Resubmit File</button>        
  //   </form>

  
    


export default App;
