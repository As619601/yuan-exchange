export default function Problems() {
  const checkList = [
    "ต้องการโอนเงินหยวนไปจีนให้โรงงานหรือคู่ค้า",
    "ต้องการเติมเงิน Alipay หรือ WeChat เข้าแอปตัวเอง",
    "สั่งของเว็บจีน แต่จ่ายเองไม่ได้ ต้องการคนกดจ่ายให้",
    "มองหาบริการเรทดี โปร่งใส ใช้บัญชีจีนที่สะอาด"
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-brand-blue mb-12">คุณกำลังต้องการสิ่งเหล่านี้อยู่หรือไม่? </h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {checkList.map((text, i) => (
            <div key={i} className="bg-blue-50/50 p-6 rounded-2xl flex items-start border border-blue-100 hover:shadow-md transition">
              <i className="fas fa-check-circle text-line-green text-xl mt-1 mr-4"></i>
              <p className="text-gray-700 font-medium">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 inline-block bg-red-50 px-8 py-4 rounded-full border border-red-100 animate-bounce">
          <p className="text-xl font-bold text-red-600">ถ้าคำตอบคือ ใช่ เราคือตัวช่วยที่ดีที่สุด! </p>
        </div>
      </div>
    </section>
  );
}