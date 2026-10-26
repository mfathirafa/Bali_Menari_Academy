'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ===== CONSTANTS =====
const WA_NUMBER = '6281239669880';
const WA_MESSAGE_ID = 'Halo%20Bali%20Menari%20Academy%2C%20saya%20tertarik%20dengan%20kelas%20tari%20Anda.%20Boleh%20saya%20tahu%20lebih%20lanjut%3F';
const WA_MESSAGE_EN = 'Hello%20Bali%20Menari%20Academy%2C%20I%20am%20interested%20in%20your%20dance%20classes.%20Could%20you%20tell%20me%20more%3F';
const WHG_URL = 'https://warmaheritagegroup.com';
const WHG_BMA_URL = 'https://warmaheritagegroup.com/companies/bali-menari-academy';
const COMPANY_EMAIL = 'warmaheritagegroup@gmail.com';
const COMPANY_PHONE = '+62 812-3966-9880';
const COMPANY_ADDRESS = 'Jalan Sekar Tunjung XV No. 1A, Denpasar, Bali 80237';

// ===== PHOTO DATA =====
const GALLERY_PHOTOS = [
  { id: 59, src: '/images/gallery/frame-55.webp', titleId: 'Latihan Dasar Kuda-Kuda & Agem Tari Tradisional Bali', titleEn: "Basic 'Agem' Stance Training for Young Balinese Dancers" },
  { id: 60, src: '/images/gallery/frame-56.webp', titleId: 'Sesi Pengarahan Gerak & Filosofi Tari oleh Instruktur BMA', titleEn: 'Philosophy & Choreography Briefing by BMA Instructor' },
  { id: 61, src: '/images/gallery/frame-57.webp', titleId: 'Bimbingan Personal & Koreksi Postur oleh Pelatih Senior', titleEn: 'Personalized Posture Correction & Coaching by Senior Teacher' },
  { id: 62, src: '/images/gallery/frame-58.webp', titleId: 'Sesi Pemanasan & Kelenturan Ceria Siswa Tari Cilik', titleEn: 'Fun Warm-up & Flexibility Drills for Young Students' },
  { id: 63, src: '/images/gallery/frame-61.webp', titleId: 'Latihan Ritme & Kepekaan Irama Bersama dalam Lingkaran', titleEn: 'Group Rhythm & Coordination Drill in a Circle' },
  { id: 64, src: '/images/gallery/frame-62.webp', titleId: 'Pembentukan Sikap & Ekspresi Siswa Kelas Tari Pemula', titleEn: 'Expression & Poise Practice in Beginner Dance Class' },
  { id: 65, src: '/images/gallery/frame-63.webp', titleId: 'Latihan Koreografi Gerak Tari Kreasi Kontemporer', titleEn: 'Contemporary & Creative Balinese Dance Practice' },
  { id: 66, src: '/images/gallery/frame-64.webp', titleId: 'Latihan Ketangkasan Gerak Langkah Siswa Tari Bali', titleEn: 'Dynamic Footwork & Agility Training for Dance Students' },
  { id: 67, src: '/images/gallery/frame-65.webp', titleId: 'Bimbingan Gerak Tangan & Tatapan Mata Seledet Bali', titleEn: "Mentor Guiding Hand Movements & 'Seledet' Eye Focus" },
  { id: 68, src: '/images/gallery/frame-66.webp', titleId: 'Penampilan Sikap Agem Kanan oleh Siswa Tari Putri', titleEn: "Student Performing Classic 'Agem Kanan' Posture" },
  { id: 69, src: '/images/gallery/frame-68.webp', titleId: 'Keselarasan Gerak & Harmoni Formasi Kelompok Tari', titleEn: 'Group Formation & Synchronization Practice for Dancers' },
  { id: 70, src: '/images/gallery/frame-69.webp', titleId: 'Pelatihan Gerak Lenggok & Aksen Selendang Khas Bali', titleEn: 'Intensive Shawl Movement & Traditional Balinese Dance Accent' },
  { id: 71, src: '/images/gallery/frame-70.webp', titleId: 'Pendampingan Intensif Teknik Tari Bali oleh Instruktur', titleEn: 'Intensive One-on-One Technical Coaching in Balinese Dance' },
  { id: 72, src: '/images/gallery/frame-71.webp', titleId: 'Latihan Tepukan Tangan & Kepekaan Irama Gamelan', titleEn: 'Hand-Clapping & Traditional Musicality Sensitivity Drill' },
  { id: 73, src: '/images/gallery/frame-72.webp', titleId: 'Latihan Gerakan Transisi Langkah & Ayunan Selendang', titleEn: 'Step Transition & Shawl Movement Practice with Coach' },
  { id: 74, src: '/images/gallery/frame-73.webp', titleId: 'Penampilan Solo Tari Kontemporer Penuh Semangat', titleEn: 'Expressive Solo Contemporary Dance Routine' },
  { id: 75, src: '/images/gallery/frame-74.webp', titleId: 'Pendampingan Presisi Penyelarasan Bahu & Rentang Tangan', titleEn: 'Precision Coaching for Shoulder & Arm Alignment' },
  { id: 76, src: '/images/gallery/frame-75.webp', titleId: 'Penguatan Daya Tahan Kuda-Kuda Rendah (Agem Bebekalan)', titleEn: 'Low Stance Endurance & Posture Guidance' },
  { id: 77, src: '/images/gallery/frame-76.webp', titleId: 'Latihan Formasi Langkah Serentak Siswa di Pendopo BMA', titleEn: 'Dynamic Step & Stride Synchronization in Open Hall' },
  { id: 78, src: '/images/gallery/frame-77.webp', titleId: 'Semangat Siswa dalam Pembelajaran Gerak Tari Dinamis', titleEn: 'High Energy of Young Dancers in Modern-Traditional Fusion' },
  { id: 79, src: '/images/gallery/frame-78.webp', titleId: 'Suasana Terbuka Studio Tari Pendopo Bali Menari Academy', titleEn: 'Vibrant Open-Air Studio Atmosphere at Bali Menari Academy' },
  { id: 80, src: '/images/gallery/frame-79.webp', titleId: 'Pose Anggun Siswa Remaja Berkain Tradisional Bali', titleEn: 'Graceful Pose by Junior Dancer in Traditional Balinese Attire' },
  { id: 81, src: '/images/gallery/frame-80.webp', titleId: 'Geladi Resik Formasi Pentas Kolaboratif Siswa BMA', titleEn: 'Combined Stage Choreography Rehearsal for BMA Recital' },
  { id: 82, src: '/images/gallery/frame-83.webp', titleId: 'Gerak Penuh Ekspresi Ceria Siswa Tari Cilik Berbakat', titleEn: 'Expressive and Joyful Performance by Talented Young Dancer' },
];

