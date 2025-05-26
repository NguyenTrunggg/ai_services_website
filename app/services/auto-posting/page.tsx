"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock, Info } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AutoPostingPage() {
  const searchParams = useSearchParams()
  const selectedPlan = searchParams.get("plan")

  const [selectedTab, setSelectedTab] = useState("template")
  const [postsPerDay, setPostsPerDay] = useState<number>(1)
  const [postingTimes, setPostingTimes] = useState<string[]>(["09:00"])
  const [numberOfPostingDays, setNumberOfPostingDays] = useState<number>(1)
  const [postingDates, setPostingDates] = useState<(Date | undefined)[]>([new Date()])
  const [businessType, setBusinessType] = useState("")
  const [keywords, setKeywords] = useState("")
  const [driveLink, setDriveLink] = useState("")
  const [currentBalance, setCurrentBalance] = useState<number>(0) // User's current xu balance
  const [facebookPostType, setFacebookPostType] = useState<"page" | "group">("page")
  const [selectedFacebookTarget, setSelectedFacebookTarget] = useState<string>("")
  // Mock data - replace with actual API call to fetch user's pages/groups
  const [userFacebookPages, setUserFacebookPages] = useState([
    { id: "page1", name: "My Awesome Page 1" },
    { id: "page2", name: "My Awesome Page 2" },
  ])
  const [userFacebookGroups, setUserFacebookGroups] = useState([
    { id: "group1", name: "My Cool Group 1" },
    { id: "group2", name: "My Cool Group 2" },
  ])
  const [facebookApiToken, setFacebookApiToken] = useState<string>("") // New state for API token/credential

  const handlePostsPerDayChange = (value: string) => {
    const numPosts = parseInt(value, 10)
    setPostsPerDay(numPosts)
    setPostingTimes(Array(numPosts).fill("09:00")) // Reset times when count changes
  }

  const handlePostingTimeChange = (index: number, time: string) => {
    const newTimes = [...postingTimes]
    newTimes[index] = time
    setPostingTimes(newTimes)
  }

  const handleNumberOfPostingDaysChange = (value: string) => {
    const numDays = parseInt(value, 10)
    if (isNaN(numDays) || numDays < 1) {
      setNumberOfPostingDays(1)
      setPostingDates([new Date()])
      return
    }
    setNumberOfPostingDays(numDays)
    setPostingDates(Array(numDays).fill(new Date())) // Reset dates when count changes
  }

  const handlePostingDateChange = (index: number, date: Date | undefined) => {
    const newDates = [...postingDates]
    newDates[index] = date
    setPostingDates(newDates)
  }

  // Submit service registration
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/auto-posting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          postsPerDay,
          postingTimes,
          numberOfPostingDays,
          postingDates,
          businessType,
          keywords,
          driveLink,
          // Add new Facebook posting details
          facebookPostType,
          selectedFacebookTarget,
          facebookApiToken, // Add the API token
        }),
      })
      if (!response.ok) throw new Error('Network response was not ok')
      toast({ title: 'Đăng ký thành công', description: 'Dịch vụ đã được đăng ký thành công', variant: 'default' })
    } catch (error) {
      toast({ title: 'Đăng ký thất bại', description: 'Có lỗi xảy ra, vui lòng thử lại', variant: 'destructive' })
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Đăng bài viết tự động bằng AI</h1>
          <p className="text-muted-foreground mt-2">
            Tự động tạo và đăng bài viết chất lượng cao lên Facebook Page hoặc Website của bạn với sự hỗ trợ của AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cấu hình dịch vụ</CardTitle>
                <CardDescription>Tùy chỉnh dịch vụ đăng bài tự động theo nhu cầu của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="template">Mẫu nội dung</TabsTrigger>
                    <TabsTrigger value="custom">Tùy chỉnh</TabsTrigger>
                  </TabsList>
                  <TabsContent value="template" className="space-y-4 pt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="business-type">Lĩnh vực kinh doanh</Label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger id="business-type">
                          <SelectValue placeholder="Chọn lĩnh vực kinh doanh" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Bán lẻ</SelectItem>
                          <SelectItem value="food">Nhà hàng / Đồ ăn</SelectItem>
                          <SelectItem value="fashion">Thời trang</SelectItem>
                          <SelectItem value="tech">Công nghệ</SelectItem>
                          <SelectItem value="education">Giáo dục</SelectItem>
                          <SelectItem value="health">Sức khỏe / Làm đẹp</SelectItem>
                          <SelectItem value="travel">Du lịch</SelectItem>
                          <SelectItem value="realestate">Bất động sản</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="custom" className="space-y-4 pt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="custom-content">Nội dung tùy chỉnh</Label>
                      <Textarea
                        id="custom-content"
                        placeholder="Nhập nội dung tùy chỉnh cho bài đăng của bạn..."
                        className="min-h-[150px]"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="posts-per-day">Số lần đăng / ngày</Label>
                    <Select value={postsPerDay.toString()} onValueChange={handlePostsPerDayChange}>
                      <SelectTrigger id="posts-per-day">
                        <SelectValue placeholder="Chọn số lần" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 lần</SelectItem>
                        <SelectItem value="2">2 lần</SelectItem>
                        <SelectItem value="3">3 lần</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    {[...Array(postsPerDay)].map((_, index) => (
                      <div className="grid gap-2" key={index}>
                        <Label htmlFor={`posting-time-${index}`}>Giờ đăng lần {index + 1}</Label>
                        <Input
                          id={`posting-time-${index}`}
                          type="time"
                          value={postingTimes[index]}
                          onChange={(e) => handlePostingTimeChange(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="posting-days">Số ngày đăng</Label>
                    <Input
                      id="posting-days"
                      type="number"
                      min={1}
                      value={numberOfPostingDays}
                      onChange={(e) => handleNumberOfPostingDaysChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    {[...Array(numberOfPostingDays)].map((_, index) => (
                      <div className="grid gap-2" key={index}>
                        <Label htmlFor={`posting-date-${index}`}>Ngày đăng {index + 1}</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {postingDates[index] ? format(postingDates[index]!, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={postingDates[index]}
                              onSelect={(date) => handlePostingDateChange(index, date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="keywords">Từ khóa</Label>
                    <Textarea
                      id="keywords"
                      placeholder="Nhập các từ khóa liên quan đến nội dung bài đăng, mỗi từ khóa cách nhau bởi dấu phẩy"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="drive-link">Link Drive</Label>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Hướng dẫn
                      </Button>
                    </div>
                    <Input
                      id="drive-link"
                      placeholder="Nhập link Google Drive chứa hình ảnh/video mô tả sản phẩm"
                      value={driveLink}
                      onChange={(e) => setDriveLink(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Link Drive phải được chia sẻ công khai và chứa hình ảnh/video mô tả sản phẩm, giá cả (nếu có)
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label>Kết nối API</Label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="facebook-api" className="text-sm text-muted-foreground">
                            Facebook
                          </Label>
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                            Hướng dẫn
                          </Button>
                        </div>
                        {/* New Facebook posting options */}
                        <div className="space-y-2 mt-1">
                          <Input 
                            id="facebook-api-token" 
                            placeholder="Nhập Facebook Access Token hoặc Page ID chính"
                            value={facebookApiToken}
                            onChange={(e) => setFacebookApiToken(e.target.value)}
                            className="mb-2"
                          />
                          <Select value={facebookPostType} onValueChange={(value: "page" | "group") => {
                            setFacebookPostType(value)
                            setSelectedFacebookTarget("") // Reset target selection
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn loại đăng" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="page">Đăng lên Page</SelectItem>
                              <SelectItem value="group">Đăng lên Nhóm</SelectItem>
                            </SelectContent>
                          </Select>

                          {facebookPostType === "page" && (
                            <Select value={selectedFacebookTarget} onValueChange={setSelectedFacebookTarget}>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn Page" />
                              </SelectTrigger>
                              <SelectContent>
                                {userFacebookPages.map(page => (
                                  <SelectItem key={page.id} value={page.id}>{page.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}

                          {facebookPostType === "group" && (
                            <Select value={selectedFacebookTarget} onValueChange={setSelectedFacebookTarget}>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn Nhóm" />
                              </SelectTrigger>
                              <SelectContent>
                                {userFacebookGroups.map(group => (
                                  <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        {/* <Input id="facebook-api" placeholder="Nhập Page ID Facebook" className="mt-1" /> */}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="website-api" className="text-sm text-muted-foreground">
                            Website
                          </Label>
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                            Hướng dẫn
                          </Button>
                        </div>
                        <Input id="website-api" placeholder="Nhập URL Website" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/">Hủy</Link>
                </Button>
                <Button>Đăng bài</Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Thông tin gói dịch vụ</CardTitle>
                <CardDescription>Chi tiết gói dịch vụ bạn đã chọn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Gói dịch vụ:</span>
                  <span className="font-semibold">Đăng bài viết tự động bằng AI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Số lần đăng/ngày:</span>
                  <span className="font-semibold">{postsPerDay}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Số ngày đăng:</span>
                  <span className="font-semibold">{numberOfPostingDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Số dư hiện tại:</span>
                  <span className="font-semibold text-primary">{currentBalance} Xu</span>
                </div>
                {currentBalance < postsPerDay * numberOfPostingDays * 3 && (
                  <p className="text-sm text-red-600">Số dư của bạn không đủ, hãy nạp thêm xu</p>
                )}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-lg">{postsPerDay * numberOfPostingDays * 3} Xu</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit}>
                  Đồng ý
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Hướng dẫn sử dụng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p>Chọn lĩnh vực kinh doanh để AI tạo nội dung phù hợp hoặc tùy chỉnh nội dung theo ý bạn.</p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p>Thiết lập thời gian và tần suất đăng bài để tự động hóa quy trình.</p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p>Thêm từ khóa liên quan để AI tạo nội dung tối ưu SEO và phù hợp với đối tượng mục tiêu.</p>
                  </div>
                  <div className="flex gap-2">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p>Kết nối API Facebook hoặc Website để hệ thống tự động đăng bài.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
