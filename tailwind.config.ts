import type { Config } from "tailwindcss"; // <--- เพิ่มบรรทัดนี้ค่ะปัง

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e3a8a',   // สีน้ำเงินเดิมของปัง
        'brand-yellow': '#fbbf24', // สีเหลืองเดิมของปัง
        'line-green': '#00B900',   // สี LINE
      },
      fontFamily: {
        kanit: ['var(--font-kanit)', 'sans-serif'], // เดี๋ยวเราไปเซต Font ใน Layout กันค่ะ
      },
    },
  },
  plugins: [],
};

export default config;