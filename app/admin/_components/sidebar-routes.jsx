import { CalendarCheck2, Home, LayoutDashboard, ShieldCheck } from "lucide-react"
import { SidebarLink } from "./sidebar-link"

  const routes = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Events",
      href: "/admin/events",
      icon: CalendarCheck2
    },
    {
      label: "Admins",
      href: "/admin/admins",
      icon: ShieldCheck
    },
    {
      label: "Landing Page",
      href: "/admin/landing-page",
      icon: Home
    },
  ]

export const SidebarRoutes = ({ className }) => {
  return (
    <div className={className}>
      {
        routes.map(route => (
          <SidebarLink key={route.label} label={route.label} href={route.href} icon={route.icon} />
        ))
      }
    </div>
  )
}