// ===== HIGHLIGHTS DATA =====
const HIGHLIGHTS = [
  {
    titleId: 'Joyful Learning',
    titleEn: 'Joyful Learning',
    descId: 'Kami menghadirkan proses belajar menari yang menyenangkan, interaktif, dan sesuai dengan tahap perkembangan anak, sehingga mereka dapat belajar sambil bermain dan bereksplorasi.',
    descEn: "We make learning to dance fun, interactive, and appropriate for each child's developmental stage, allowing them to learn, play, and explore through movement.",
  },
  {
    titleId: 'Fokus Kelas Kecil',
    titleEn: 'Small Class Focus',
    descId: 'Dengan maksimal 15 anak per kelas, pengajar dapat memberikan perhatian yang lebih personal dan mendukung perkembangan setiap anak sesuai dengan kemampuan serta kebutuhannya.',
    descEn: "With a maximum of 15 students per class, our instructors can provide more personalized attention and support each child's progress according to their individual abilities and needs.",
  },
  {
    titleId: 'Pengajar Ramah Anak',
    titleEn: 'Child-Friendly Instructors',
    descId: 'Pengajar kami menciptakan lingkungan belajar yang ramah, suportif, dan bebas dari rasa takut untuk mencoba, sehingga anak merasa aman untuk belajar dan berkembang.',
    descEn: 'Our instructors create a welcoming, supportive, and encouraging environment where children feel safe to try new things, make mistakes, and grow with confidence.',
  },
];

