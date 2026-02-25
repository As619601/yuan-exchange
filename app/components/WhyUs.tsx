export default function WhyUs() {
  const reasons = [
    {
      title: "บัญชีสะอาด ปลอดภัย 100%",
      desc: "เราคัดกรองแหล่งเงินอย่างเข้มงวด ทำงานบนระบบดิจิทัลที่ตรวจสอบได้ หมดกังวลเรื่องบัญชีโดนอายัด",
      icon: "fas fa-shield-check",
      color: "from-green-400 to-green-600"
    },
    {
      title: "รวดเร็ว ทันใจ",
      desc: "ทำรายการรวดเร็ว ยอดเงินเข้าถึงมือคู่ค้าที่จีนตรงเวลา ไม่ทำให้ธุรกิจของคุณสะดุด",
      icon: "fas fa-bolt",
      color: "from-blue-400 to-brand-blue"
    },
    {
      title: "เรทดี โปร่งใส ไม่มีซ่อนเร้น",
      desc: "อัปเดตเรทเงินตามสภาวะตลาดจริง ให้คุณได้ต้นทุนที่ดีที่สุด พร้อมคำนวณยอดชัดเจนก่อนโอนจริง",
      icon: "fas fa-search-dollar",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight">
              ทำไมผู้ประกอบการไทย<br/>ถึงวางใจ <span className="text-brand-blue">YUAN EXCHANGE? </span>
            </h2>
            <div className="space-y-8">
              {reasons.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <i className={`${item.icon} text-xl`}></i>
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-gray-500 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ส่วนรูปภาพประกอบ (พันธมิตรที่ไว้ใจได้) [cite: 84, 87] */}
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-slate-50 rounded-3xl border border-white shadow-2xl flex items-center justify-center relative overflow-hidden">
               <div className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white z-10">
                  <div className="w-20 h-20 mx-auto bg-brand-blue rounded-full flex items-center justify-center mb-5 shadow-lg">
                    <i className="fas fa-handshake text-4xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">พันธมิตรที่ไว้ใจได้</h3>
                  <p className="text-gray-500">ดูแลทุกธุรกรรมการเงินระหว่าง ไทย-จีน</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}