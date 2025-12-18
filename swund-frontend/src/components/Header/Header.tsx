'use client'; 

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BsList } from 'react-icons/bs';
import { IoIosCloseCircle } from 'react-icons/io';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Markets', href: '/markets' },
    { label: 'Agents', href: '/agents' },        // Future: Swund Agents marketplace
    { label: 'Community', href: '/community' },
    { label: 'Portfolio', href: '/portfolio' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-base-200/80 backdrop-blur-md border-b border-base-300">
      <div className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-spin-slow" />
              <span className="text-2xl font-bold text-white font-mono hidden sm:block">
                Swund
              </span>
              <span className="text-2xl font-bold text-white font-mono sm:hidden">
                Swund
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Wallet Connect + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Desktop: Connect Button */}
            <div className="hidden md:block">
              <ConnectButton
                accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
                showBalance={{ smallScreen: false, largeScreen: true }}
              />
            </div>

            {/* Mobile: Hamburger */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <BsList size={32} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-base-100 lg:hidden">
            <div className="container mx-auto px-6 pt-8">
              <div className="flex justify-between items-center mb-12">
                <a href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <span className="text-2xl font-bold text-white">Swund</span>
                </a>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <IoIosCloseCircle size={36} className="text-white" />
                </button>
              </div>

              <nav className="flex flex-col space-y-8 text-center">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-medium text-white/90 hover:text-white transition"
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-8">
                  <ConnectButton />
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;