// ===== SERVICES DATA =====
const SERVICES = [
  {
    titleId: 'Move & Dance – Early Childhood Dance Class',
    titleEn: 'Move & Dance – Early Childhood Dance Class',
    descId: 'Kelas untuk anak usia PAUD hingga TK yang mengenalkan gerakan dasar menari melalui permainan, musik, dan aktivitas menyenangkan untuk mengembangkan koordinasi tubuh dan motorik.',
    descEn: 'Designed for preschool and kindergarten children, introducing basic dance movements through games, music, and enjoyable activities to develop coordination and confidence.',
  },
  {
    titleId: 'Modern Dance Class',
    titleEn: 'Modern Dance Class',
    descId: 'Kelas untuk anak usia SD yang mempelajari teknik dasar modern dance (hip-hop, K-pop) untuk mengembangkan koordinasi, musikalitas, dan kreativitas melalui gerakan.',
    descEn: 'Designed for elementary school children, introducing foundational modern dance techniques to develop coordination, musicality, creativity, and confidence through movement.',
  },
  {
    titleId: 'K-Pop Dance Class',
    titleEn: 'K-Pop Dance Class',
    descId: 'Kelas untuk anak usia SMP hingga SMA yang ingin mendalami K-pop dance, koreografi, ketepatan gerakan, ekspresi, dan kekompakan tim.',
    descEn: 'Designed for junior and senior high school students to explore K-pop dance, choreography, movement precision, stage expression, and group synchronization.',
  },
  {
    titleId: 'Kelas Tari Tradisional Bali',
    titleEn: 'Balinese Traditional Dance Class',
    descId: 'Kelas untuk anak usia SD yang ingin mengenal dan mempelajari teknik dasar, sikap tubuh, ekspresi, serta gerakan seni tari tradisional Bali.',
    descEn: 'Designed for elementary school children interested in learning fundamental techniques, posture, expression, and movements of traditional Balinese dance.',
  },
  {
    titleId: 'Kelas Menari dengan Hati',
    titleEn: 'Dancing with Heart – Inclusive Class',
    descId: 'Kelas tari Bali inklusif yang dirancang khusus untuk anak dengan hambatan pendengaran dalam lingkungan yang suportif dan memperhatikan kebutuhan komunikasi anak.',
    descEn: 'An inclusive Balinese dance class specially designed for children who are deaf or hard of hearing in a supportive, accommodating, and inclusive environment.',
  },
];

// ===== NAV LINKS =====
const NAV_LINKS = [
  { id: 'about', labelId: 'Tentang Kami', labelEn: 'About' },
  { id: 'highlights', labelId: 'Keunggulan', labelEn: 'Why Us' },
  { id: 'services', labelId: 'Layanan', labelEn: 'Services' },
  { id: 'gallery', labelId: 'Galeri', labelEn: 'Gallery' },
  { id: 'contact', labelId: 'Kontak', labelEn: 'Contact' },
];

