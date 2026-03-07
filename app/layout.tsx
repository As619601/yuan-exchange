import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Sans } from "next/font/google";
import "./globals.css";


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
  return (
    /* 🚩 จุดที่ 1: ใส่ font-variable ไว้ที่ html */
    <html lang="th" className={`${notoThai.variable} ${notoSans.variable}`}>
      {/* 🚩 จุดที่ 2: ใน body ต้องระบุให้ Tailwind ใช้ Font Variable ที่เราตั้งไว้ 
          โดยการใส่ className="font-[family-name:var(--font-noto-thai)]" 
          หรือถ้าใน globals.css ปังตั้ง font-family ไว้แล้ว ก็ต้องเช็คชื่อให้ตรงกันน่อ
      */}
      <body className="font-[family-name:var(--font-noto-thai)] antialiased text-[#31537c] bg-[#f0f7ff] min-h-screen relative overflow-x-hidden">
        
        {/* ลายตารางกราฟพรีเมียม */}
        <div 
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1e3a8a 0.5px, transparent 0.5px), linear-gradient(to right, #1e3a8a 0.5px, transparent 0.5px), linear-gradient(to bottom, #1e3a8a 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px, 40px 40px, 40px 40px',
          }}
        />

        {/* 📄 Layer 2: Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}