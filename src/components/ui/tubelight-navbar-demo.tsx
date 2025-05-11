
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
    <div className="relative">
      <div className="flex items-center justify-between">
        <NavBar items={navItems}>
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <img 
                src="/lovable-uploads/310ac2a1-3c6b-4705-bf17-e72727b92a23.png" 
                alt="Kings Love Meat" 
                className="h-10 md:h-12"
              />
            </Link>
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  {language === 'en' && <FlagUS className="w-6 h-6" />}
                  {language === 'am' && <FlagAM className="w-6 h-6" />}
                  {language === 'ru' && <FlagRU className="w-6 h-6" />}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
        </NavBar>
      </div>
    </div>
  )
}
