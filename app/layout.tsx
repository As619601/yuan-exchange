import { Kanit } from "next/font/google"; // Next.js จะโหลด Font ให้เองอัตโนมัติ
import "./globals.css";

const kanit = Kanit({ 
  subsets: ["thai", "latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit", // สร้างเป็น Variable ไว้ใช้ใน Tailwind
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        {/* ✅ เพิ่ม Link นี้เข้าไปเพื่อให้เรียกใช้ class="fas fa-..." ได้เหมือนเดิมค่ะ */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className="...">
        {children}
      </body>
    </html>
  );
}