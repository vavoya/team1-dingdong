import {createQueryFactory} from "@/lib/customNav/createQueryFactory.ts";

// 요청할 api 경로로 콜백 함수 생성(query 객체 return하는 콜백 함수)
// getNotifications(쿼리파라미터 객체) 를 통해 query 객체 return
export const getNotifications = createQueryFactory('/api/notification');