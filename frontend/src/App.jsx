import { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { PDFDocument, rgb } from "pdf-lib";
import Router from "./router/Router";
import "./assets/css/styles.css";

function App() {
  const [pdfBytes, setPdfBytes] = useState(null);

  const cargarPermiso = async () => {
    const existingPdfBytes = await fetch("src/assets/autorizacion.pdf").then(
      (res) => res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      color: rgb(0.95, 0.1, 0.1),
    });

    console.log("here");

    const pdfBytes = await pdfDoc.save();

    setPdfBytes(pdfBytes);
  };

  const downloadPdf = () => {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited.pdf";
    link.click();
  };

  return <Router />;

  // return (
  //   <>
  //     <button
  //       onClick={() => {
  //         cargarPermiso();
  //       }}
  //     >
  //       Permiso de acampe
  //     </button>
  //     {pdfBytes && <button onClick={downloadPdf}>Descargar PDF</button>}
  //   </>
  // );
}

export default App;
