'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ===== CONSTANTS =====
const WA_NUMBER = '6281239669880';
const WA_MESSAGE = 'Halo%20Bali%20Menari%20Academy%2C%20saya%20tertarik%20dengan%20kelas%20tari%20Anda.%20Boleh%20saya%20tahu%20lebih%20lanjut%3F';
const WHG_URL = 'https://warmaheritagegroup.com';
const WHG_BMA_URL = 'https://warmaheritagegroup.com/companies/bali-menari-academy';

// ===== PHOTO DATA (from WHG database) =====
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

// ===== PROGRAMS DATA =====
const PROGRAMS = [
  {
    num: '01',
    titleId: 'Move & Dance',
    subtitleId: 'Early Childhood Dance Class',
    titleEn: 'Move & Dance',
    subtitleEn: 'Early Childhood Dance Class',
    descId: 'Kelas untuk anak usia PAUD hingga TK yang mengenalkan gerakan dasar menari melalui permainan, musik, dan aktivitas menyenangkan untuk mengembangkan koordinasi tubuh dan motorik.',
    descEn: 'Designed for preschool and kindergarten children, introducing basic dance movements through games, music, and enjoyable activities to develop coordination and confidence.',
    ageId: 'PAUD – TK',
    ageEn: 'Preschool – Kindergarten',
    emoji: '🌟',
  },
  {
    num: '02',
    titleId: 'Modern Dance Class',
    subtitleId: '',
    titleEn: 'Modern Dance Class',
    subtitleEn: '',
    descId: 'Kelas untuk anak usia SD yang mempelajari teknik dasar modern dance (hip-hop, K-pop) untuk mengembangkan koordinasi, musikalitas, kreativitas, dan kepercayaan diri melalui gerakan.',
    descEn: 'Designed for elementary school children, introducing foundational modern dance techniques to develop coordination, musicality, creativity, and confidence through movement.',
    ageId: 'SD (7–12 tahun)',
    ageEn: 'Elementary (Age 7–12)',
    emoji: '💃',
  },
  {
    num: '03',
    titleId: 'K-Pop Dance Class',
    subtitleId: '',
    titleEn: 'K-Pop Dance Class',
    subtitleEn: '',
    descId: 'Kelas untuk anak usia SMP hingga SMA yang ingin mendalami K-pop dance, koreografi, ketepatan gerakan, ekspresi, dan kekompakan tim.',
    descEn: 'Designed for junior and senior high school students to explore K-pop dance, choreography, movement precision, stage expression, and group synchronization.',
    ageId: 'SMP – SMA (13–18 tahun)',
    ageEn: 'Junior–Senior High (Age 13–18)',
    emoji: '🎤',
  },
  {
    num: '04',
    titleId: 'Kelas Tari Tradisional Bali',
    subtitleId: '',
    titleEn: 'Balinese Traditional Dance Class',
    subtitleEn: '',
    descId: 'Kelas untuk anak usia SD yang ingin mengenal dan mempelajari teknik dasar, sikap tubuh, ekspresi, serta gerakan seni tari tradisional Bali.',
    descEn: 'Designed for elementary school children interested in learning fundamental techniques, posture, expression, and movements of traditional Balinese dance.',
    ageId: 'SD (7–12 tahun)',
    ageEn: 'Elementary (Age 7–12)',
    emoji: '🪷',
  },
  {
    num: '05',
    titleId: 'Kelas Menari dengan Hati',
    subtitleId: 'Inclusive Class',
    titleEn: 'Dancing with Heart',
    subtitleEn: 'Inclusive Class',
    descId: 'Kelas tari Bali inklusif yang dirancang khusus untuk anak dengan hambatan pendengaran dalam lingkungan yang suportif dan memperhatikan kebutuhan komunikasi anak.',
    descEn: 'An inclusive Balinese dance class specially designed for children who are deaf or hard of hearing in a supportive, accommodating, and inclusive environment.',
    ageId: 'SD (anak dengan hambatan pendengaran)',
    ageEn: 'Elementary (Children with hearing impairment)',
    emoji: '💛',
  },
];

