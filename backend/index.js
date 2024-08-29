// index.js
const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { PDFDocument, rgb } = require("pdf-lib");
const { formTemplates } = require("./templates");
const UtilPdf = require("./util/pdf");

const app = express();
app.use(express.json());

// MongoDB connection setup
const MONGO_URI =
  "mongodb+srv://ChrisCaracach:AqxDnqwFuBtzhqO2@cluster0.t8ow9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the form schema and model
const formSchema = new mongoose.Schema({
  formId: { type: String, required: true, unique: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  location: { type: String, required: true },
  template: { type: String, required: true },
});

const Form = mongoose.model("Form", formSchema);

// Route 1: Create a form (returns a formId)
app.post("/form", async (req, res) => {
  const formId = crypto.randomUUID();
  try {
    const form = new Form({ formId, ...req.body });
    await form.save();
    res.json({ formId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create form" });
  }
});

// Route 2: Get all forms created
app.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve forms" });
  }
});

// Route 3: Receive an object with formId and return an edited PDF
app.post("/generate-pdf", async (req, res) => {
  const { formId, content } = req.body;

  try {
    const form = await Form.findOne({ formId });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    // Seguir acá. No está tomando el map de la templates. No se qué pasa

    const existingPdfBytes = await fetch(
      formTemplates[form.data.template]
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdf.getPages();
    const firstPage = pages[0];

    UtilPdf.editPdf(firstPage, content);

    // Serialize the PDF to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Set response headers to allow the download
    res.setHeader("Content-Disposition", "attachment; filename=edited.pdf");
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBytes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
