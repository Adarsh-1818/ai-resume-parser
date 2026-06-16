import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
//import { getGPTAnalysis } from "../services/ai.service";
import { getClaudeAnalysis } from "../services/ai.service";
import { prisma } from "../config/prisma";
import PDFDocument from "pdfkit";

const extractTextFromPDF = async (buffer: Buffer | Uint8Array) => {
    const pdf = await pdfjsLib.getDocument({
        data: buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
      }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");

    text += pageText + "\n";
  }

  return text;
};

export const parseResume = async (req: any, res: any) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumeText =  await extractTextFromPDF(new Uint8Array(file.buffer));

    const result = await /* getGPTAnalysis */ getClaudeAnalysis(resumeText, jobDescription);

    return res.json(result);

    await prisma.resumeScan.create({
        data: {
          userId: req.user.id, // assuming JWT middleware
          atsScore: result.atsScore,
          missingSkills: JSON.stringify(result.missingSkills || []),
          summary: result.recommendation,
        },
      });
  } catch (err) {
    console.error("RESUME PARSE ERROR:", err);
    return res.status(500).json({
      message: "Error parsing resume",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const getHistory = async (req: any, res: any) => {
    const scans = await prisma.resumeScan.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
  
    res.json(scans);
  };

export const downloadReport = async (req: any, res: any) => {
  const { id } = req.params;

  const scan = await prisma.resumeScan.findUnique({
    where: { id },
  });

  if (!scan) return res.status(404).send("Not found");

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("AI Resume Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`ATS Score: ${scan.atsScore}`);
  doc.text(`Summary: ${scan.summary}`);
  doc.text(`Missing Skills: ${scan.missingSkills}`);

  doc.end();
};