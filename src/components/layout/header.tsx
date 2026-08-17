"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-navy)] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-[var(--color-gold)]">
            Looka
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/features" className="hover:text-[var(--color-gold)] transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-[var(--color-gold)] transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-[var(--color-gold)] transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-white hover:text-[var(--color-gold)] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold rounded-lg hover:bg-[#D4922E] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col gap-4">
              <Link
                href="/features"
                className="hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <hr className="border-white/10" />
              <Link
                href="/login"
                className="hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy)] font-semibold rounded-lg text-center hover:bg-[#D4922E] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
