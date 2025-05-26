"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus, Eye, Edit, Key, ToggleLeft, ToggleRight, Trash2 } from "lucide-react"

// Mock data for customers
const customers = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
  email: `user${i + 1}@example.com`,
  phone: `09123456${i.toString().padStart(2, '0')}`,
  status: i % 3 === 0 ? "inactive" : "active",
  registeredDate: new Date(2023, 5 - (i % 5), 10 + i).toLocaleDateString("vi-VN"),
  lastLogin: i % 3 === 0 ? "-" : new Date(2023, 5, 20 - i).toLocaleDateString("vi-VN"),
  balance: (i + 1) * 100,
  services: (i % 5) + 1,
}))

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [historyService, setHistoryService] = useState<string | null>(null)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Quản lý khách hàng</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Thêm khách hàng
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Xuất Excel
          </Button>
          <Button variant="outline" size="sm">
            Lọc
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Tên khách hàng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày đăng ký</TableHead>
                <TableHead>Số dư</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status === "active" ? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.registeredDate}</TableCell>
                  <TableCell>
                    <span className="font-medium">{customer.balance} Xu</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCustomer(customer)
                            setShowCustomerDetails(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCustomer(customer)
                            setShowResetPassword(true)
                          }}
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Đổi mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {customer.status === "active" ? (
                            <>
                              <ToggleLeft className="h-4 w-4 mr-2" />
                              Vô hiệu hóa
                            </>
                          ) : (
                            <>
                              <ToggleRight className="h-4 w-4 mr-2" />
                              Kích hoạt
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={showCustomerDetails} onOpenChange={setShowCustomerDetails}>
          <DialogContent className="max-w-3xl max-h-[70vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Thông tin khách hàng</DialogTitle>
              <DialogDescription>Chi tiết thông tin khách hàng {selectedCustomer.name}</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="services">Dịch vụ</TabsTrigger>
                <TabsTrigger value="login-history">Lịch sử đăng nhập</TabsTrigger>
                <TabsTrigger value="payment-history">Lịch sử nạp tiền</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={selectedCustomer.name} />
                    <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedCustomer.status === "active" ? "Đã kích hoạt" : "Chưa kích hoạt"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                    <p>{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Số điện thoại</h4>
                    <p>{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Ngày đăng ký</h4>
                    <p>{selectedCustomer.registeredDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Đăng nhập gần nhất</h4>
                    <p>{selectedCustomer.lastLogin}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Số dư</h4>
                    <p className="font-medium">{selectedCustomer.balance} Xu</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Số dịch vụ đang sử dụng</h4>
                    <p>{selectedCustomer.services}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="services" className="py-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dịch vụ đang sử dụng</h3>
                  {selectedCustomer.services > 0 ? (
                    <>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tên dịch vụ</TableHead>
                            <TableHead>Loại</TableHead>
                            <TableHead>Ngày bắt đầu</TableHead>
                            <TableHead>Ngày kết thúc</TableHead>
                            <TableHead>Trạng thái</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.from({ length: selectedCustomer.services }).map((_, i) => {
                            const serviceName = i % 3 === 0
                              ? "Chatbot tự động"
                              : i % 2 === 0
                                ? "Đăng bài tự động"
                                : "Gửi tin nhắn tự động"
                            return (
                              <TableRow
                                key={i}
                                className={serviceName === "Đăng bài tự động" ? "cursor-pointer hover:bg-muted-foreground" : ""}
                                onClick={() => serviceName === "Đăng bài tự động" && setHistoryService(serviceName)}
                              >
                                <TableCell>{serviceName}</TableCell>
                                <TableCell>{i % 3 === 0 ? "1 tháng" : i % 2 === 0 ? "3 tháng" : "1 tuần"}</TableCell>
                                <TableCell>{new Date(2023, 5 - (i % 3), 10 + i).toLocaleDateString("vi-VN")}</TableCell>
                                <TableCell>{new Date(2023, 6 - (i % 3), 10 + i).toLocaleDateString("vi-VN")}</TableCell>
                                <TableCell>
                                  <Badge variant={i % 4 === 0 ? "secondary" : "default"}>
                                    {i % 4 === 0 ? "Tạm dừng" : "Đang hoạt động"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                      {historyService === "Đăng bài tự động" && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium">Lịch sử bài đăng</h3>
                          <div className="overflow-y-auto max-h-[300px]">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Ngày</TableHead>
                                  <TableHead>Giờ</TableHead>
                                  <TableHead>Nội dung</TableHead>
                                  <TableHead>Trạng thái</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <TableRow key={j}>
                                    <TableCell>{new Date(2023, 5, 10 + j).toLocaleDateString("vi-VN")}</TableCell>
                                    <TableCell>{`${9 + j}:00`}</TableCell>
                                    <TableCell>Bài viết số {j + 1}</TableCell>
                                    <TableCell>
                                      <Badge variant={j % 2 === 0 ? "default" : "destructive"}>
                                        {j % 2 === 0 ? "Thành công" : "Thất bại"}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-muted-foreground">Khách hàng chưa sử dụng dịch vụ nào.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="login-history" className="py-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Lịch sử đăng nhập</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Thiết bị</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>{new Date(2023, 5, 20 - i, 10 + i, 30 - i * 5).toLocaleString("vi-VN")}</TableCell>
                          <TableCell>192.168.1.{100 + i}</TableCell>
                          <TableCell>
                            {i % 3 === 0 ? "Chrome / Windows" : i % 2 === 0 ? "Safari / iOS" : "Firefox / MacOS"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={i % 5 === 0 ? "destructive" : "default"}>
                              {i % 5 === 0 ? "Thất bại" : "Thành công"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="payment-history" className="py-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Lịch sử nạp tiền</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Số tiền</TableHead>
                        <TableHead>Phương thức</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>{new Date(2023, 5 - i, 15 - i * 3).toLocaleDateString("vi-VN")}</TableCell>
                          <TableCell>{((i + 1) * 100000).toLocaleString()}đ</TableCell>
                          <TableCell>{i % 3 === 0 ? "Ngân hàng" : i % 2 === 0 ? "Ví điện tử" : "Admin nạp"}</TableCell>
                          <TableCell>
                            <Badge variant={i % 4 === 0 ? "destructive" : i % 3 === 0 ? "secondary" : "default"}>
                              {i % 4 === 0 ? "Thất bại" : i % 3 === 0 ? "Đang xử lý" : "Thành công"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/admin/payments/add-credit?customer=${selectedCustomer.id}`}>Nạp tiền</Link>
                </Button>
                <Button variant="outline">Chỉnh sửa</Button>
              </div>
              <Button onClick={() => { setShowCustomerDetails(false); setHistoryService(null); }}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reset Password Dialog */}
      {selectedCustomer && (
        <Dialog open={showResetPassword} onOpenChange={setShowResetPassword}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
              <DialogDescription>
                Đổi mật khẩu cho tài khoản {selectedCustomer.name} ({selectedCustomer.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  Mật khẩu mới
                </label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">
                  Xác nhận mật khẩu mới
                </label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="send-email" className="rounded border-gray-300" />
                <label htmlFor="send-email" className="text-sm">
                  Gửi email thông báo cho khách hàng
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowResetPassword(false)}>
                Hủy
              </Button>
              <Button onClick={() => setShowResetPassword(false)}>Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
