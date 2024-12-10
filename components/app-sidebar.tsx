"use client"

import * as React from "react"
import {
    CreditCard, DollarSign, FileText,
    History, Home,
    MessageSquare, User,
    Users,
} from "lucide-react"


import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"



const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Pay Levy', href: '/dashboard/pay-levy', icon: CreditCard },
  { name: 'Payment History', href: '/dashboard/payment-history', icon: History },
  { name: 'Expenses', href: '/dashboard/expenses', icon: DollarSign },
  { name: 'Visitors', href: '/dashboard/visitors', icon: Users },
  { name: 'Communication', href: '/dashboard/communication', icon: MessageSquare },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Residents', href: '/dashboard/residents', icon: Users },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={'mx-1.5'}>
            <h1 className={'text-2xl font-extrabold text-blue-600 uppercase'}>Resido</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects menuItems={navItems} />
      </SidebarContent>
      <SidebarFooter>
          <div className={'mx-1 my-4'}>
              <User size={25}/>
          </div>
      </SidebarFooter>
        <SidebarRail/>
    </Sidebar>
  )
}
