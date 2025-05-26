import type React from "react"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"

// Mock authentication check - in a real app, this would check session/cookies
const isAdmin = true // Set to true for demonstration

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Redirect to login if not admin
  if (!isAdmin) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
