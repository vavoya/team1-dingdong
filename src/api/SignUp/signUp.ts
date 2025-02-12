import { axiosInstance } from "@/api";

export interface UserInfo {
  email: string;
  password: string;
  name: string;
  address: string;
  addressNickname: string;
  phoneNumber: string;
}

export async function postSendUserSchoolEmail(email: string) {
  try {
    return axiosInstance.post("/api/home", {
      email,
    });
  } catch (err: any) {
    console.error("이메일 전송 요청 실패:", err);
    throw new Error(err);
  }
}

export async function postUserVerificationCode(code: string) {
  try {
    return axiosInstance.post("/api/home", {
      code,
    });
  } catch (err: any) {
    console.error("유저가 받은 인증 코드 전송 실패:", err);
    throw new Error(err);
  }
}

export async function postUserInfo(userInfo: UserInfo) {
  try {
    return axiosInstance.post("/api/signup", {
      userInfo,
    });
  } catch (err: any) {
    console.error("회원가입 실패:", err);
    throw new Error(err);
  }
}
