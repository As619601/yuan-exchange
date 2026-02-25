export default function Services() {
  const services = [
    {
      title: 'โอนเงินไปจีน',
      desc: 'บริการโอนเงินสกุลหยวนผ่านบัญชีธนาคารจีนที่ปลอดภัย สะอาด ให้บริการมานานกว่า 10 ปี โอนไว ถึงคู่ค้าแน่นอน',
      icon: 'fas fa-money-bill-wave',
      color: 'from-blue-500 to-brand-blue',
      shadow: 'shadow-blue-500/30'
    },
    {
      title: 'ฝากจ่ายค่าสินค้า',
      desc: 'กดสั่งสินค้าบน Taobao, 1688 หรือ Tmall เองได้เลย แล้วส่งบิลมาให้เราจัดการกดชำระเงินให้ สะดวก รวดเร็ว',
      icon: 'fas fa-laptop-code',
      color: 'from-yellow-400 to-orange-500',
      shadow: 'shadow-orange-400/30'
    },
    {
      title: 'ฝากสั่งซื้อสินค้า',
      desc: 'เราช่วยสั่งซื้อและประสานงานพูดคุยกับร้านค้าจีนแทนคุณ ช่วยประหยัดเวลา ให้คุณโฟกัสกับการขายได้เต็มที่',
      icon: 'fas fa-shopping-bag',
      color: 'from-orange-400 to-red-500',
      shadow: 'shadow-red-400/30'
    },
    {
      title: 'เติม Alipay & WeChat',
      desc: 'ต้องการเงินหยวนในบัญชี Alipay หรือ WeChat Pay เพื่อนำไปใช้จ่าย? เรามีบริการเติมเงินให้ตามยอดที่คุณต้องการ',
      icon: 'fab fa-alipay',
      color: 'from-sky-400 to-blue-500',
      shadow: 'shadow-sky-400/30'
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-blue mb-6">บริการธุรกรรมเงินสกุลหยวนครบวงจร</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">อำนวยความสะดวกให้ผู้ประกอบการไทย ดำเนินธุรกิจกับจีนได้อย่างราบรื่น ไร้พรมแดน</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(30,58,138,0.1)] transition-all duration-300 group border border-gray-100">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg ${s.shadow} group-hover:scale-110 transition-transform`}>
                <i className={s.icon}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{s.title}</h3>
              <p className="text-gray-500 text-base leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}