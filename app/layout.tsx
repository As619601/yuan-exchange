import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const notoThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YuanExchange | บริการโอนเงินหยวนและธุรกรรมจีนครบวงจร",
  description: "เรทดีที่สุด ปลอดภัย มั่นใจทุกยอดโอน พร้อมบริการเติมเงิน Alipay, WeChat Pay และโอนเข้าธนาคารจีน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🚩 แก้ไข ID ตรงนี้ให้เป็นตัวล่าสุดน่อ
  const PIXEL_ID = "1220673412943328";

  return (
    <html lang="th" className={`${notoThai.variable} ${notoSans.variable}`}>
      <head>
        {/* 🚩 Meta Pixel Code (หลัก) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-[family-name:var(--font-noto-thai)] antialiased text-[#31537c] bg-[#f0f7ff] min-h-screen relative overflow-x-hidden">
        
        {/* 🚩 Noscript สำหรับเก็บตก (ใส่ต้น body ตามสูตร) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt="fb-pixel"
          />
        </noscript>

        {/* ลายตารางกราฟพรีเมียม */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1e3a8a 0.5px, transparent 0.5px), linear-gradient(to right, #1e3a8a 0.5px, transparent 0.5px), linear-gradient(to bottom, #1e3a8a 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          }}
        />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}