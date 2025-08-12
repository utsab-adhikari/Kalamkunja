import OpenAI from "openai";
import { NextResponse } from "next/server";
import assistantProfile from "@/db/resumeAiInstructions";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function askModel(prompt) {
  const resp = await openai.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      { role: "system", content: assistantProfile },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
    max_tokens: 1500,
  });
  return resp.choices[0].message.content;
}

async function createPdfBase64(structure) {
  const doc = await PDFDocument.create();
  let page = doc.addPage([595.28, 841.89]); // A4 size in points (width, height)
  const { width, height } = page.getSize();

  // Validate initial values
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error(`Invalid page dimensions: width=${width}, height=${height}`);
  }

  // Load fonts
  const regularFont = await doc.embedFont(StandardFonts.TimesRoman);
  const boldFont = await doc.embedFont(StandardFonts.TimesRomanBold);

  // Define margins and starting position
  const margin = 40;
  let yPosition = height - margin;

  // Helper function to update yPosition and check for new page
  const updateYPosition = (decrement) => {
    if (!Number.isFinite(decrement)) {
      console.error(`Invalid decrement value: ${decrement}`);
      throw new Error(`Invalid decrement value: ${decrement}`);
    }
    yPosition -= decrement;
    if (!Number.isFinite(yPosition)) {
      console.error(`yPosition became invalid: ${yPosition}`);
      throw new Error(`yPosition became invalid: ${yPosition}`);
    }
    if (yPosition < margin) {
      page = doc.addPage([595.28, 841.89]);
      yPosition = height - margin;
    }
  };

  // Header
  page.setFont(boldFont);
  page.setFontSize(24);
  if (!Number.isFinite(yPosition)) {
    console.error(`Invalid yPosition before drawing name: ${yPosition}`);
    throw new Error(`Invalid yPosition: ${yPosition}`);
  }
  page.drawText(structure.name || "Name", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
  updateYPosition(30);

  // Title
  if (structure.title) {
    page.setFont(regularFont);
    page.setFontSize(14);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing title: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText(structure.title, { x: margin, y: yPosition, color: rgb(0.4, 0.4, 0.4) });
    updateYPosition(20);
  }

  // Contact
  const contactParts = [];
  if (structure.contact) {
    if (structure.contact.email) contactParts.push(structure.contact.email);
    if (structure.contact.phone) contactParts.push(structure.contact.phone);
    if (structure.contact.address) contactParts.push(structure.contact.address);
    if (Array.isArray(structure.contact.links) && structure.contact.links.length)
      contactParts.push(structure.contact.links.join(" | "));
  }
  if (contactParts.length) {
    page.setFont(regularFont);
    page.setFontSize(10);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing contact: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText(contactParts.join(" • "), { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(20);
  }

  // Summary
  if (structure.summary) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing summary: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Professional Summary", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    page.setFont(regularFont);
    page.setFontSize(10);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing summary text: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText(structure.summary, {
      x: margin,
      y: yPosition,
      maxWidth: width - 2 * margin,
      lineHeight: 12,
      color: rgb(0, 0, 0),
    });
    updateYPosition(15 + (structure.summary.split("\n").length || 1) * 12);
  }

  // Skills
  if (Array.isArray(structure.skills) && structure.skills.length) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing skills: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Skills", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    page.setFont(regularFont);
    page.setFontSize(10);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing skills text: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText(structure.skills.join(" • "), {
      x: margin,
      y: yPosition,
      maxWidth: width - 2 * margin,
      lineHeight: 12,
      color: rgb(0, 0, 0),
    });
    updateYPosition(20);
  }

  // Experience
  if (Array.isArray(structure.experiences) && structure.experiences.length) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing experience: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Experience", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    structure.experiences.forEach((exp) => {
      const dateRange = exp.startDate ? `(${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ""})` : "";
      const header = `${exp.title || ""} — ${exp.company || ""} ${dateRange}`;
      page.setFont(boldFont);
      page.setFontSize(11);
      if (!Number.isFinite(yPosition)) {
        console.error(`Invalid yPosition before drawing experience header: ${yPosition}`);
        throw new Error(`Invalid yPosition: ${yPosition}`);
      }
      page.drawText(header, { x: margin, y: yPosition, color: rgb(0, 0, 0) });
      updateYPosition(15);

      if (exp.location) {
        page.setFont(regularFont);
        page.setFontSize(9);
        if (!Number.isFinite(yPosition)) {
          console.error(`Invalid yPosition before drawing experience location: ${yPosition}`);
          throw new Error(`Invalid yPosition: ${yPosition}`);
        }
        page.drawText(exp.location, { x: margin, y: yPosition, color: rgb(0.4, 0.4, 0.4) });
        updateYPosition(12);
      }

      if (Array.isArray(exp.bullets) && exp.bullets.length) {
        exp.bullets.forEach((b) => {
          page.setFont(regularFont);
          page.setFontSize(10);
          if (!Number.isFinite(yPosition)) {
            console.error(`Invalid yPosition before drawing experience bullet: ${yPosition}`);
            throw new Error(`Invalid yPosition: ${yPosition}`);
          }
          page.drawText(`• ${b}`, {
            x: margin + 10,
            y: yPosition,
            maxWidth: width - 2 * margin - 10,
            lineHeight: 12,
            color: rgb(0, 0, 0),
          });
          updateYPosition(12);
        });
      }
      updateYPosition(10);
    });
  }

  // Education
  if (Array.isArray(structure.education) && structure.education.length) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing education: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Education", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    structure.education.forEach((ed) => {
      const dateRange = ed.startDate ? `(${ed.startDate}${ed.endDate ? ` - ${ed.endDate}` : ""})` : "";
      page.setFont(boldFont);
      page.setFontSize(11);
      if (!Number.isFinite(yPosition)) {
        console.error(`Invalid yPosition before drawing education entry: ${yPosition}`);
        throw new Error(`Invalid yPosition: ${yPosition}`);
      }
      page.drawText(`${ed.degree || ""} • ${ed.institution || ""} ${dateRange}`, {
        x: margin,
        y: yPosition,
        color: rgb(0, 0, 0),
      });
      updateYPosition(15);

      if (ed.notes) {
        page.setFont(regularFont);
        page.setFontSize(9);
        if (!Number.isFinite(yPosition)) {
          console.error(`Invalid yPosition before drawing education notes: ${yPosition}`);
          throw new Error(`Invalid yPosition: ${yPosition}`);
        }
        page.drawText(ed.notes, {
          x: margin,
          y: yPosition,
          maxWidth: width - 2 * margin,
          lineHeight: 12,
          color: rgb(0.4, 0.4, 0.4),
        });
        updateYPosition(12);
      }
      updateYPosition(10);
    });
  }

  // Projects
  if (Array.isArray(structure.projects) && structure.projects.length) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing projects: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Projects", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    structure.projects.forEach((p) => {
      page.setFont(boldFont);
      page.setFontSize(11);
      if (!Number.isFinite(yPosition)) {
        console.error(`Invalid yPosition before drawing project name: ${yPosition}`);
        throw new Error(`Invalid yPosition: ${yPosition}`);
      }
      page.drawText(`${p.name}${p.link ? ` • ${p.link}` : ""}`, { x: margin, y: yPosition, color: rgb(0, 0, 0) });
      updateYPosition(15);

      if (p.summary) {
        page.setFont(regularFont);
        page.setFontSize(10);
        if (!Number.isFinite(yPosition)) {
          console.error(`Invalid yPosition before drawing project summary: ${yPosition}`);
          throw new Error(`Invalid yPosition: ${yPosition}`);
        }
        page.drawText(p.summary, {
          x: margin,
          y: yPosition,
          maxWidth: width - 2 * margin,
          lineHeight: 12,
          color: rgb(0, 0, 0),
        });
        updateYPosition(12);
      }
      if (p.tech && p.tech.length) {
        page.setFont(regularFont);
        page.setFontSize(9);
        if (!Number.isFinite(yPosition)) {
          console.error(`Invalid yPosition before drawing project tech: ${yPosition}`);
          throw new Error(`Invalid yPosition: ${yPosition}`);
        }
        page.drawText(`Tech: ${p.tech.join(", ")}`, {
          x: margin,
          y: yPosition,
          color: rgb(0.4, 0.4, 0.4),
        });
        updateYPosition(12);
      }
      updateYPosition(10);
    });
  }

  // Certifications
  if (Array.isArray(structure.certifications) && structure.certifications.length) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing certifications: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Certifications", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    page.setFont(regularFont);
    page.setFontSize(10);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing certifications text: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText(structure.certifications.join(" • "), {
      x: margin,
      y: yPosition,
      maxWidth: width - 2 * margin,
      lineHeight: 12,
      color: rgb(0, 0, 0),
    });
    updateYPosition(20);
  }

  // Hobbies
  if (Array.isArray(structure.hobbies) && structure.hobbies.length) {
    page.setFont(boldFont);
    page.setFontSize(12);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing hobbies: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText("Interests", { x: margin, y: yPosition, color: rgb(0, 0, 0) });
    updateYPosition(15);

    page.setFont(regularFont);
    page.setFontSize(10);
    if (!Number.isFinite(yPosition)) {
      console.error(`Invalid yPosition before drawing hobbies text: ${yPosition}`);
      throw new Error(`Invalid yPosition: ${yPosition}`);
    }
    page.drawText(structure.hobbies.join(" • "), {
      x: margin,
      y: yPosition,
      maxWidth: width - 2 * margin,
      lineHeight: 12,
      color: rgb(0, 0, 0),
    });
    updateYPosition(20);
  }

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes).toString("base64");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action = "generate", userData, resumeJson, message, enhancementPrompt } = body;

    if (action === "generate") {
      if (!userData) {
        return NextResponse.json({ success: false, message: "userData is required" }, { status: 400 });
      }

      const prompt = `Create a professional resume JSON (exact schema required) for the following user data. Do not output any explanatory text — only the JSON object.\n\nUser data:\n${JSON.stringify(userData, null, 2)}`;
      const aiText = await askModel(prompt);

      let resumeJsonObj;
      try {
        resumeJsonObj = JSON.parse(aiText);
      } catch {
        const cleanedText = aiText.replace(/```json|```/g, "").trim();
        const firstBrace = cleanedText.indexOf("{");
        const lastBrace = cleanedText.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1) {
          resumeJsonObj = JSON.parse(cleanedText.slice(firstBrace, lastBrace + 1));
        } else {
          throw new Error("Failed to parse model JSON output");
        }
      }

      const html = resumeJsonObj.html || generateHtmlFromStructure(resumeJsonObj);
      const pdfBase64 = await createPdfBase64(resumeJsonObj);

      return NextResponse.json({ success: true, resumeJson: resumeJsonObj, html, pdfBase64 });
    }

    if (action === "enhance") {
      if (!resumeJson || !enhancementPrompt) {
        return NextResponse.json({ success: false, message: "resumeJson and enhancementPrompt are required" }, { status: 400 });
      }

      const prompt = `You are given the following resume JSON (strict schema):\n${JSON.stringify(resumeJson, null, 2)}\n\nApply the enhancement: "${enhancementPrompt}". Return the entire updated resume as a JSON object (same schema). Do not output any explanatory text — only the JSON object.`;
      const aiText = await askModel(prompt);

      let updatedJson;
      try {
        updatedJson = JSON.parse(aiText);
      } catch {
        const cleanedText = aiText.replace(/```json|```/g, "").trim();
        const firstBrace = cleanedText.indexOf("{");
        const lastBrace = cleanedText.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1) {
          updatedJson = JSON.parse(cleanedText.slice(firstBrace, lastBrace + 1));
        } else {
          throw new Error("Failed to parse model JSON output for enhancement");
        }
      }

      const html = updatedJson.html || generateHtmlFromStructure(updatedJson);
      const pdfBase64 = await createPdfBase64(updatedJson);

      return NextResponse.json({ success: true, resumeJson: updatedJson, html, pdfBase64 });
    }

    if (action === "chat") {
      if (!resumeJson || !message) {
        return NextResponse.json({ success: false, message: "resumeJson and message are required" }, { status: 400 });
      }

      const prompt = `You are a helpful resume assistant. Here is the current resume JSON:\n${JSON.stringify(resumeJson, null, 2)}\n\nUser message:\n${message}\n\nProvide a helpful, concise response.`;
      const aiText = await askModel(prompt);
      return NextResponse.json({ success: true, aiMessage: aiText });
    }

    return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: String(error) }, { status: 500 });
  }
}

