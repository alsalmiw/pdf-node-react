import "./App.css";
import React from "react";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const name = { name: "hello world" };

  const downloadPDF = () => {
    axios
      .post("http://localhost:4000/create-pdf", name)
      .then(() => axios.get("http://localhost:4000/fetch-pdf", { responseType: "blob" }))
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
      </div>
    </div>
  );
}

export default App;
