// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);

// 서비스 워커 확인 후 FCM 초기화
// messaging을 먼저 선언하고, 이후에 조건에 따라 설정
export let messaging: Messaging | undefined = undefined;

const isPWAOrNotIphone = "serviceWorker" in navigator;
if (isPWAOrNotIphone) {
  // ios의 경우 PWA 라면 서비스 워커 지원 가능. 일반 ios 에서 브라우저라면 지원 안되어서 막기.
  console.log("서비스 워커 지원됨, FCM 사용 가능");
  messaging = getMessaging(app);
} else {
  console.log("서비스 워커 미지원, FCM 비활성화");
}
