const CACHE_NAME = 'sstick-quiz-v4-cache';

// Liệt kê các file và thư viện cần thiết để chạy offline
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'https://i.ibb.co/qSTVx47/S-STICK.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-database-compat.js',
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth-compat.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/html-docx-js@0.3.1/dist/html-docx.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

// Bước 1: Cài đặt Service Worker và lưu các file vào bộ nhớ đệm (Cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('S-STICK: Đang lưu bộ nhớ đệm...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Bước 2: Kích hoạt SW và dọn dẹp cache cũ nếu có nâng cấp version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Bước 3: Quan trọng nhất - Kiểm soát các yêu cầu mạng
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Nếu tìm thấy file trong cache, trả về file đó (chạy offline)
      if (response) {
        return response;
      }
      // Nếu không có, mới tải từ mạng (online)
      return fetch(event.request);
    })
  );
});
