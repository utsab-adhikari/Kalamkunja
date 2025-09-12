"use client";
import { useState } from "react";
import Link from "next/link";

export default function CategoryAccordion({ categories = [] }) {
  // Split categories into two halves for two columns
  const midpoint = Math.ceil(categories.length / 2);
  const leftCategories = categories.slice(0, midpoint);
  const rightCategories = categories.slice(midpoint);

  // Independent state for each column
  const [openLeftIndex, setOpenLeftIndex] = useState(null);
  const [openRightIndex, setOpenRightIndex] = useState(null);

  const toggleLeft = (index) =>
    setOpenLeftIndex(openLeftIndex === index ? null : index);

  const toggleRight = (index) =>
    setOpenRightIndex(openRightIndex === index ? null : index);

  // Small reusable accordion item
  const AccordionItem = ({ cat, index, openIndex, toggle }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Category Header */}
      <button
        onClick={() => toggle(index)}
        className="flex justify-between items-center w-full px-5 py-4 text-left hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-gray-800 font-medium">{cat.category}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transform transition-transform ${
            openIndex === index ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Description Panel */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          openIndex === index ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 bg-gray-50">
          <p className="text-sm text-gray-600">{cat.description}</p>
          <Link
            href={`/v1/category/${cat._id}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
          >
            View Articles
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">
        Explore Categories
      </h2>

      {/* Two columns on md, one column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-3">
          {leftCategories.map((cat, i) => (
            <AccordionItem
              key={cat._id}
              cat={cat}
              index={i}
              openIndex={openLeftIndex}
              toggle={toggleLeft}
            />
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-3">
          {rightCategories.map((cat, i) => (
            <AccordionItem
              key={cat._id}
              cat={cat}
              index={i}
              openIndex={openRightIndex}
              toggle={toggleRight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
