'use client';
import { useState } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-20 p-2 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <div className="bg-blue-600 text-white font-bold text-sm p-2 rounded">
            N
          </div>
        </button>
      )}

      <div 
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white font-bold text-xl p-2 rounded">
              N
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Kalamkunja
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/articles" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
            </li>
            <li>
              <Link 
                href="/v1/category" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>

          <div className="mt-8 pt-4 border-t">
            <button className="w-full mb-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Sign in
            </button>
            <button className="w-full px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Sign up
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}