// ===== HIGHLIGHTS DATA =====
const HIGHLIGHTS = [
  {
    num: '01',
    titleId: 'Joyful Learning',
    titleEn: 'Joyful Learning',
    descId: 'Kami menghadirkan proses belajar menari yang menyenangkan, interaktif, dan sesuai dengan tahap perkembangan anak, sehingga mereka dapat belajar sambil bermain dan bereksplorasi.',
    descEn: 'We make learning to dance fun, interactive, and appropriate for each child\'s developmental stage, allowing them to learn, play, and explore through movement.',
  },
  {
    num: '02',
    titleId: 'Fokus Kelas Kecil',
    titleEn: 'Small Class Focus',
    descId: 'Dengan maksimal 15 anak per kelas, pengajar dapat memberikan perhatian yang lebih personal dan mendukung perkembangan setiap anak sesuai dengan kemampuan serta kebutuhannya.',
    descEn: 'With a maximum of 15 students per class, our instructors can provide more personalized attention and support each child\'s progress according to their individual abilities and needs.',
  },
  {
    num: '03',
    titleId: 'Pengajar Ramah Anak',
    titleEn: 'Child-Friendly Instructors',
    descId: 'Pengajar kami menciptakan lingkungan belajar yang ramah, suportif, dan bebas dari rasa takut untuk mencoba, sehingga anak merasa aman untuk belajar dan berkembang.',
    descEn: 'Our instructors create a welcoming, supportive, and encouraging environment where children feel safe to try new things, make mistakes, and grow with confidence.',
  },
];

// ===== NAV LINKS =====
const NAV_LINKS = [
  { id: 'about', labelId: 'Tentang Kami', labelEn: 'About' },
  { id: 'highlights', labelId: 'Keunggulan', labelEn: 'Why Us' },
  { id: 'programs', labelId: 'Program Kelas', labelEn: 'Classes' },
  { id: 'gallery', labelId: 'Galeri', labelEn: 'Gallery' },
  { id: 'contact', labelId: 'Kontak', labelEn: 'Contact' },
];