function generateHtmlFromStructure(s) {
  const escape = (str = "") =>
    String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  let html = `
    <style>
      .resume { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
      .resume h1 { font-size: 28px; margin-bottom: 5px; }
      .resume h3 { font-size: 18px; color: #555; margin-bottom: 10px; }
      .resume h4 { font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #eee; }
      .resume .contact { font-size: 14px; color: #666; margin-bottom: 20px; }
      .resume p { font-size: 14px; line-height: 1.5; }
      .resume ul { list-style-type: disc; margin-left: 20px; font-size: 14px; line-height: 1.5; }
      .resume .exp strong { font-weight: bold; }
      .resume .exp div { font-size: 13px; color: #777; }
    </style>
    <div class="resume">
      <header>
        <h1>${escape(s.name || "")}</h1>
        <h3>${escape(s.title || "")}</h3>
      </header>
  `;
  if (s.contact) {
    html += `<p class="contact">${[s.contact.email, s.contact.phone, s.contact.address].filter(Boolean).join(" • ")}${s.contact.links && s.contact.links.length ? ` • ${s.contact.links.map(link => `<a href="${escape(link)}">${escape(link)}</a>`).join(" • ")}` : ""}</p>`;
  }
  if (s.summary) html += `<section><h4>Professional Summary</h4><p>${escape(s.summary)}</p></section>`;
  if (s.skills && s.skills.length) html += `<section><h4>Skills</h4><p>${escape(s.skills.join(" • "))}</p></section>`;
  if (s.experiences && s.experiences.length) {
    html += `<section><h4>Experience</h4>`;
    s.experiences.forEach((e) => {
      html += `<div class="exp"><strong>${escape(e.title || "")}</strong> — ${escape(e.company || "")}<div>${escape((e.startDate || "") + (e.endDate ? ` - ${e.endDate}` : ""))}${e.location ? ` • ${escape(e.location)}` : ""}</div>`;
      if (e.bullets && e.bullets.length) {
        html += `<ul>${e.bullets.map((b) => `<li>${escape(b)}</li>`).join("")}</ul>`;
      }
      html += `</div>`;
    });
    html += `</section>`;
  }
  if (s.education && s.education.length) {
    html += `<section><h4>Education</h4>`;
    s.education.forEach((ed) => {
      html += `<div><strong>${escape(ed.degree || "")}</strong> • ${escape(ed.institution || "")}<div>${escape((ed.startDate || "") + (ed.endDate ? ` - ${ed.endDate}` : ""))}</div>`;
      if (ed.notes) html += `<p>${escape(ed.notes)}</p>`;
      html += `</div>`;
    });
    html += `</section>`;
  }
  if (s.projects && s.projects.length) {
    html += `<section><h4>Projects</h4>`;
    s.projects.forEach((p) => {
      html += `<div><strong>${escape(p.name || "")}</strong>${p.link ? ` • <a href="${escape(p.link)}">${escape(p.link)}</a>` : ""}`;
      if (p.summary) html += `<p>${escape(p.summary)}</p>`;
      if (p.tech && p.tech.length) html += `<p>Tech: ${escape(p.tech.join(", "))}</p>`;
      html += `</div>`;
    });
    html += `</section>`;
  }
  if (s.certifications && s.certifications.length) html += `<section><h4>Certifications</h4><p>${escape(s.certifications.join(" • "))}</p></section>`;
  if (s.hobbies && s.hobbies.length) html += `<section><h4>Interests</h4><p>${escape(s.hobbies.join(" • "))}</p></section>`;
  html += `</div>`;
  return html;
}