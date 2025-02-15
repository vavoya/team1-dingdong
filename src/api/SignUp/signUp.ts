import { axiosInstance } from "@/api";

interface HomeLocation {
  houseLatitude: number;
  houseLongitude: number;
  stationLatitude?: number;
  stationLongitude?: number;
  stationName?: string;
}

interface SchoolLocation {
  name: string;
  roadNameAddress: string;
  latitude: number;
  longitude: number;
}

export interface SignUpRequestType {
  name: string;
  email: string;
  password: string;
  home: HomeLocation;
  school: SchoolLocation;
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

export async function postUserInfo(userInfo: SignUpRequestType) {
  try {
    return axiosInstance.post("/api/auth/signup", userInfo);
  } catch (err: any) {
    console.error("회원가입 실패:", err);
    throw new Error(err);
  }
}
