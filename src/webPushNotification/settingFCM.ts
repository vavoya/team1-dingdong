// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr-VReho4JfeIHhXrELr_IARZj2uwgdo4",
  authDomain: "dingdong-7b8d4.firebaseapp.com",
  projectId: "dingdong-7b8d4",
  storageBucket: "dingdong-7b8d4.firebasestorage.app",
  messagingSenderId: "737122933712",
  appId: "1:737122933712:web:6df6cad62e05e5ef72b7d5",
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
