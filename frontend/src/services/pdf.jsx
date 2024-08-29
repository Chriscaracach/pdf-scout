import { PDFDocument } from "pdf-lib";

const pdfPaths = {
  permisoAcampe: "src/pdfforms/autorizacion.pdf",
};

export const pdfService = {
  loadPdf: async (pdfKey) => {
    const existingPdfBytes = await fetch(pdfPaths[pdfKey]).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    return pdfDoc;
  },
  editPdf: (pdf, values) => {
    const pages = pdf.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();
    values.map((value) => {
      firstPage.drawText(value, {
        x: 5,
        y: height / 2 + 300,
        size: 50,
      });
    });
  },
  downloadPdf: async (pdf) => {
    const pdfBytes = await pdf.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited.pdf";
    link.click();
  },
};
