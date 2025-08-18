"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";
import { FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    setUserDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="bg-black text-white font-bold text-xl p-2 rounded">
                K
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Kalamkunja
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-blue-600 border-blue-500 border-b-2 px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/v1/articles"
                className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
              >
                Articles
              </Link>
              <Link
                href="/v1/category"
                className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Search and Auth */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center rounded-md px-3 py-2 bg-gray-100">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                className="ml-2 bg-transparent text-sm focus:outline-none w-40"
              />
            </div>

            {status === "authenticated" ? (
              <div className="hidden md:flex md:ml-4 relative">
                <button
                  ref={userButtonRef}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex text-sm rounded-full focus:outline-none"
                >
                  <span className="sr-only">Open user menu</span>
                  {session.user?.image ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || "User"}
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8 flex items-center justify-center">
                      <UserCircleIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </button>

                {/* User dropdown */}
                {userDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user?.email || ""}
                        </p>
                      </div>
                      <Link
                        href={`/v1/profile/${session.user.email}`}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserCircleIcon className="h-5 w-5 mr-2" />
                        Your Profile
                      </Link>
                      <Link
                        href="/v1/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <ChartBarIcon className="h-5 w-5 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <CogIcon className="h-5 w-5 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        <FaArrowRight className="h-5 w-5 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex md:ml-4">
                <Link
                  href="/v1/auth/login"
                  className="ml-4 px-4 py-1.5 text-black text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/v1/auth/signup"
                  className="ml-4 px-4 py-1.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/0 ">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="bg-black text-white font-bold text-xl p-2 rounded">
                  K
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Kalamkunja
                </span>
              </Link>
              <button
                type="button"
                className="p-2 rounded-md text-gray-500 hover:text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center rounded-md px-3 py-2 bg-gray-100 mb-4">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="ml-2 bg-transparent text-sm focus:outline-none w-full"
                />
              </div>

              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-blue-600 bg-blue-50"
                >
                  Home
                </Link>
                <Link
                  href="/v1/articles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Articles
                </Link>
                <Link
                  href="/v1/category"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
              </div>

              {status === "authenticated" ? (
                <div className="pt-4 mt-4 border-t">
                  <div className="flex items-center px-3 py-2">
                    {session.user?.image ? (
                      <img
                        className="h-10 w-10 rounded-full mr-3"
                        src={session.user.image}
                        alt={session.user.name || "User"}
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <UserCircleIcon className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1">
                    <Link
                      href={`/v1/profile/${session.user.email}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      Your Profile
                    </Link>
                    <Link
                      href="/v1/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <CogIcon className="h-5 w-5 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center py-2 px-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t">
                  <Link
                    href="/v1/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2 px-4 rounded-md text-center text-base font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/v1/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full mt-2 py-2 px-4 rounded-md text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
