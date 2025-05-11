
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Menu', url: '/menu', icon: FileText },
    { name: 'Reservations', url: '/reservations', icon: Briefcase },
    { name: 'Contact', url: '/contact', icon: User }
  ]

  return <NavBar items={navItems} />
}
