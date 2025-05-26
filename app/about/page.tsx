import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  const services = [
    {
      title: 'Đăng bài viết tự động',
      description: 'Dịch vụ đăng bài viết một cách tự động, giúp bạn tiết kiệm thời gian và công sức.'
    },
    {
      title: 'Chatbot tự động',
      description: 'Chatbot thông minh, sẵn sàng tương tác và hỗ trợ khách hàng của bạn 24/7.'
    },
    {
      title: 'Gửi tin nhắn tự động',
      description: 'Hệ thống gửi tin nhắn tự động đến khách hàng, đối tác một cách nhanh chóng và hiệu quả.'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Về Chúng Tôi</h1>
      <p className="text-lg text-gray-700 mb-12 text-center">
        Chúng tôi là công ty chuyên cung cấp các giải pháp tự động hóa hàng đầu. 
        Đội ngũ của chúng tôi đầy nhiệt huyết và giàu kinh nghiệm, cam kết mang lại kết quả chất lượng cao nhất cho khách hàng.
      </p>

      <h2 className="text-3xl font-semibold text-center mb-8">Dịch Vụ Của Chúng Tôi</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AboutPage; 