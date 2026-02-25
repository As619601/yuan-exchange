import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import AboutSection from '@/app/components/AboutSection';
import Problems from '@/app/components/Problems';
import Services from '@/app/components/Services';
import WhyUs from '@/app/components/WhyUs';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900 font-sans">
      {/* 1. ส่วนแถบเมนูนำทาง  */}
      <Navbar />

      {/* 2. ส่วนหัวเว็บ พร้อมเครื่องคิดเลขคำนวณเรทเงิน [cite: 14, 34] */}
      <Hero />


      {/* 3. ส่วนเช็คลิสต์ปัญหาของลูกค้า เพื่อดึงดูดความสนใจ  */}
      <Problems />

      {/* 4. รายละเอียดบริการทั้ง 4 ด้าน  */}
      <Services />

      {/* about section */}
      <AboutSection />

      {/* 5. ส่วนสร้างความเชื่อมั่นและจุดเด่นของร้าน  */}
      <WhyUs />

      {/* 6. ส่วนท้ายเว็บและข้อมูลติดต่อ  */}
      <Footer />

      {/* ปุ่ม LINE ลอย (Floating Button) [cite: 95] */}
      <a 
        href="https://line.me/R/ti/p/@yuanexchange" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#00B900] to-[#009800] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-bounce"
      >
        <i className="fab fa-line text-4xl"></i>
      </a>
    </main>
  );
}