# CPM Product - Management System

Proyek ini adalah aplikasi manajemen produk yang dibangun menggunakan **React**, **Vite**, dan **TypeScript**. Aplikasi ini dirancang untuk mengelola katalog produk, detail produk, serta melakukan operasi CRUD (Create, Read, Update, Delete) dengan performa tinggi dan desain UI yang premium.

## Fitur Utama

- **Katalog Produk**: Daftar produk dengan fitur pencarian, filter kategori, dan pengurutan.
- **Dua Mode Tampilan**: Mendukung mode **Pagination** dan **Infinite Scroll**.
- **Detail Produk**: Informasi lengkap produk termasuk galeri gambar, stok, dan spesifikasi teknis.
- **Operasi CRUD**: Form untuk membuat dan memperbarui data produk, serta dialog konfirmasi untuk penghapusan.
- **State Management**: Menggunakan **Zustand** untuk state global dan **Zustand Reducer** untuk manajemen logika yang kompleks.
- **Data Fetching**: Menggunakan **TanStack Query (React Query)** untuk caching dan sinkronisasi data server.

## Struktur Folder

Berikut adalah penjelasan mengenai struktur folder dalam proyek ini:

```text
src/
├── assets/         # Aset statis seperti gambar dan ikon.
├── components/     # Komponen UI yang dapat digunakan kembali.
│   ├── layouts/    # Komponen tata letak (Header, Sidebar, dll).
│   ├── shared/     # Komponen yang digunakan di berbagai fitur (Table, Dialog).
│   └── ui/         # Komponen UI atomik dasar (Button, Input, Toast).
├── constants/      # Nilai konstan dan konfigurasi statis (misalnya kolom tabel).
├── features/       # Folder utama berbasis fitur (Modular).
│   ├── product/    # Logika, komponen, dan hook khusus fitur Produk.
│   │   ├── components/ # Sub-komponen khusus produk (misalnya Form).
│   │   ├── hook/      # Custom hook khusus fitur produk (useProduct, useDetail).
│   │   ├── pages/     # Halaman utama fitur (Catalog, Detail).
│   │   ├── service/   # API service calls.
│   │   ├── store/     # State management lokal fitur (Zustand).
│   │   └── types/     # Definisi tipe TypeScript khusus produk.
│   └── not-found/  # Fitur untuk halaman 404.
├── hooks/          # Custom hooks tingkat global (misalnya useDebounce).
├── lib/            # Konfigurasi library eksternal (misalnya Axios, React Query).
├── routes/         # Konfigurasi routing aplikasi.
├── stores/         # Global state management tingkat aplikasi.
├── types/          # Definisi tipe global.
└── utils/          # Fungsi utility pembantu (helpers).
```

## Cara Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di mesin lokal Anda:

1. **Clone repositori**:

   ```bash
   git clone https://github.com/herzfr/cpm-product
   cd cpm-product
   ```

2. **Instal dependensi**:
   Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/). Jalankan perintah berikut:

   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Pastikan file `.env.development` sudah terkonfigurasi dengan benar (terutama untuk `VITE_API_URL`).

4. **Jalankan aplikasi (Development)**:

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`.

5. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

## Info Pendukung Lainnya

- **Framework**: Vite + React + TypeScript.
- **Styling**: Tailwind CSS (melalui utilitas CSS kustom).
- **Icons**: Lucide React.
- **Form Handling**: React Hook Form + Zod (untuk validasi).
- **Testing**: Vitest + React Testing Library. Jalankan tes dengan `npm test`.
- **Backend**: (https://dummyjson.com/).

---

Dibuat dengan oleh Herza Fellani R
