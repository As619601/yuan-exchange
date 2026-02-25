export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="text-2xl font-bold tracking-wider text-white">
            YUAN<span className="text-brand-yellow">EXCHANGE</span>
          </span>
        </div>
        <p className="mb-4 text-base">
          <span className="text-white font-medium">YUAN EXCHANGE</span> บริการโอนเงินหยวน ฝากจ่ายสินค้าบนเว็บไซต์จีน เติมเงิน Alipay 
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 font-light text-sm mb-8">
          <a href="mailto:info@yuanexchangeth.com" className="hover:text-white transition">
            <i className="far fa-envelope mr-2"></i>info@yuanexchangeth.com
          </a>
          <span className="hidden md:block">|</span>
          <a href="tel:0839854714" className="hover:text-white transition">
            <i className="fas fa-phone-alt mr-2"></i>083-985-4714 
          </a>
        </div>
        <p className="opacity-40 font-light text-xs">
          &copy; {currentYear} YUAN EXCHANGE. All Rights Reserved. 
        </p>
      </div>
    </footer>
  );
}