# Panduan Dokumentasi Penilaian Desain Postingan Instagram (pos & neg)

Dokumen ini berisi kriteria penilaian standar untuk menentukan apakah desain postingan Instagram dikategorikan menarik (**Positive / `pos`**) atau tidak menarik (**Negative / `neg`**).

---

## 1. Parameter Utama Penilaian (Petunjuk / Hint)

Setiap desain postingan dinilai berdasarkan kehadiran dan kualitas dari dua unsur utama berikut:
1. **Unsur Tulisan (Teks Merek/Slogan):** Harus berupa tulisan singkat, jelas, padat, dan memiliki kesan kuat layaknya slogan promosi.
2. **Unsur Gambar (Visual Produk/Tema):** Harus berupa foto produk atau ilustrasi visual utama yang jelas, tajam, dan relevan dengan konten.

---

## 2. Kriteria Desain Menarik (Positive / `pos`)

Postingan dikategorikan sebagai **Positive (`pos`)** apabila memenuhi kriteria berikut:

| Kriteria | Penjelasan Detail | Contoh Kasus Nyata (Dataset 1-100) |
| :--- | :--- | :--- |
| **Slogan Singkat & Jelas** | Memiliki teks promosi singkat (maksimal 5-7 kata) yang menonjolkan nama merek, promo utama, atau slogan yang mudah diingat. | • `001_pos.png` (*"Paket Spesial Rp 55.000"* dari Es Teler 77)<br>• `009_pos.png` (*"HUT KOTAKU Rp 46.364"* dari KFC)<br>• `036_pos.png` (*"BMT DEALS Special Price Rp 35rb"* dari Subway) |
| **Gambar Produk Jelas** | Menampilkan foto produk asli atau ilustrasi utama dengan resolusi tinggi, tidak buram, pencahayaan baik, dan tajam. | • `002_pos.png` (Minuman boba cokelat)<br>• `013_pos.png` (Foto piring nasi tim ayam jamur)<br>• `035_pos.png` (Foto segelas boba dengan background rapi) |
| **Komposisi Seimbang** | Perpaduan harmonis antara slogan dan gambar produk, penataan bersih (*clean layout*), dan teks tidak menutupi area penting produk. | • `011_pos.png` (HP POCO C81 Pro)<br>• `009_pos.png` (Promo KFC dengan background merah ikonik)<br>• `036_pos.png` (Promo Subway BMT Deals dengan layout rapi) |

---

## 3. Kriteria Desain Biasa Saja (Neutral / `neutral`)

Postingan dikategorikan sebagai **Neutral (`neutral`)** apabila desainnya tergolong biasa saja, fungsional namun tidak memiliki elemen estetika menonjol (Positive) dan tidak memiliki cacat fatal (Negative).

| Kriteria | Penjelasan Detail | Contoh Kasus Nyata (Dataset 1-100) |
| :--- | :--- | :--- |
| **Slogan Sederhana / Teks Informasi Dasar** | Teks berupa deskripsi produk biasa, label nama merek, atau informasi operasional (bukan slogan promosi yang punchy). Jumlah kata sedang (8-15 kata) namun tetap teratur. | • `007_pos.png` (Daftar 10 menu Lawson - padat info tapi rapi)<br>• `044_pos.png` (Batagor Bandoeng - label teks standard) |
| **Visual Standar / Foto Produk Polos** | Foto produk jelas dan fokus, namun menggunakan background polos (tidak ditata secara artistik) atau sama sekali tidak memiliki slogan/teks overlay (borderline murni). | • `010_neg.png` (Samsung ViewFinity monitor)<br>• `074_neg.png` (Foto cincin Swarovski)<br>• `075_neg.png` (Tas Coach)<br>• `061_neg.png` (BMW 7 display car) |
| **Layout Fungsional / Templat Standar** | Susunan desain menggunakan templat instan standar (seperti Canva dengan data placeholder/kontak fiktif) atau menggunakan teks aksara asing/fiktif yang kurang fungsional bagi audiens umum. | • `018_pos.png` (Es Cendol template)<br>• `020_pos.png` (Fauget Croissant template)<br>• `032_pos.png` (Generic design template)<br>• `033_pos.png` (Takoyaki template)<br>• `051_pos.png` (Burger King Aurebesh) |

---

## 4. Kriteria Desain Tidak Menarik (Negative / `neg`)

Postingan dikategorikan sebagai **Negative (`neg`)** apabila memiliki salah satu atau beberapa kecacatan berikut:

