
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { useLanguage } from "@/contexts/LanguageContext"
import { Link } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FlagUS, FlagRU, FlagAM } from '@/components/Flags'

export function NavBarDemo() {
  const { language, setLanguage } = useLanguage()
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Menu', url: '/menu', icon: FileText },
    { name: 'Reservations', url: '/reservations', icon: Briefcase },
    { name: 'Contact', url: '/contact', icon: User }
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 w-full">
      <div className="relative max-w-4xl w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white/70 dark:bg-background/70 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          <Link to="/" className="mr-2 flex items-center">
            <img 
              src="/lovable-uploads/310ac2a1-3c6b-4705-bf17-e72727b92a23.png" 
              alt="Kings Love Meat" 
              className="h-8 md:h-10"
            />
          </Link>
          
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.url}
                className="relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors text-foreground/80 hover:text-brand-gold"
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
              </Link>
            )
          })}
          
          <div className="ml-2 block">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center p-2">
                {language === 'en' && <FlagUS className="w-5 h-5" />}
                {language === 'am' && <FlagAM className="w-5 h-5" />}
                {language === 'ru' && <FlagRU className="w-5 h-5" />}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-background/95 backdrop-blur-lg">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center">
                  <FlagUS className="w-5 h-5 mr-2" />
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('am')} className="flex items-center">
                  <FlagAM className="w-5 h-5 mr-2" />
                  <span>Հայերեն</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ru')} className="flex items-center">
                  <FlagRU className="w-5 h-5 mr-2" />
                  <span>Русский</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
