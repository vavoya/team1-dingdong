import {getNotifications} from "@/api/query/notification/get.ts";

// '/home' 에서 필요한 query 객체를 배열로 담기
export default [
    getNotifications(),
]