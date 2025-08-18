"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Download,
  Printer,
  Link as LinkIcon,
  Search,
  FileText,
  Mail,
  Globe,
} from "lucide-react";

export default function ResearchPaperPreview() {
  const contentRef = useRef(null);

  const sections = [
    { id: "abstract", title: "Abstract" },
    { id: "keywords", title: "Keywords" },
    { id: "introduction", title: "Introduction" },
    { id: "literature-review", title: "Literature Review" },
    { id: "methodology", title: "Methodology" },
    { id: "findings", title: "Findings & Analysis" },
    { id: "discussion", title: "Discussion" },
    { id: "policy", title: "Policy Recommendations" },
    { id: "conclusion", title: "Conclusion" },
    { id: "references", title: "References" },
    { id: "appendix", title: "Appendix (Optional)" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (e) {
      alert(
        "Couldn't copy link. You can copy it manually from the address bar."
      );
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="">
      <nav className="flex items-center text-sm text-gray-500 my-6 mx-10">
        <a href="/" className="hover:text-blue-600 transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <a
          href="/v1/articles"
          className="hover:text-blue-600 transition-colors"
        >
          Research-Paper
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Education System of Nepal</span>
      </nav>
      {/* Hero / Meta */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-4 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar TOC */}
        <aside className="lg:sticky lg:top-20 h-fit">
          <Card className="shadow-sm rounded-none border">
            <CardHeader>
              <CardTitle className="text-base">Contents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="block w-full text-left text-sm px-2.5 py-1.5 hover:bg-slate-100 transition border-b last:border-0"
                >
                  {s.title}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4 shadow-sm rounded-none border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Find</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Search className="size-4" />
                <Input
                  placeholder="Search within page (Ctrl/Cmd+F)"
                  className="rounded-none"
                />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white border rounded-none p-6 sm:p-8 shadow-sm"
          >
            {/* Paper Header */}
            <div className="text-center border-b pb-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Education System of Nepal
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                A One‑Page Research Preview (Draft)
              </p>
              <div className="mt-4 text-sm">
                <span className="font-medium">Utsab Adhikari</span>
                <span className="text-slate-400"> • </span>
                <span>BRU, Nepal</span>
                <span className="text-slate-400"> • </span>
                <a
                  href="mailto:your.email@example.com"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <Mail className="size-4" />
                  your.email@example.com
                </a>
                <span className="text-slate-400"> • </span>
                <a
                  href="https://yourwebsite.example"
                  target="_blank"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <Globe className="size-4" />
                  Website
                </a>
              </div>
            </div>

            {/* Abstract */}
            <section id="abstract" className="mt-8">
              <h3 className="text-lg font-semibold">Abstract</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                This preview summarizes key dimensions of Nepal’s education
                system across governance, access, quality, and equity. Drawing
                on open reports and secondary data, it outlines historical
                reforms, current structures (ECE, basic, secondary, and higher
                education), persistent challenges (teacher deployment, learning
                outcomes, digital divide), and opportunities including
                competency‑based curricula, teacher professional development,
                and community‑led governance.
              </p>
            </section>

            {/* Keywords */}
            <section id="keywords" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Keywords</h3>
              <p className="mt-2 text-sm text-slate-700">
                Nepal; education reform; learning outcomes; equity; federalism;
                curriculum; TVET; digital learning; policy.
              </p>
            </section>

            {/* Introduction */}
            <section id="introduction" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Introduction</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Nepal’s education landscape has evolved from centralized control
                to a federal governance structure with shared responsibilities
                across federal, provincial, and local levels. Enrollment has
                expanded substantially, yet disparities persist by geography,
                language, gender, and income.
              </p>
            </section>

            {/* Literature Review */}
            <section id="literature-review" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Literature Review</h3>
              <ul className="mt-2 text-sm list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  Historical reforms and constitutional mandates for free and
                  compulsory basic education.
                </li>
                <li>
                  Evidence on enrollment gains vs. learning poverty and dropout
                  in marginalized communities.
                </li>
                <li>
                  Comparative insights from South Asia on teacher management and
                  digital inclusion.
                </li>
              </ul>
            </section>

            {/* Methodology */}
            <section id="methodology" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Methodology</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                The full paper will use a mixed‑methods design: descriptive
                trend analysis of EMIS/LMIS data; difference‑in‑differences for
                policy shocks where feasible; and key‑informant interviews.
              </p>
            </section>

            {/* Findings */}
            <section id="findings" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">
                Findings & Analysis (Preview)
              </h3>
              <div className="mt-3 grid sm:grid-cols-2 gap-4">
                <Card className="shadow-sm rounded-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Access & Participation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Net enrollment improved at basic level; disparities
                        remain.
                      </li>
                      <li>
                        Transition rates decline after Grade 10; TVET faces
                        stigma and fragmentation.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-sm rounded-none border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Quality & Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Competency curriculum, classroom practice remains
                        textbook‑centric.
                      </li>
                      <li>
                        Teacher professional development is pivotal for
                        improvement.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Discussion */}
            <section id="discussion" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Discussion</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Federalization created opportunities for localized solutions but
                also coordination challenges. Community engagement and
                mother‑tongue instruction may reduce disparities.
              </p>
            </section>

            {/* Policy Recommendations */}
            <section id="policy" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Policy Recommendations</h3>
              <ol className="mt-2 text-sm list-decimal pl-5 space-y-2 text-slate-700">
                <li>Strengthen teacher support and mentoring.</li>
                <li>Invest in foundational learning.</li>
                <li>Close the digital divide.</li>
                <li>Align TVET with labor markets.</li>
                <li>Improve data use at local levels.</li>
              </ol>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Conclusion</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Nepal’s advances in access are real, but quality and equity gaps
                persist.
              </p>
            </section>

            {/* References */}
            <section id="references" className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">References (Samples)</h3>
              <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-700">
                <li>Government of Nepal. Education Sector Plan.</li>
                <li>UNESCO & UNICEF reports on learning outcomes.</li>
                <li>World Bank. Nepal Education System Review.</li>
              </ul>
            </section>
          </motion.div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-8">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Author. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to Top
              </Button>
              <Button onClick={handlePrint} className="gap-2">
                <Printer className="size-4" />
                Print to PDF
              </Button>
            </div>
          </div>
        </main>
      </section>

      <style jsx global>{`
        @media print {
          header,
          aside,
          .no-print {
            display: none !important;
          }
          main {
            max-width: 800px;
            margin: 0 auto;
          }
          body {
            background: white !important;
          }
          a[href]:after {
            content: "";
          }
        }
      `}</style>
    </div>
  );
}
