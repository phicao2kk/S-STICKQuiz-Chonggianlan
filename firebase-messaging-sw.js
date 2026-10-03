// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC_DMAkkjbEhmOGZOebNxXsU_qJ5fmw1F8",
  authDomain: "fir-stick-quiz.firebaseapp.app",
  databaseURL: "https://fir-stick-quiz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-stick-quiz",
  storageBucket: "fir-stick-quiz.firebasestorage.app",
  messagingSenderId: "293945055838",
  appId: "1:293945055838:web:8d6afb707dfcb1c25df2cf",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.ibb.co/qSTVx47/S-STICK.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