// ===== SCROLL REVEAL HOOK =====
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ===== MAIN PAGE COMPONENT =====
export default function HomePage() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<typeof GALLERY_PHOTOS[0] | null>(null);
  const [galleryPage, setGalleryPage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const isId = lang === 'id';
  const GALLERY_PER_PAGE = 6;
  const totalGalleryPages = Math.ceil(GALLERY_PHOTOS.length / GALLERY_PER_PAGE);
  const currentPhotos = GALLERY_PHOTOS.slice(
    galleryPage * GALLERY_PER_PAGE,
    (galleryPage + 1) * GALLERY_PER_PAGE
  );

  useScrollReveal();

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  // Load lang from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bma_lang') as 'id' | 'en' | null;
    if (saved === 'id' || saved === 'en') setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === 'id' ? 'en' : 'id';
    setLang(next);
    localStorage.setItem('bma_lang', next);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 h-[72px] flex items-center justify-between gap-8">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 relative flex-shrink-0">
              <Image src="/images/logo.png" alt="Bali Menari Academy" fill sizes="36px" className="object-contain" />
            </div>
            <span className="font-serif text-[17px] text-gray-900 hidden sm:block leading-tight">
              Bali Menari Academy
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer font-sans font-medium"
              >
                {isId ? link.labelId : link.labelEn}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 border border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors cursor-pointer"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            {/* WA CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-5 py-2 bg-gray-900 text-white text-xs tracking-widest uppercase hover:bg-gray-700 transition-colors"
            >
              {isId ? 'Daftar Kelas' : 'Enroll Now'}
            </a>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-gray-900 transition-all ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <span className={`block w-5 h-px bg-gray-900 transition-all ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-3 text-sm text-gray-700 hover:text-gray-900 border-b border-gray-100 last:border-0 font-sans cursor-pointer"
                >
                  {isId ? link.labelId : link.labelEn}
                </button>
              ))}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-5 py-3 bg-gray-900 text-white text-xs tracking-widest uppercase text-center"
              >
                {isId ? 'Daftar Kelas' : 'Enroll Now'}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="w-full min-h-screen flex flex-col justify-center bg-[#FAFAFA] pt-28 pb-20 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Eyebrow */}
              <div className="reveal flex items-center gap-4">
                <p className="text-xs tracking-[0.25em] text-gray-400 uppercase font-sans">
                  {isId ? 'Bagian dari' : 'Part of'}
                </p>
                <a
                  href={WHG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] text-gray-500 hover:text-gray-900 transition-colors font-sans uppercase"
                >
                  Warma Heritage Group
                </a>
              </div>

              <h1 className="reveal reveal-delay-1 font-serif font-normal text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] text-gray-900">
                {isId ? (
                  <>Growing<br /><span className="text-gray-400">Confidence</span><br />Through Movement.</>
                ) : (
                  <>Growing<br /><span className="text-gray-400">Confidence</span><br />Through Movement.</>
                )}
              </h1>

              <p className="reveal reveal-delay-2 text-lg sm:text-xl text-gray-500 leading-[1.7] max-w-[540px] font-sans">
                {isId
                  ? 'Tempat les tari anak dengan pilihan kelas tari tradisional Bali dan modern dance, dalam lingkungan belajar yang menyenangkan dan inklusif.'
                  : 'A dance school for children offering traditional Balinese dance and modern dance classes, in a fun, inclusive, and supportive learning environment.'}
              </p>

              <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-start gap-4">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-gray-900 text-white text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors duration-300"
                >
                  {isId ? 'Daftar Kelas Sekarang' : 'Enroll Now'}
                </a>
                <button
                  onClick={() => scrollTo('programs')}
                  className="px-10 py-4 border border-gray-300 text-gray-700 text-sm tracking-widest uppercase hover:border-gray-900 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {isId ? 'Lihat Program' : 'View Programs'}
                </button>
              </div>

              {/* Stats row */}
              <div className="reveal reveal-delay-4 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6">
                {[
                  { num: '5', labelId: 'Program Kelas', labelEn: 'Class Programs' },
                  { num: '≤15', labelId: 'Murid per Kelas', labelEn: 'Students/Class' },
                  { num: 'PAUD–SMA', labelId: 'Rentang Usia', labelEn: 'Age Range' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="font-serif text-2xl text-gray-900">{s.num}</span>
                    <span className="text-xs text-gray-400 font-sans tracking-wide">
                      {isId ? s.labelId : s.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                <Image
                  src="/images/gallery/frame-58.webp"
                  alt="Bali Menari Academy students"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <Image
                    src="/images/gallery/frame-79.webp"
                    alt="Bali Menari Academy dance pose"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <Image
                    src="/images/gallery/frame-78.webp"
                    alt="Bali Menari Academy studio"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="w-full bg-white py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-20 gap-y-14 items-start">
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
              <Image
                src="/images/gallery/frame-80.webp"
                alt="Bali Menari Academy dancer"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-1 hidden lg:flex">
              <span className="font-serif text-3xl text-gray-900">🩰</span>
              <span className="text-xs tracking-[0.15em] text-gray-500 uppercase font-sans text-center px-2">
                {isId ? 'Tari Bali & Modern' : 'Balinese & Modern'}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="reveal flex items-center gap-5 text-xs tracking-[0.2em] text-gray-500 uppercase font-sans">
              <span>{isId ? 'Tentang Kami' : 'About Us'}</span>
              <span className="h-px w-16 bg-gray-300" aria-hidden="true" />
            </p>
            <h2 className="reveal reveal-delay-1 mt-7 text-4xl lg:text-[44px] font-serif font-normal tracking-tight leading-[1.1] text-gray-900">
              Bali Menari Academy
            </h2>
            <p className="reveal reveal-delay-2 mt-7 max-w-[600px] text-xl sm:text-[22px] leading-[1.55] text-gray-900 font-sans">
              {isId
                ? 'Bali Menari Academy adalah tempat les tari untuk anak usia PAUD hingga SMA yang menghadirkan pilihan kelas tari tradisional Bali dan modern dance.'
                : 'Bali Menari Academy is a dance school for children from preschool through senior high school, offering traditional Balinese dance and modern dance classes.'}
            </p>
            <p className="reveal reveal-delay-2 mt-6 max-w-[600px] text-base leading-[1.85] text-gray-600 font-sans">
              {isId
                ? 'Melalui pendekatan joyful learning, pengajar yang ramah anak, serta kelas berkapasitas maksimal 15 peserta, kami membantu anak merasa nyaman untuk mencoba, berekspresi, dan menikmati setiap proses belajar menari.'
                : 'Through our joyful learning approach, child-friendly instructors, and small classes of up to 15 students, we help children feel comfortable exploring movement, expressing themselves, and enjoying every step of their dance journey.'}
            </p>
            <p className="reveal reveal-delay-3 mt-5 max-w-[600px] text-base leading-[1.85] text-gray-600 font-sans">
              {isId
                ? 'Bagi kami, menari bukan hanya tentang menguasai gerakan, tetapi juga tentang membangun rasa percaya diri, keberanian tampil, kemampuan bersosialisasi, dan kebebasan mengekspresikan diri. Dengan tim yang multikultural dan lingkungan yang terbuka bagi anak dari berbagai latar belakang, kami percaya bahwa setiap anak memiliki potensi untuk berkembang melalui gerakan.'
                : 'For us, dance is about more than mastering movements. It is also a way to build confidence, develop stage presence, encourage self-expression, and strengthen social skills. With a multicultural team and an inclusive environment that welcomes children from all backgrounds, we believe every child has the potential to grow through movement.'}
            </p>
            <div className="reveal reveal-delay-4 mt-12 max-w-[600px] border-t border-gray-200 pt-5 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.2em] text-gray-500 uppercase font-sans">{isId ? 'Bagian dari' : 'Part of'}</span>
              <a
                href={WHG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] text-gray-900 hover:text-gray-600 transition-colors font-sans"
              >
                Warma Heritage Group
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS SECTION ===== */}
      <section id="highlights" className="w-full bg-[#FAFAFA] py-24 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 reveal">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3 font-sans">
              {isId ? 'Keunggulan Kami' : 'Why Choose Us'}
            </p>
            <h2 className="text-3xl font-serif font-normal text-gray-900">
              {isId ? 'Mengapa Memilih Kami' : 'Our Key Strengths'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col gap-4 p-8 bg-white border border-gray-100`}>
                <span className="text-2xl font-serif text-gray-900">{h.num}</span>
                <h3 className="text-lg font-sans font-semibold text-gray-900">
                  {isId ? h.titleId : h.titleEn}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-sans">
                  {isId ? h.descId : h.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS SECTION ===== */}
      <section id="programs" className="w-full bg-white py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 reveal">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3 font-sans">
              {isId ? 'Program Kelas' : 'Class Programs'}
            </p>
            <h2 className="text-3xl font-serif font-normal text-gray-900">
              {isId ? 'Kelas dan Program Kami' : 'Our Classes & Programs'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROGRAMS.map((p, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} flex gap-6 items-start p-8 bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors`}
              >
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="text-xs text-gray-400 tracking-widest font-sans">{p.num}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-base font-sans font-bold text-gray-900">
                      {isId ? p.titleId : p.titleEn}
                    </h3>
                    {(isId ? p.subtitleId : p.subtitleEn) && (
                      <p className="text-xs text-gray-400 font-sans mt-0.5">
                        {isId ? p.subtitleId : p.subtitleEn}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    {isId ? p.descId : p.descEn}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs tracking-[0.12em] text-gray-400 uppercase font-sans">{isId ? 'Usia' : 'Age'}</span>
                    <span className="text-xs font-medium text-gray-600 font-sans">
                      {isId ? p.ageId : p.ageEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 flex justify-center">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-gray-900 text-white text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors duration-300"
            >
              {isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}
            </a>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section id="gallery" className="w-full bg-[#FAFAFA] py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Section header */}
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7 reveal">
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-3 font-sans">
                {isId ? 'Galeri' : 'Gallery'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900">
                {isId ? 'Dokumentasi Kelas' : 'Class Documentation'}
              </h2>
            </div>
            <div className="lg:col-span-5 reveal reveal-delay-1">
              <p className="text-sm text-gray-500 leading-relaxed font-sans max-w-sm">
                {isId
                  ? 'Momen-momen kegiatan belajar mengajar, latihan, dan penampilan para siswa Bali Menari Academy.'
                  : 'Moments of learning activities, practice sessions, and performances by Bali Menari Academy students.'}
              </p>
            </div>
          </div>

          {/* Grid 3x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setLightbox(photo)}
                className={`reveal reveal-delay-${Math.min(idx + 1, 4)} group cursor-pointer aspect-square bg-gray-200 relative overflow-hidden`}
              >
                <Image
                  src={photo.src}
                  alt={isId ? photo.titleId : photo.titleEn}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-medium text-white font-sans tracking-wide line-clamp-2">
                    {isId ? photo.titleId : photo.titleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="reveal mt-12 flex items-center gap-6">
            <span className="text-xs tracking-[0.2em] uppercase text-gray-400 font-sans whitespace-nowrap">
              {String(GALLERY_PHOTOS.length).padStart(2, '0')} {isId ? 'Foto' : 'Photos'}
            </span>
            <span className="flex-1 h-px bg-gray-200 relative overflow-hidden">
              <span
                className="absolute left-0 top-0 h-px bg-gray-900 transition-all duration-300"
                style={{ width: `${((galleryPage + 1) / totalGalleryPages) * 100}%` }}
              />
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGalleryPage((p) => Math.max(0, p - 1))}
                disabled={galleryPage === 0}
                aria-label={isId ? 'Sebelumnya' : 'Previous'}
                className="w-12 h-12 rounded-full border border-gray-300 text-gray-900 text-lg flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setGalleryPage((p) => Math.min(totalGalleryPages - 1, p + 1))}
                disabled={galleryPage >= totalGalleryPages - 1}
                aria-label={isId ? 'Berikutnya' : 'Next'}
                className="w-12 h-12 rounded-full border border-gray-300 text-gray-900 text-lg flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / CTA SECTION ===== */}
      <section id="contact" className="w-full bg-gray-900 py-24 sm:py-32 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <div className="lg:col-span-6">
              <p className="reveal text-xs tracking-[0.2em] text-gray-400 uppercase font-sans mb-6">
                {isId ? 'Hubungi Kami' : 'Contact Us'}
              </p>
              <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl font-serif font-normal text-white leading-[1.15]">
                {isId ? 'Tertarik Mendaftarkan Anak?' : 'Interested in Enrolling?'}
              </h2>
              <p className="reveal reveal-delay-2 mt-6 text-base text-gray-400 leading-relaxed font-sans max-w-md">
                {isId
                  ? 'Hubungi kami melalui WhatsApp untuk informasi kelas, jadwal, biaya, dan pendaftaran. Kami siap menjawab pertanyaan Anda.'
                  : 'Contact us via WhatsApp for class information, schedule, fees, and registration. We\'re ready to answer your questions.'}
              </p>

              <div className="reveal reveal-delay-3 mt-10 flex flex-col gap-4">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit flex items-center gap-3 px-8 py-4 bg-white text-gray-900 text-sm tracking-widest uppercase hover:bg-gray-100 transition-colors font-sans font-medium"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {isId ? 'Chat WhatsApp' : 'Chat on WhatsApp'}
                </a>
              </div>
            </div>

            {/* Right — info cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: '📍',
                  labelId: 'Alamat',
                  labelEn: 'Address',
                  valueId: 'Jalan Sekar Tunjung XV No. 1A, Denpasar, Bali 80237',
                  valueEn: 'Jalan Sekar Tunjung XV No. 1A, Denpasar, Bali 80237',
                },
                {
                  icon: '📞',
                  labelId: 'WhatsApp',
                  labelEn: 'WhatsApp',
                  valueId: '+62 812-3966-9880',
                  valueEn: '+62 812-3966-9880',
                },
                {
                  icon: '🏫',
                  labelId: 'Holding',
                  labelEn: 'Parent Company',
                  valueId: 'Warma Heritage Group',
                  valueEn: 'Warma Heritage Group',
                  href: WHG_URL,
                },
                {
                  icon: '🌐',
                  labelId: 'Profil Lengkap',
                  labelEn: 'Full Profile',
                  valueId: 'warmaheritagegroup.com',
                  valueEn: 'warmaheritagegroup.com',
                  href: WHG_BMA_URL,
                },
              ].map((item, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} p-6 border border-gray-700 flex flex-col gap-3`}>
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-xs tracking-[0.15em] text-gray-500 uppercase font-sans">
                    {isId ? item.labelId : item.labelEn}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-gray-300 transition-colors font-sans"
                    >
                      {isId ? item.valueId : item.valueEn}
                    </a>
                  ) : (
                    <p className="text-sm text-white font-sans">
                      {isId ? item.valueId : item.valueEn}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="w-full bg-[#0A0A0A] py-10 px-6 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 relative flex-shrink-0">
              <Image src="/images/logo.png" alt="BMA" fill sizes="28px" className="object-contain" />
            </div>
            <p className="text-xs text-gray-600 font-sans">
              Bali Menari Academy © {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={WHG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors font-sans tracking-wide"
            >
              Warma Heritage Group
            </a>
            <span className="text-gray-700 text-xs">·</span>
            <a
              href={WHG_BMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors font-sans tracking-wide"
            >
              {isId ? 'Profil Lengkap' : 'Full Profile'}
            </a>
          </div>
        </div>
      </footer>

      {/* ===== BACK TO TOP ===== */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg cursor-pointer"
        aria-label={isId ? 'Kembali ke atas' : 'Back to top'}
      >
        ↑
      </button>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative max-w-[90vw] max-h-[78vh] flex items-center justify-center">
              <img
                src={lightbox.src}
                alt={isId ? lightbox.titleId : lightbox.titleEn}
                className="max-w-full max-h-[76vh] object-contain shadow-2xl"
              />
            </div>
            <div className="mt-5 text-center text-white px-4 max-w-2xl">
              <p className="font-sans text-sm text-gray-300 leading-relaxed">
                {isId ? lightbox.titleId : lightbox.titleEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
