"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Define a simple user type to fix linter error
interface User {
  name: string;
  // Add other user properties as needed
}

// Mock user data - in a real app, this would come from authentication
const user: User | null = null // Set to null for logged out state

const menuItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  {
    name: "Dịch vụ",
    href: "/services",
    submenu: [
      {
        name: "Đăng bài viết tự động bằng AI",
        href: "/services/auto-posting",
      },
      {
        name: "Chatbot tự động",
        href: "/services/chatbot",
      },
      {
        name: "Gửi tin nhắn tự động",
        href: "/services/auto-messaging",
      },
    ],
  },
  { name: "Khuyến mại", href: "/promotions" },
  { name: "Tin AI", href: "/ai-news" },
  { name: "Video AI", href: "/ai-videos" },
  { name: "Video hướng dẫn cài đặt", href: "/setup-guides" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/slider-images/logo.png" alt="AI Services Logo" width={150} height={150} />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="link"
                        className={cn(
                          "flex items-center gap-1 p-0",
                          pathname.startsWith(item.href) && "font-medium text-primary",
                        )}
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.submenu.map((subitem) => (
                        <DropdownMenuItem key={subitem.name} asChild>
                          <Link href={subitem.href}>{subitem.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* User section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                <span className="mr-2">Số dư:</span>
                <span className="text-primary">100 Xu</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                      <AvatarFallback>{user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile">Thông tin cá nhân</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/services">Dịch vụ của tôi</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/payment">Nạp tiền</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild>
              <Link href="/auth/login">Đăng nhập / Đăng ký</Link>
            </Button>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {menuItems.map((item) => (
              <div key={item.name} className="py-2">
                {item.submenu ? (
                  <div>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-between"
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", openSubmenu === item.name && "rotate-180")}
                      />
                    </Button>
                    {openSubmenu === item.name && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block py-2 pl-3 pr-4 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-base font-medium",
                      pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