// ===== MAIN PAGE =====
export default function HomePage() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<typeof GALLERY_PHOTOS[0] | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const isId = lang === 'id';

  // Load lang from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bma_lang') as 'id' | 'en' | null;
    if (saved === 'id' || saved === 'en') setLang(saved);
  }, []);

  // Navbar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Lightbox escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxPhoto(null); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  const toggleLang = (l: 'id' | 'en') => {
    setLang(l);
    localStorage.setItem('bma_lang', l);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>

      {/* ===== NAVBAR (WHG-style) ===== */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-gray-200/80 shadow-xs'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 h-[80px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="transition-opacity duration-300 hover:opacity-75 cursor-pointer py-2"
            aria-label="Bali Menari Academy - Beranda"
          >
            <Image
              src="/Logo_clear.png"
              alt="Warma Heritage Group"
              width={130}
              height={36}
              className="object-contain"
              priority
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[13px] font-medium text-gray-600 hover:text-gray-950 transition-colors duration-300 tracking-[0.05em] relative group cursor-pointer"
              >
                {isId ? link.labelId : link.labelEn}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gray-900 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Lang toggle pill */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200">
              <button
                onClick={() => toggleLang('id')}
                className={`min-w-[38px] h-8 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  lang === 'id' ? 'bg-gray-950 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Pilih Bahasa Indonesia"
              >
                ID
              </button>
              <button
                onClick={() => toggleLang('en')}
                className={`min-w-[38px] h-8 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  lang === 'en' ? 'bg-gray-950 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Select English language"
              >
                EN
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={isId ? 'Buka menu navigasi' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block w-6 h-[2px] bg-gray-900 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-6 h-[2px] bg-gray-900 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-[2px] bg-gray-900 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[500px] border-t border-gray-200 shadow-xl' : 'max-h-0'
        }`}>
          <div className="bg-white px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-base font-medium text-gray-800 hover:text-black py-3.5 border-b border-gray-100 text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>{isId ? link.labelId : link.labelEn}</span>
                <span className="text-gray-400 text-sm">→</span>
              </button>
            ))}
            <div className="pt-4 mt-2">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${isId ? WA_MESSAGE_ID : WA_MESSAGE_EN}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{isId ? 'Konsultasi WhatsApp' : 'WhatsApp Inquiry'}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== 1. HERO ===== */}
      <section id="hero" className="w-full bg-gray-50 pt-28 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">Performing Arts & Dance School</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Bali Menari Academy
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed">
                {isId
                  ? 'Tempat les tari anak dengan pilihan kelas tari tradisional dan modern dance, yang menumbuhkan kepercayaan diri melalui gerakan.'
                  : 'A dance school for children offering traditional Balinese dance and modern dance classes, growing confidence through movement.'}
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${isId ? WA_MESSAGE_ID : WA_MESSAGE_EN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-8 py-4 bg-gray-900 text-white text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors duration-300"
              >
                {isId ? 'Hubungi Kami' : 'Contact Us'}
              </a>
            </div>
            <div className="w-full aspect-square bg-gray-200 relative overflow-hidden">
              <Image
                src="/images/gallery/frame-58.webp"
                alt="Bali Menari Academy"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. TENTANG PERUSAHAAN ===== */}
      <section id="about" className="w-full bg-white py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-20 gap-y-14 items-start">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-5 text-xs tracking-[0.2em] text-gray-500 uppercase">
              <span>{isId ? 'Tentang Perusahaan' : 'About'}</span>
              <span className="h-px w-16 bg-gray-300" aria-hidden="true" />
            </p>
            <h2 className="mt-7 text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.1] text-gray-900">
              Bali Menari Academy
            </h2>
            <p className="mt-7 max-w-[560px] text-xl sm:text-[22px] leading-[1.55] text-gray-900">
              {isId
                ? 'Bali Menari Academy adalah tempat les tari untuk anak usia PAUD hingga SMA yang menghadirkan kelas tari tradisional Bali dan modern dance dalam lingkungan belajar yang menyenangkan, inklusif, dan mendukung perkembangan anak.'
                : 'Bali Menari Academy is a dance school for children from preschool through senior high school, offering traditional Balinese dance and modern dance classes in a fun, inclusive, and supportive learning environment.'}
            </p>
            <p className="mt-8 max-w-[560px] text-lg leading-[1.85] text-gray-700">
              {isId
                ? 'Melalui pendekatan joyful learning, pengajar yang ramah anak, serta kelas berkapasitas maksimal 15 peserta, kami membantu anak merasa nyaman untuk mencoba, berekspresi, dan menikmati setiap proses belajar menari.'
                : 'Through our joyful learning approach, child-friendly instructors, and small classes of up to 15 students, we help children feel comfortable exploring movement, expressing themselves, and enjoying every step of their dance journey.'}
            </p>
            <p className="mt-5 max-w-[560px] text-lg leading-[1.85] text-gray-700">
              {isId
                ? 'Bagi kami, menari bukan hanya tentang menguasai gerakan, tetapi juga tentang membangun rasa percaya diri, keberanian tampil, kemampuan bersosialisasi, dan kebebasan mengekspresikan diri. Dengan tim yang multikultural dan lingkungan yang terbuka bagi anak dari berbagai latar belakang, Bali Menari Academy percaya bahwa setiap anak memiliki potensi untuk berkembang melalui gerakan.'
                : "For us, dance is about more than mastering movements. It is also a way to build confidence, develop stage presence, encourage self-expression, and strengthen social skills. With a multicultural team and an inclusive environment that welcomes children from all backgrounds, Bali Menari Academy believes every child has the potential to grow through movement."}
            </p>
            <div className="mt-14 max-w-[560px] border-t border-gray-200 pt-5 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.2em] text-gray-500 uppercase">{isId ? 'Bagian dari' : 'Part of'}</span>
              <a
                href={WHG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] text-gray-900 hover:text-gray-600 transition-colors"
              >
                Warma Heritage Group
              </a>
            </div>
          </div>
          <div className="w-full max-w-lg lg:max-w-none lg:col-start-8 lg:col-span-5 lg:pt-16">
            <div className="relative w-full aspect-[4/5] bg-gray-200 overflow-hidden">
              <Image
                src="/images/gallery/frame-80.webp"
                alt="Bali Menari Academy dancer"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. KEUNGGULAN KAMI ===== */}
      <section id="highlights" className="w-full bg-gray-50 py-24 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">
              {isId ? 'Keunggulan Kami' : 'Why Choose Us'}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {isId ? 'Mengapa Memilih Kami' : 'Our Key Strengths'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex flex-col gap-4 p-8 bg-white border border-gray-100">
                <span className="text-2xl font-bold text-gray-900">0{i + 1}</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {isId ? h.titleId : h.titleEn}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {isId ? h.descId : h.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. APA YANG KAMI TAWARKAN ===== */}
      <section id="services" className="w-full bg-white py-24 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3">
              {isId ? 'Layanan Kami' : 'Services'}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {isId ? 'Apa yang Kami Tawarkan' : 'What We Offer'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s, i) => (
              <div key={i} className="flex gap-6 items-start p-8 bg-gray-50">
                <span className="text-xs text-gray-400 tracking-widest mt-1">0{i + 1}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-gray-900">
                    {isId ? s.titleId : s.titleEn}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {isId ? s.descId : s.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. GALERI — Activity Index (WHG-style baru) ===== */}
      <section id="gallery" className="w-full bg-gray-50 py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <p className="flex items-center gap-5 text-xs tracking-[0.2em] text-gray-500 uppercase">
            <span>{isId ? 'Dokumentasi' : 'Documentation'}</span>
            <span className="h-px w-16 bg-gray-300" aria-hidden="true" />
          </p>
          <h2 className="mt-7 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-gray-900">
            {isId ? 'Dokumentasi Kami' : 'Our Documentation'}
          </h2>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-start">
            {/* ── Numbered list (kiri) ── */}
            <ol className="lg:col-span-5 border-t border-gray-200">
              {GALLERY_PHOTOS.map((photo, i) => {
                const title = isId ? photo.titleId : photo.titleEn;
                const active = i === activePhotoIndex;
                return (
                  <li key={photo.id} className="border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => setActivePhotoIndex(i)}
                      aria-current={active}
                      className={`w-full flex items-baseline gap-7 py-5 text-left cursor-pointer transition-colors ${
                        active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="font-mono text-xs tracking-widest shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-base sm:text-lg leading-snug">{title}</span>
                      {active && (
                        <span className="shrink-0 text-gray-900" aria-hidden="true">→</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* ── Featured photo (kanan) ── */}
            <figure className="m-0 lg:col-span-7 lg:pt-1 lg:sticky lg:top-24">
              <button
                type="button"
                onClick={() => setLightboxPhoto(GALLERY_PHOTOS[activePhotoIndex])}
                aria-label={isId ? 'Perbesar foto' : 'View photo'}
                className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-200 cursor-zoom-in focus-visible:outline-gray-900"
              >
                <Image
                  key={GALLERY_PHOTOS[activePhotoIndex].id}
                  src={GALLERY_PHOTOS[activePhotoIndex].src}
                  alt={isId ? GALLERY_PHOTOS[activePhotoIndex].titleId : GALLERY_PHOTOS[activePhotoIndex].titleEn}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </button>
              <figcaption className="mt-4 font-mono text-xs tracking-widest text-gray-500 uppercase">
                {String(activePhotoIndex + 1).padStart(2, '0')} / {String(GALLERY_PHOTOS.length).padStart(2, '0')}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ===== 6. CTA ===== */}
      <section id="contact" className="w-full bg-white py-24 px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {isId ? 'Tertarik Mendaftarkan Anak?' : 'Interested in Enrolling?'}
          </h2>
          <p className="text-base text-gray-500 max-w-md leading-relaxed">
            {isId
              ? 'Hubungi kami langsung melalui WhatsApp untuk informasi lebih lanjut tentang kelas, jadwal, dan biaya.'
              : 'Contact us directly via WhatsApp for more information about classes, schedules, and fees.'}
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${isId ? WA_MESSAGE_ID : WA_MESSAGE_EN}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-gray-900 text-white text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors duration-300"
          >
            {isId ? 'Hubungi via WhatsApp' : 'Contact via WhatsApp'}
          </a>
        </div>
      </section>

      {/* ===== FOOTER (WHG-style) ===== */}
      <footer className="w-full bg-gray-100 py-16 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-gray-300">
            {/* Logo & deskripsi */}
            <div className="flex flex-col gap-4 max-w-xs">
              <img src="/Logo_clear.png" alt="Warma Heritage Group" className="w-32" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {isId
                  ? 'Tempat les tari anak dengan pilihan kelas tari tradisional Bali dan modern dance, dalam lingkungan belajar yang menyenangkan dan inklusif.'
                  : 'A dance school for children offering Balinese traditional dance and modern dance classes in a fun and inclusive environment.'}
              </p>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
                {isId ? 'Navigasi' : 'Navigation'}
              </p>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-gray-600 hover:text-gray-900 text-left transition-colors cursor-pointer"
                >
                  {isId ? link.labelId : link.labelEn}
                </button>
              ))}
            </div>

            {/* Kontak */}
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
                {isId ? 'Kontak' : 'Contact'}
              </p>
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-sm text-gray-600 hover:text-black transition-colors">
                {COMPANY_EMAIL}
              </a>
              <a href="tel:+6281239669880" className="text-sm text-gray-600 hover:text-black transition-colors">
                {COMPANY_PHONE}
              </a>
              <a
                href="https://maps.google.com/?q=Jalan+Sekar+Tunjung+XV+No.+1A,+Denpasar,+Bali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                {COMPANY_ADDRESS}
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${isId ? WA_MESSAGE_ID : WA_MESSAGE_EN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit mt-3 px-5 py-2.5 bg-gray-900 text-white hover:bg-black rounded-xs text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{isId ? 'Hubungi via WhatsApp' : 'Contact via WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Bali Menari Academy. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Denpasar, Bali, Indonesia</span>
              <span>•</span>
              <a
                href={WHG_BMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                Warma Heritage Group
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== LIGHTBOX ===== */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxPhoto(null); }}
            aria-label={isId ? 'Tutup Pratinjau' : 'Close Preview'}
            className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative w-auto max-w-[90vw] max-h-[80vh] flex items-center justify-center">
              <img
                src={lightboxPhoto.src}
                alt={isId ? lightboxPhoto.titleId : lightboxPhoto.titleEn}
                className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="mt-4 text-center text-white px-4">
              <p className="text-sm sm:text-base font-medium">
                {isId ? lightboxPhoto.titleId : lightboxPhoto.titleEn}
              </p>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
