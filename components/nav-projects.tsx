"use client"

import {
  type LucideIcon,
} from "lucide-react"


import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {usePathname} from "next/navigation";

export function NavProjects({
  menuItems,
}: {
  menuItems: {
    name: string
    href: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  const isActive = !!pathname

  console.log(pathname, isActive)


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.href} >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>

          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
