import "./App.css";
import React, { useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import GenerateHtml from "./GenerateHtml";

function App() {
  const pdfRef = useRef();

  const downloadPDF = () => {
    console.log("pdfRef current", pdfRef.current);
    axios
      .post("http://localhost:4000/create-pdf", {
        html: `<!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>${pdfRef.current.innerHTML}  </body>
      </html>`,
      })
      .then(() =>
        axios.get("http://localhost:4000/fetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        console.log(res);
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
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
