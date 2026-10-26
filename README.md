# Bali Menari Academy — Official Website

> Subdomain resmi: **balimenari.warmaheritagegroup.com**  
> Bagian dari ekosistem digital [Warma Heritage Group](https://warmaheritagegroup.com)

## Tentang Proyek

Website satu halaman (*single-page*) untuk **Bali Menari Academy**, sanggar dan akademi tari anak di Bali yang menawarkan kelas tari tradisional Bali, modern dance, K-pop dance, hingga kelas inklusif untuk anak dengan hambatan pendengaran.

## Tech Stack

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| [Next.js](https://nextjs.org) | ^16 | App Router, `'use client'` |
| [React](https://react.dev) | ^19 | |
| [Tailwind CSS](https://tailwindcss.com) | v4 | Konfigurasi di `app/globals.css` |
| [TypeScript](https://www.typescriptlang.org) | ^5 | |
| Inter + Sorts Mill Goudy | — | Google Fonts (via `next/font`) |

## Struktur Proyek

```
├── app/
│   ├── globals.css      # Tailwind v4 config + design tokens
│   ├── layout.tsx       # Root layout + metadata SEO + JSON-LD
│   ├── page.tsx         # Seluruh konten halaman (single-page)
│   └── not-found.tsx    # Halaman 404
├── public/
│   ├── images/
│   │   ├── gallery/     # Foto galeri (frame-*.webp)
│   │   ├── logo.png     # Logo BMA
│   │   └── logo-badge.png
│   ├── favicon.ico
│   └── favicon.png
```

## Fitur

- ✅ Bilingual (ID / EN) — toggle bahasa tersimpan di `localStorage`
- ✅ Scroll-reveal animation (IntersectionObserver)
- ✅ Lightbox galeri foto
- ✅ Galeri paginasi (6 foto per halaman, total 24 foto)
- ✅ Navbar responsif + mobile menu hamburger
- ✅ WhatsApp direct link CTA
- ✅ SEO lengkap: metadata, OpenGraph, Twitter Card, JSON-LD Schema.org
- ✅ Responsive mobile-first

## Sections

1. **Hero** — tagline, foto grid, stats row, CTA button
2. **About** — deskripsi akademi, visi joyful learning
3. **Highlights** — 3 keunggulan utama
4. **Programs** — 5 program kelas (Move & Dance, Modern Dance, K-Pop, Tari Bali, Inklusif)
5. **Gallery** — 24 foto dokumentasi kelas dengan lightbox + paginasi
6. **Contact** — WhatsApp CTA + info kontak + info parent company

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build produksi
npm run build

# Jalankan produksi
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Deployment

Target deploy: subdomain `balimenari.warmaheritagegroup.com`

## Links

- 📞 WhatsApp: [+62 812-3966-9880](https://wa.me/6281239669880)
- 📍 Jalan Sekar Tunjung XV No. 1A, Denpasar, Bali 80237
- 🏛️ Parent Company: [warmaheritagegroup.com](https://warmaheritagegroup.com)
- 📄 Profil BMA di WHG: [warmaheritagegroup.com/companies/bali-menari-academy](https://warmaheritagegroup.com/companies/bali-menari-academy)
