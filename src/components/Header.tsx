"use client";

import Link from "next/link";
import { useState } from "react";
import PadoEmblem from "./PadoEmblem";

interface HeaderProps {
  dir?: string;
  dirPath?: string;
  subDir?: string;
}

export default function Header({ dir, dirPath, subDir }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="border-b relative">
      <nav className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <Link href="/" className="text-xl font-bold hover:text-blue-600">
              <PadoEmblem height={24} />
            </Link>
          </div>

          {/* Hamburger button for mobile */}
          <button
            className="sm:hidden z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-blue-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu modal */}
        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-20 bg-white rounded-sm border shadow-sm z-40">
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {dir && (
          <div className="mt-2 text-sm text-gray-500">
            <Link href={dirPath || "#"} className="hover:text-blue-600">
              {dir}
            </Link>
            {subDir && (
              <>
                <span className="mx-2">/</span>
                <span>{subDir}</span>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
