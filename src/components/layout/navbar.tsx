"use client"

import * as React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Search, Menu, X, Sun, Moon } from 'lucide-react'
// Using relative imports as required
import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
// Import sponsor bar component
import SponsorBar from '../../components/ui/sponsor-bar'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Deals', href: '/deals' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Comparisons', href: '/comparisons' },
  { name: 'Tutorials', href: '/tutorials' },
  { name: 'Freebies', href: '/freebies' },
  { name: 'News', href: '/news' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-lg shadow-md py-2" : "bg-transparent py-4"
      )}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <span className="relative h-9 w-9 sm:h-10 sm:w-36">
              <Image 
                src="/img/logo.png" 
                alt="TopVSTs Logo" 
                fill
                className="object-contain" 
                priority
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions Group */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="ml-2 text-sm">Search</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className={cn(
          "container overflow-hidden transition-all duration-300",
          isSearchOpen ? "h-14 opacity-100 mt-2" : "h-0 opacity-0"
        )}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for plugins, reviews, tutorials..."
              className="w-full bg-muted h-10 pl-9 pr-4 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        {/* Sponsor Bar */}
        <SponsorBar className="mt-2" />
      </header>

      {/* Mobile Menu */}
      <div className={cn(
        "mobile-menu lg:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-8 pt-24">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-3 px-4 text-lg font-medium border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="mt-6 flex items-center justify-between">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  )
}

export default Navbar;
