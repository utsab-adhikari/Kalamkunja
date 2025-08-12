"use client";
import React, { useState } from "react";
import {toast } from "react-hot-toast";

export default function ResumePage() {
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  const [pdfBase64, setPdfBase64] = useState("");
  const [resumeJson, setResumeJson] = useState(null);
  const [aiMessage, setAiMessage] = useState("");
  const [enhancementPrompt, setEnhancementPrompt] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [form, setForm] = useState({
    name: "Utsab Adhikari",
    title: "Software Developer",
    email: "utsabadhikari075@gmail.com",
    phone: "99867508725",
    address: "Kathmandu, Nepal",
    links: "https://linkedin.com/in/utsabadhikari,https://github.com/utsabadhikari",
    specialization: "Full-Stack Development",
    skills: "NextJs,ReactJs,ExpressJs,NodeJs,TailwindCss,CSS,HTML,JavaScript,C,C++,Bootstrap,SEO,Git",
    experiences: "Developer | Kalamkunja | 2025-01-2025-01 | Kathmandu, Nepal | Developed and maintained a full-stack application, enhancing user experience and engagement;Gained practical knowledge in SEO, improving site visibility and traffic",
    education: "BEIT | NCIT | 2024-2028 | Engineering in IT",
    projects: "Kalamkunja | https://kalamkunja.vercel.app | An article platform that allows users to publish and share articles seamlessly | NextJs,MongoDB",
    certifications: "",
    hobbies: "Programming",
  });

  function validateForm() {
    const errors = {};
    if (!form.name.trim()) errors.name = "Full name is required";
    if (!form.title.trim()) errors.title = "Professional title is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email format";
    if (form.phone && !/^\+?[\d\s-]{7,15}$/.test(form.phone)) errors.phone = "Invalid phone number format (e.g., +977-1234567890)";
    if (form.links) {
      const links = form.links.split(",").map((l) => l.trim()).filter(Boolean);
      if (links.some((l) => !/^https?:\/\/.+$/.test(l))) errors.links = "Links must be valid URLs (e.g., https://linkedin.com)";
    }
    if (!form.specialization.trim()) errors.specialization = "Specialization is required (e.g., Full-Stack Development)";
    if (!form.skills.trim()) errors.skills = "At least one skill is required (e.g., JavaScript, React)";
    if (form.experiences) {
      const expLines = form.experiences.split("\n").map((ln) => ln.trim()).filter(Boolean);
      expLines.forEach((ln, i) => {
        const parts = ln.split("|").map((p) => p.trim());
        if (parts.length < 5 || !parts[0] || !parts[1] || !parts[2] || !parts[3] || !parts[4])
          errors.experiences = `Invalid experience format at line ${i + 1}. Use: Title | Company | YYYY-MM-YYYY-MM | Location | Bullet1;Bullet2`;
      });
    }
    if (form.education) {
      const eduLines = form.education.split("\n").map((ln) => ln.trim()).filter(Boolean);
      eduLines.forEach((ln, i) => {
        const parts = ln.split("|").map((p) => p.trim());
        if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2])
          errors.education = `Invalid education format at line ${i + 1}. Use: Degree | Institution | YYYY-YYYY | Notes`;
      });
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  }

  function buildUserData() {
    const parseCsv = (s) => (s ? s.split(",").map((t) => t.trim()).filter(Boolean) : []);
    const experiences = (form.experiences || "")
      .split("\n")
      .map((ln) => ln.trim())
      .filter(Boolean)
      .map((ln) => {
        const parts = ln.split("|").map((p) => p.trim());
        const bullets = parts[4] ? parts[4].split(";").map((b) => b.trim()).filter(Boolean) : [];
        return {
          title: parts[0] || "",
          company: parts[1] || "",
          startDate: parts[2] ? (parts[2].split("-")[0] || "").trim() : "",
          endDate: parts[2] ? (parts[2].split("-")[1] || "Present").trim() : "Present",
          location: parts[3] || "",
          bullets,
        };
      });

    const education = (form.education || "")
      .split("\n")
      .map((ln) => ln.trim())
      .filter(Boolean)
      .map((ln) => {
        const p = ln.split("|").map((i) => i.trim());
        return {
          degree: p[0] || "",
          institution: p[1] || "",
          startDate: p[2] ? (p[2].split("-")[0] || "").trim() : "",
          endDate: p[2] ? (p[2].split("-")[1] || "Present").trim() : "Present",
          notes: p[3] || "",
        };
      });

    const projects = (form.projects || "")
      .split("\n")
      .map((ln) => ln.trim())
      .filter(Boolean)
      .map((ln) => {
        const p = ln.split("|").map((i) => i.trim());
        const tech = p[3] ? p[3].split(",").map((t) => t.trim()).filter(Boolean) : [];
        return {
          name: p[0] || "",
          link: p[1] || "",
          summary: p[2] || "",
          tech,
        };
      });

    return {
      name: form.name.trim(),
      title: form.title.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      links: parseCsv(form.links),
      specialization: form.specialization.trim(),
      skills: parseCsv(form.skills),
      experiences,
      education,
      projects,
      certifications: parseCsv(form.certifications),
      hobbies: parseCsv(form.hobbies),
    };
  }

  async function handleGenerate(e) {
    e?.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix form errors before generating.");
      return;
    }
    setLoading(true);
    setAiMessage("");
    try {
      const userData = buildUserData();
      const res = await fetch("/api/v1/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", userData }),
      });
      const json = await res.json();
      if (!json.success) {
        toast.error("Failed: " + (json.message || "Unknown error"));
        setAiMessage("Failed: " + (json.message || "unknown"));
      } else {
        setResumeJson(json.resumeJson);
        setHtml(json.html);
        setPdfBase64(json.pdfBase64);
        setAiMessage("Resume generated successfully.");
        toast.success("Resume generated successfully!");
      }
    } catch (err) {
      toast.error("Error: " + String(err));
      setAiMessage("Error: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  function downloadPdf() {
    if (!pdfBase64) {
      toast.error("No PDF available to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64," + pdfBase64;
    link.download = `${(resumeJson && resumeJson.name) || "resume"}.pdf`;
    link.click();
    toast.success("PDF downloaded!");
  }

  function downloadTextResume() {
    if (!resumeJson?.text) {
      toast.error("No text resume available to download.");
      return;
    }
    const blob = new Blob([resumeJson.text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${(resumeJson && resumeJson.name) || "resume"}.txt`;
    link.click();
    toast.success("Text resume downloaded!");
  }

  function copyTextResume() {
    if (!resumeJson?.text) {
      toast.error("No text resume available to copy.");
      return;
    }
    navigator.clipboard?.writeText(resumeJson.text);
    toast.success("Text resume copied to clipboard!");
  }

  async function handleEnhance() {
    if (!resumeJson || !enhancementPrompt.trim()) {
      toast.error("Please generate a resume and provide an enhancement prompt.");
      setAiMessage("Please generate a resume first and provide an enhancement prompt.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enhance", resumeJson, enhancementPrompt }),
      });
      const json = await res.json();
      if (json.success) {
        setResumeJson(json.resumeJson);
        setHtml(json.html);
        setPdfBase64(json.pdfBase64);
        setAiMessage("Resume enhanced successfully.");
        toast.success("Resume enhanced successfully!");
      } else {
        toast.error("Enhancement failed: " + (json.message || ""));
        setAiMessage("Enhancement failed: " + (json.message || ""));
      }
    } catch (err) {
      toast.error("Error: " + String(err));
      setAiMessage("Error: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleChatSend() {
    if (!resumeJson || !chatInput.trim()) {
      toast.error("Please generate a resume and type a chat message.");
      setAiMessage("Please generate a resume first and type your chat message.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "chat", resumeJson, message: chatInput }),
      });
      const json = await res.json();
      if (json.success) {
        setAiMessage(json.aiMessage);
        toast.success("Chat response received!");
      } else {
        toast.error("Chat failed: " + (json.message || ""));
        setAiMessage("Chat failed: " + (json.message || ""));
      }
    } catch (err) {
      toast.error("Error: " + String(err));
      setAiMessage("Error: " + String(err));
    } finally {
      setChatInput("");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Professional Resume Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleGenerate}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
          aria-label="Resume input form"
        >
          <h3 className="text-2xl font-semibold text-gray-800">Enter Your Profile Details</h3>
          {[
            ["name", "Full Name *", "e.g., Utsab Adhikari"],
            ["title", "Professional Title *", "e.g., Full-Stack Software Developer"],
            ["email", "Email Address", "e.g., utsab@example.com"],
            ["phone", "Phone Number", "e.g., +977-1234567890"],
            ["address", "Address", "e.g., Kathmandu, Nepal"],
            ["links", "Links", "e.g., https://linkedin.com/in/utsab,https://github.com/utsab"],
            ["specialization", "Specialization *", "e.g., Full-Stack Development"],
            ["skills", "Skills *", "e.g., JavaScript,React,Node.js,MongoDB"],
            ["certifications", "Certifications", "e.g., AWS Certified Developer"],
            ["hobbies", "Hobbies/Interests", "e.g., Programming,Chess,Hiking"],
          ].map(([name, label, placeholder]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                name={name}
                value={form[name]}
                onChange={onChange}
                placeholder={placeholder}
                className={`mt-2 block w-full rounded-lg border ${
                  formErrors[name] ? "border-red-500" : "border-gray-300"
                } px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                aria-invalid={formErrors[name] ? "true" : "false"}
                aria-describedby={formErrors[name] ? `${name}-error` : undefined}
              />
              {formErrors[name] && (
                <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                  {formErrors[name]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label htmlFor="experiences" className="block text-sm font-medium text-gray-700">
              Experiences
            </label>
            <textarea
              id="experiences"
              name="experiences"
              value={form.experiences}
              onChange={onChange}
              rows={5}
              placeholder="One per line: Title | Company | YYYY-MM-Present | Location | Bullet1;Bullet2
e.g., Developer | Kalamkunja | 2025-01-Present | Kathmandu, Nepal | Built full-stack app;Improved SEO by 20%"
              className={`mt-2 block w-full rounded-lg border ${
                formErrors.experiences ? "border-red-500" : "border-gray-300"
              } px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
              aria-describedby="experiences-help"
            />
            {formErrors.experiences && (
              <p id="experiences-error" className="mt-1 text-sm text-red-600">
                {formErrors.experiences}
              </p>
            )}
            <p id="experiences-help" className="mt-1 text-xs text-gray-500">
              Format: Title | Company | YYYY-MM-YYYY-MM | City, Country | Achievement1;Achievement2
            </p>
          </div>

          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <textarea
              id="education"
              name="education"
              value={form.education}
              onChange={onChange}
              rows={4}
              placeholder="One per line: Degree | Institution | YYYY-Present | Notes
e.g., BEIT | NCIT | 2024-Present | Relevant Coursework: Data Structures, Web Development"
              className={`mt-2 block w-full rounded-lg border ${
                formErrors.education ? "border-red-500" : "border-gray-300"
              } px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
              aria-describedby="education-help"
            />
            {formErrors.education && (
              <p id="education-error" className="mt-1 text-sm text-red-600">
                {formErrors.education}
              </p>
            )}
            <p id="education-help" className="mt-1 text-xs text-gray-500">
              Format: Degree | Institution | YYYY-YYYY | GPA or coursework
            </p>
          </div>

          <div>
            <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
              Projects
            </label>
            <textarea
              id="projects"
              name="projects"
              value={form.projects}
              onChange={onChange}
              rows={4}
              placeholder="One per line: Name | Link | Summary | Tech1,Tech2
e.g., Kalamkunja | https://kalamkunja.vercel.app | Built a platform for articles | NextJs,MongoDB"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              aria-describedby="projects-help"
            />
            <p id="projects-help" className="mt-1 text-xs text-gray-500">
              Format: Project Name | https://... | Short summary | Tech1,Tech2
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition duration-200 ease-in-out font-medium"
            aria-label="Generate resume"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Resume"
            )}
          </button>
        </form>

        {/* Preview & Actions */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Resume Preview</h3>
            <div className="border border-gray-200 rounded-2xl bg-white p-6 overflow-auto shadow-md max-h-[600px]">
              {html ? (
                <div
                  dangerouslySetInnerHTML={{ __html: html }}
                  className="resume-preview max-w-3xl mx-auto"
                  aria-label="Resume preview"
                />
              ) : (
                <div className="text-gray-500 italic">Generate a resume to see the preview here.</div>
              )}
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={downloadPdf}
                disabled={!pdfBase64}
                className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition duration-200 ease-in-out font-medium"
                aria-label="Download PDF resume"
              >
                Download PDF
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(html);
                  toast.success("HTML copied to clipboard!");
                }}
                disabled={!html}
                className="flex-1 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition duration-200 ease-in-out font-medium"
                aria-label="Copy HTML resume"
              >
                Copy HTML
              </button>
              <button
                onClick={downloadTextResume}
                disabled={!resumeJson?.text}
                className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200 ease-in-out font-medium"
                aria-label="Download plain text resume"
              >
                Download Text Resume
              </button>
            </div>
          </div>

          {/* Enhancement */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Enhance Your Resume</h4>
            <input
              value={enhancementPrompt}
              onChange={(e) => setEnhancementPrompt(e.target.value)}
              placeholder="e.g., Tailor for full-stack developer roles, add metrics"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              aria-label="Enhancement prompt"
            />
            <button
              onClick={handleEnhance}
              disabled={loading || !resumeJson}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200 ease-in-out font-medium"
              aria-label="Apply resume enhancement"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Enhancing...
                </span>
              ) : (
                "Apply Enhancement"
              )}
            </button>
          </div>

          {/* Chat */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Chat with Resume Assistant</h4>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              rows={4}
              placeholder="e.g., How can I make my projects section stand out?"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              aria-label="Chat input"
            />
            <button
              onClick={handleChatSend}
              disabled={loading || !resumeJson}
              className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition duration-200 ease-in-out font-medium"
              aria-label="Send chat message"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg min-h-[100px] text-sm text-gray-800">
              <strong>AI Response:</strong> {aiMessage || "Waiting for your query..."}
            </div>
          </div>
        </div>
      </div>
 </div>
  );
}