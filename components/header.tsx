import Link from "next/link"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { UserMenu } from "@/components/user-menu"

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/patients", label: "Patients" },
  { href: "/appointments", label: "Appointments" },
  { href: "/staff", label: "Staff" },
  { href: "/lab", label: "Laboratory" },
  { href: "/billing", label: "Billing" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <Activity className="h-6 w-6 text-teal-600" />
        <span className="hidden md:inline">RURAL-HEALTH-TEAM SYSTEM </span>
      </div>

      <MobileNav />

      <nav className="ml-auto hidden md:flex md:gap-2">
        {navItems.map((item) => (
          <Button key={item.href} asChild variant="ghost" size="sm">
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>

      <UserMenu />
    </header>
  )
}
