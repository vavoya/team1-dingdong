// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ1k8Pq4-w0aaFon3ZBmPboULhZvdqP2E",
  authDomain: "ding-dong-dcdfa.firebaseapp.com",
  projectId: "ding-dong-dcdfa",
  storageBucket: "ding-dong-dcdfa.firebasestorage.app",
  messagingSenderId: "511741269",
  appId: "1:511741269:web:b051c0f33cf11d1c70b3dc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

async function handleAllowNotification() {
  await Notification.requestPermission();
  await getDeviceToken();
}

async function getDeviceToken() {
  // 권한이 허용된 후에 토큰을 가져옴
  await getToken(messaging, {
    vapidKey:
      "BBBYMKVr8ureS9rRn1kMLUeTYJBTzk3Vxpaypodi-yj6DK0vCDeLOgdhxOcBKLyB5J0cv9wYki1ygt9XEYZRpWQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        // 토큰을 서버로 전송하거나 UI 업데이트
        console.log("토큰: ", currentToken);
        alert("토큰: " + currentToken);
      } else {
        console.log("토큰을 가져오지 못했습니다. 권한을 다시 요청하세요.");
      }
    })
    .catch((err) => {
      alert(err);
      console.log("토큰을 가져오는 중 에러 발생: ", err);
    });
}

handleAllowNotification();
