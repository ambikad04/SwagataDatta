"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  sections: string[]
  activeSection: string
  onSectionClick: (section: string) => void
}

export function MobileNav({ sections, activeSection, onSectionClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleSectionClick = (section: string) => {
    onSectionClick(section)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        onClick={toggleMenu}
        className="border-blue/20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-navy dark:text-blue"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg z-50 mt-2 border-t border-gray-200 dark:border-slate-800"
          >
            <div className="container mx-auto py-4">
              <nav className="flex flex-col space-y-4">
                {sections.map((section) => (
                  <motion.button
                    key={section}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionClick(section.toLowerCase())}
                    className={`font-medium text-left px-4 py-2 rounded-md ${
                      activeSection === section.toLowerCase()
                        ? "bg-navy/10 text-navy dark:bg-blue/20 dark:text-blue"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {section}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

