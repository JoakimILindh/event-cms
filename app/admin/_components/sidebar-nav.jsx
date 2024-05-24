import { SignOutButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import { SidebarRoutes } from "./sidebar-routes"

export const SidebarNav = () => {
  return (
    <div className="border-r flex flex-col">
      <SidebarRoutes className="flex-1" />

      <SignOutButton>
        <div className="flex items-center gap-4 hover:bg-slate-500/10 cursor-pointer p-4">
          <LogOut className="size-5" />
          Sign out
        </div>
      </SignOutButton>
    </div>
  )
}