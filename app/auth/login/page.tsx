"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/register logic here
    console.log({ email, password, isLogin })
  }

  return (
    <div
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-cover bg-center py-12"
      style={{ backgroundImage: "url('/slider-images/backgroundLogin.png')" }}
    >
      <div className="w-full max-w-md rounded-lg p-8 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
            {isLogin ? "Đăng nhập vào tài khoản" : "Tạo tài khoản mới"}
          </h1>
          <p className="text-sm text-slate-300">
            {isLogin ? "Nhập email và mật khẩu để đăng nhập" : "Nhập email và mật khẩu để tạo tài khoản"}
          </p>
        </div>

        <div className="grid gap-6 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500"
                />
              </div>

              {email && (
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-slate-300">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3 text-slate-400 hover:text-slate-200 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                {email ? (isLogin ? "Đăng nhập" : "Đăng ký") : "Tiếp tục"}
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-slate-400">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full bg-[#DB4437] hover:bg-[#c53d2e] text-white border-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#1877F2] hover:bg-[#166eeb] text-white border-none"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-slate-300">
          {isLogin ? (
            <p>
              Chưa có tài khoản?{" "}
              <Button variant="link" className="p-0 h-auto text-sky-400 hover:text-sky-300" onClick={() => setIsLogin(false)}>
                Đăng ký
              </Button>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{" "}
              <Button variant="link" className="p-0 h-auto text-sky-400 hover:text-sky-300" onClick={() => setIsLogin(true)}>
                Đăng nhập
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
