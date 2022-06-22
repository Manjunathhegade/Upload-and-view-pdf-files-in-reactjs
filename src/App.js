import React, { useState, useEffect } from "react"
import axios from 'axios'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import './App.css';

function App() {
  const [file,setFile] = useState('')
  const [name ,setName] = useState('')
  const [filedataurl,setFiledata] = useState('')
  const [pdfError,setpdfError] = useState(null)
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onFileChange = (event) => {
    setpdfError(null)
    setFile(event.target.files[0])
    setName(event.target.files[0].name)
    var fileNameError = (event.target.files[0].name).split('.')[1]
    setName(fileNameError)
    console.log(fileNameError)
    if(fileNameError != "pdf"){
      setpdfError(`${fileNameError} files are not allowed`)
    }
  }

  const onFileUpload = async (e) => {
    e.preventDefault()
    if(name == "pdf" ){
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = async (e) => {
        var url = e.target.result;
        console.log(url)
        await setFiledata(url)
      }
      setFiledata('')
    }
  }

  return (
    <div className="container">
      <br></br>
      <form className="form-group" onSubmit={(e) => onFileUpload(e)} enctype="multipart/form-data">
        <input type="file" name="expenses" className="form-control" onChange={(event) => onFileChange(event)} required />
        <br></br>
        <p className="pdf-error">{pdfError}</p>
        <button type="submit" className="btn btn-success btn-lg">
          UPLOAD
        </button>
      </form>
      <br></br>
      <h4>View PDF</h4>
      <div className="pdf-container">
        {
        filedataurl ?
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
            <Viewer fileUrl={filedataurl}
              plugins={[defaultLayoutPluginInstance]} />
          </Worker>
          : ""
        }
      </div>
    </div>
  );
}

export default App;