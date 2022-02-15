import { useState } from "react";
import "./App.css";
import InputFile from "./components/InputFile/InputFile";
import TableOfData from "./components/TableOfData/TableOfData";

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className='App'>
      <div className='container'>
        <InputFile
          uploaded={uploaded}
          setUploaded={setUploaded}
          setSubmitted={setSubmitted}
        ></InputFile>

        <div className='data-container'>
          {submitted ? (
            <TableOfData
              uploaded={uploaded}
              setUploaded={setUploaded}
              data={data}
              setData={setData}
            ></TableOfData>
          ) : (
            <div className='initial-text'>
              <div>
                <p>Once you upload your file successfully</p>
                <h1>Your data will appear here.</h1>
                <h5 style={{ color: "#ffb703" }}>
                  You can only submit .xls, .xlsx & .csv file format.
                </h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