| Kriteria | Penjelasan Detail | Contoh Kasus Nyata (Dataset 1-100) |
| :--- | :--- | :--- |
| **Tanpa Slogan / Kata-kata** | Gambar postingan polos tanpa ada teks overlay sama sekali, dan foto produk tidak teratur atau terkesan amatir (misal: makanan di wadah plastik tanpa penataan, background berantakan). | • `057_neg.png` (Foto hidangan asparagus dan roti)<br>• `063_neg.png` (Foto mobil Ferrari dari belakang) |
| **Terlalu Banyak Informasi (*Too Much Info*)** | Teks terlalu panjang, bertele-tele, ukuran huruf terlalu kecil, atau menyajikan terlalu banyak promo/kontak (teks menutupi $>30\%$ gambar dan berantakan). | • `012_neg.png` (Brosur perumahan penuh detail teks)<br>• `017_neg.png` (Brosur saus Pohon Cabe padat teks/logo) |

---

## 5. Matriks Ringkasan Logika Pelabelan

| Apakah Ada Slogan Singkat? | Apakah Ada Gambar Produk Jelas? | Apakah Desain Rapi & Seimbang? | Label Akhir | Suffix Nama File |
| :---: | :---: | :---: | :---: | :---: |
| **Ya** (Singkat & Jelas) | **Ya** (Tajam & Relevan) | **Ya** (Harmonis) | **Positive** | `_pos` |
| **Sedang / Label Sederhana** | **Ya** (Standar) | **Ya** (Sederhana/Fungsional) | **Neutral** | `_neutral` |
| **Tidak** | **Ya / Tidak** | **Ya / Tidak** | **Negative** | `_neg` |
---

## 6. Mitigasi Bias Algoritma & Keadilan Evaluasi (Algorithmic Bias Mitigation & Fairness)

Untuk memastikan dataset yang Anda gunakan tidak bias dan tidak mendiskriminasi produk tertentu yang dapat menurunkan performa generalisasi model CNN Anda, terapkan prinsip-prinsip ilmiah berikut saat melabeli data:

### A. Bahaya Algorithmic Bias pada Model CNN
1. **Bias Subjektivitas (*Subjective Labeling Noise*):** Jika kriteria seperti "desain seimbang" dinilai hanya berdasarkan selera pribadi satu orang penilai (*singularity-based opinion*), label dataset akan menjadi sangat tidak konsisten (*noisy labels*). Hal ini membuat model CNN kesulitan menemukan korelasi matematis yang ajeg pada piksel gambar, sehingga performa model (akurasi dan presisi) akan anjlok atau mengalami *overfitting* pada selera pribadi penilai.
2. **Bias Diskriminasi Produk (*Product Discrimination Bias / Shortcut Learning*):** Jika kita secara tidak sadar melabeli postingan produk mewah/merek global sebagai `_pos` (karena mereka menggunakan foto studio profesional) dan melabeli produk lokal/UMKM kecil sebagai `_neg` (karena foto produknya lebih sederhana), model CNN akan mempelajari *shortcut* visual. AI akan mengenali latar belakang studio mewah, elemen estetika kelas atas, atau logo merek terkenal sebagai fitur kelas `_pos`, dan mengasosiasikan elemen visual produk lokal sederhana dengan kelas `_neg`. Ini adalah bentuk diskriminasi sistemik oleh algoritma.

### B. Langkah Mitigasi & Keadilan Evaluasi (*Fairness Guidelines*)
* **Prioritaskan Struktur & Keterbacaan, Bukan Kemewahan:** Produk lokal atau UMKM dengan visual sederhana **wajib dilabeli `_pos`** asalkan foto produknya fokus (tidak buram), memiliki slogan singkat yang jelas, dan kontras warnanya baik. Jangan mendiskriminasi postingan hanya karena ia tidak menggunakan model profesional atau efek visual mahal.
* **Gunakan Metode Konsensus Penilai (*Consensus Labeling*):** Hindari menyerahkan tugas pelabelan 100% pada satu orang anggota kelompok. Lakukan *cross-labeling* di mana minimal 2 anggota kelompok menilai gambar yang sama secara terpisah. Jika ada ketidaksepakatan label, gunakan kriteria pada dokumen ini untuk mendiskusikannya dan ambil keputusan berdasarkan kesepakatan rasional kelompok, bukan opini subjektif sepihak.
* **Standarisasi Pengukuran Kategori:**
  * **Slogan Singkat:** Secara objektif didefinisikan sebagai teks yang berjumlah $\le$ 7 kata.
  * **Kepadatan Informasi (*Too Much Info*):** Secara objektif didefinisikan sebagai teks yang menutupi lebih dari 30% area gambar atau berisi paragraf deskripsi yang padat.
* **Jaga Keseimbangan Dataset (*Class Balance*):** Pastikan jumlah data berlabel `_pos` dan `_neg` berimbang secara merata di dalam dataset latih Anda agar model tidak condong memprediksi satu kelas saja.
