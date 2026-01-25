# 🚗 Carwash Log

Carwash Log adalah web app mobile-friendly untuk mencatat data absen dan log cuci mobil.  
Frontend di-hosting via **GitHub Pages**, backend menggunakan **Google Apps Script** yang terhubung ke **Google Sheets**.

---

## ✨ Features

- 📱 Mobile-first (portrait)
- ⏳ Loading page dengan animasi typing
- 📝 Submit form absen cuci mobil
- 📊 Entry Log (table view + grouping date)
- 🔍 Search & filter (name / unit / payment)
- 🔊 Sound effect (click / success / error)
- ☁️ Data tersimpan otomatis ke Google Sheets
- 📦 Installable PWA (Add to Home Screen)

---

## 🗂️ Project Structure

/
├─ index.html
├─ style.css
├─ script.js
├─ manifest.json
├─ README.md
└─ assets/
├─ images/
│ └─ carlog.jpg
└─ sounds/
├─ clicktone.mp3
├─ successtone.mp3
└─ errortone.mp3


---

## 📊 Google Spreadsheet

- **Spreadsheet Name:** Carwash-Log  
- **Sheet Name:** Entries  

Header (Row 1):

| timestamp | date | name | unit | payment |

---

## ⚙️ Google Apps Script (Backend)

- Deploy as **Web App**
- Execute as: **Me**
- Who has access: **Anyone**
- Method supported:
  - `GET` → fetch entry log
  - `POST` → submit form data

Pastikan URL Web App dimasukkan ke `script.js`:

```js
const GAS_URL = "https://script.google.com/macros/s/XXXXX/exec";
