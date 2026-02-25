export default function Features() {
  const items = [
    { title: 'เรทดีที่สุด', desc: 'อัปเดตเรทเงินหยวนแบบ Real-time ให้คุณได้ราคาที่คุ้มค่าที่สุด', icon: '💰' },
    { title: 'ปลอดภัย 100%', desc: 'ประสบการณ์กว่า 10 ปี บัญชีจีนปลอดภัย ไม่เสี่ยงโดนระงับ', icon: '🛡️' },
    { title: 'แจ้งยอดไว', desc: 'ทำรายการเสร็จสิ้นภายใน 15-30 นาที พร้อมหลักฐานการโอน', icon: '⚡' },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}