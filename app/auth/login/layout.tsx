import type React from "react"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image - Lightened or different image might be better for a light theme */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slider-images/backgroundLogin.png')" }} // Consider a lighter background image
      >
        {/* Reduced overlay to make it brighter, or remove it entirely */}
        <div className="absolute inset-0 bg-black/20" /> 
      </div>
      
      {/* Login Form */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        {/* Changed to a light, slightly transparent background */}
        <div className="w-full max-w-md rounded-lg bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
} 