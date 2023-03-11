import "./App.css";
import React, { useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import GenerateHtml from "./GenerateHtml";
const url = process.env.REACT_APP_DB_URL;

function App() {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const body = {
      html: `<!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>${pdfRef.current.innerHTML}  </body>
      </html>`,
    };
    console.log("pdfRef current", pdfRef.current);
    const response = await axios.post(`${url}create-pdf`, {
      html: body.html,
    });
    if (response.status === 200) {
      const pdfRes = await axios.get(`${url}fetch-pdf`, {
        responseType: "blob",
      });
      if (pdfRes.status === 200) {
        const pdfBlob = new Blob([pdfRes.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      }
      console.log(pdfRes);
    }
  };

  return (
    <div className="App">
      <div style={{ marginTop: "20px" }}>
        <button onClick={downloadPDF}> Download PDF</button>
        <div style={{ display: "block" }}>
          <div ref={pdfRef}>
            <GenerateHtml
              field={{ question: "what is your name", value: "walaa alsalmi" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
