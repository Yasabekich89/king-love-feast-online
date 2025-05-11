
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  children?: React.ReactNode
}

export function NavBar({ items, className, children }: NavBarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  
  // Determine active tab based on current path
  const activeTab = items.find(item => 
    item.url === '/' ? location.pathname === '/' : location.pathname.startsWith(item.url)
  )?.name || items[0].name

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-4 sm:pt-6 w-full max-w-4xl px-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white/70 dark:bg-background/70 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-brand-gold",
                  isActive && "bg-muted text-brand-gold",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-brand-gold/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-gold rounded-t-full">
                      <div className="absolute w-12 h-6 bg-brand-gold/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-brand-gold/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-brand-gold/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
        {children && <div className="ml-4">{children}</div>}
      </div>
    </div>
  )
}
