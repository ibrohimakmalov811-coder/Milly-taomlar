import 'aos/dist/aos.css'; // AOS stillari
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      data-aos="fade-up"
      className="bg-stone-900 text-stone-300 mt-10 py-8 border-t-2 border-amber-600 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center md:text-left">

        {/* Logo va shior */}
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href={"/"} className="inline-block transition-transform duration-300 hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-20 sm:w-24 md:w-[100px] h-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold text-amber-500 font-serif tracking-wide">
              Milly Taomlar
            </h3>
            <p className="text-xs text-stone-400">Milliy taomlar va samimiy mehmondo'stlik</p>
          </div>
        </div>

        {/* Telefon raqam */}
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="flex items-center gap-2 bg-stone-800 px-4 py-2.5 rounded-lg border border-stone-700 hover:border-amber-500/50 transition-all duration-300"
        >
          <span className="text-amber-500 text-base">📞</span>
          <a
            href="tel:+998901234567"
            className="text-sm font-medium hover:text-amber-400 transition-colors duration-300 whitespace-nowrap"
          >
            +998 (90) 123-45-67
          </a>
        </div>

        {/* Mualliflik huquqi */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="text-center md:text-right text-xs text-stone-400 space-y-1"
        >
          <p>© 2026 "Milly Taomlar". Barcha huquqlar himoyalangan.</p>
          <p>
            Loyiha <span className="text-amber-500 font-semibold">2026-yilda</span> siz tomonidan yaratilgan.
          </p>
        </div>

      </div>
    </footer>
  );
}