import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSlider from "@/components/home/hero-slider"
import PricingTable from "@/components/home/pricing-table"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSlider />

      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Dịch vụ AI tự động hàng đầu</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp các dịch vụ AI tự động giúp doanh nghiệp của bạn tối ưu hóa quy trình, tiết kiệm thời
            gian và tăng hiệu quả kinh doanh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="text-primary"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m2 12 3-3 3 3" />
                <path d="m22 12-3 3-3-3" />
                <path d="M9.1 7.1C8.5 7.7 7.7 8.5 7.1 9.1" />
                <path d="m14.9 16.9 1 1" />
                <path d="M9.1 16.9C8.5 16.3 7.7 15.5 7.1 14.9" />
                <path d="m14.9 7.1 1-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Đăng bài viết tự động bằng AI</h3>
            <p className="text-muted-foreground mb-4">
              Tự động tạo và đăng bài viết chất lượng cao lên Facebook Page hoặc Website của bạn với sự hỗ trợ của AI.
            </p>
            <Button asChild className="mt-auto">
              <Link href="/services/auto-posting">Tìm hiểu thêm</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="text-primary"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8" />
                <path d="M8 13h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Chatbot tự động</h3>
            <p className="text-muted-foreground mb-4">
              Huấn luyện chatbot AI để chăm sóc khách hàng trên Zalo, Telegram, Facebook, Shopee và các nền tảng khác.
            </p>
            <Button asChild className="mt-auto">
              <Link href="/services/chatbot">Tìm hiểu thêm</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
                className="text-primary"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Gửi tin nhắn tự động</h3>
            <p className="text-muted-foreground mb-4">
              Tự động gửi tin nhắn đến khách hàng tiềm năng hoặc khách hàng hiện tại trên các nền tảng mạng xã hội.
            </p>
            <Button asChild className="mt-auto">
              <Link href="/services/auto-messaging">Tìm hiểu thêm</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Bảng giá dịch vụ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp nhiều gói dịch vụ khác nhau để phù hợp với nhu cầu và ngân sách của bạn.
            </p>
          </div>

          <PricingTable />
        </div>
      </section>

      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Khách hàng của chúng tôi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hàng nghìn doanh nghiệp đã tin tưởng và sử dụng dịch vụ của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-center p-4">
              <img
                src={`/placeholder.svg?height=60&width=120&text=Logo ${i}`}
                alt={`Client ${i}`}
                className="h-12 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
