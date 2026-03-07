import type { Config } from "tailwindcss";

const config: Config = {
  // 🎯 เช็ค Path ให้ดีน่อนะปัง ถ้าไฟล์ของปังไม่ได้อยู่ในโฟลเดอร์ src ให้ลบ src/ ออกน่อ
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // เผื่อปังไม่ได้ใช้โฟลเดอร์ src มากิใส่กันเหนียวไว้ให้น่อ
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#31537c',    // สีน้ำเงินหลักของ YuanExchange
        'brand-light-blue': '#4071b7', // สีฟ้าสว่างที่เราใช้ไล่เฉด
        'brand-yellow': '#fbbf24', 
        'line-green': '#06C755',    // สี LINE มาตรฐานใหม่
      },
      fontFamily: {
        // ✨ เปลี่ยนจาก kanit เป็นการเรียกใช้ตัวแปรจาก layout.tsx น่อ
        // ใส่ var(--font-noto-thai) นำหน้าเพื่อให้มือถือบังคับใช้ฟอนต์นี้ก่อนเสมอ
        sans: ['var(--font-noto-thai)', 'var(--font-noto-sans)', 'sans-serif'],
        thai: ['var(--font-noto-thai)', 'var(--font-noto-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;