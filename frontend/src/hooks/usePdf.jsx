import { useState } from "react";
import { pdfService } from "../services/pdf";

const usePdf = () => {
  const [pdfData, setPdfData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPdf = async (pdfKey) => {
    try {
      const pdfDoc = await pdfService.loadPdf(pdfKey);
      setPdfData(pdfDoc);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { pdfData, isLoading, error, loadPdf };
};

export default usePdf;
