"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Đăng bài viết tự động",
    description:
      "Tự động tạo và đăng bài viết chất lượng cao lên Facebook Page hoặc Website.",
    image: "/slider-images/slider_autopost.png",
    link: "/services/auto-posting",
  },
  {
    id: 2,
    title: "Chatbot tự động",
    description:
      "Huấn luyện chatbot AI chăm sóc khách hàng đa nền tảng: Zalo, Telegram, Facebook...",
    image: "/slider-images/slider_chatbot.png",
    link: "/services/chatbot",
  },
  {
    id: 3,
    title: "Gửi tin nhắn tự động",
    description:
      "Tự động gửi tin nhắn đến khách hàng tiềm năng và hiện tại trên mạng xã hội.",
    image: "/slider-images/slider_message.png",
    link: "/services/auto-messaging",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden h-[500px]">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative flex items-center bg-slate-100"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <div className="container relative z-10 text-slate-800 h-full flex flex-col justify-center">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{slide.title}</h1>
                <p className="text-base md:text-lg mb-5 text-slate-700 line-clamp-3">{slide.description}</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-6 py-3 rounded-md">
                  <Link href={slide.link}>Tìm hiểu thêm</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full z-20"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full z-20"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
