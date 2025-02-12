import { getToken } from "firebase/messaging";
import { messaging } from "./settingFCM";
import { postDeviceToken } from "@/api/webPushNotification/notification";

export async function handleAllowNotification() {
  if (Notification.permission === "default") {
    const status = await Notification.requestPermission(); //granted, denied, default
    if (status === "denied") {
      return "denied";
    } else if (status === "granted") {
      try {
        // 서비스 워커 등록 완료를 기다림
        await registerServiceWorker();
        const token = await retryGetDeviceToken(3); // 최대 3번까지 재시도
        await postDeviceToken(token);
        return "granted";
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      return "default";
    }
  } else {
    return "exist Notification type";
  }
}

// getDeviceToken 재시도 로직 추가 => 디바이스 토큰 불러오기 실패를 대비
async function retryGetDeviceToken(retries: number): Promise<string> {
  try {
    return await getDeviceToken();
  } catch (error) {
    if (retries === 0) {
      console.error("최대 재시도 횟수 초과:", error);
      throw error;
    } else {
      console.warn(`getDeviceToken 재시도 중... 남은 횟수: ${retries}`);
      return retryGetDeviceToken(retries - 1);
    }
  }
}

async function getDeviceToken(): Promise<string> {
  // 권한이 허용된 후에 토큰을 가져옴
  const token = await getToken(messaging, {
    vapidKey:
      "BBBYMKVr8ureS9rRn1kMLUeTYJBTzk3Vxpaypodi-yj6DK0vCDeLOgdhxOcBKLyB5J0cv9wYki1ygt9XEYZRpWQ",
  });
  return token;
}

export async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register(
      "firebase-messaging-sw.js"
    );
    console.log("Service Worker 등록 성공:", registration);
  } catch (error) {
    console.log("Service Worker 등록 실패:", error);
  }
}
