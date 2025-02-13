
import {axiosInstance} from "@/api";
import {FetchQueryOptions} from "@tanstack/react-query";

// 헬퍼 함수: 엔드포인트 받아 QueryFactory 함수를 생성합니다.
export function createQueryFactory(endpoint: string, needCache: boolean = true): (queryParams?: {}) => FetchQueryOptions {
    return (queryParams = {}):FetchQueryOptions => ({
        // 쿼리 파라미터가 존재하면 [endpoint, queryParams]를, 없으면 [endpoint]를 캐시 키로 사용
        queryKey: Object.keys(queryParams).length > 0 ? [endpoint, queryParams] : [endpoint],
        queryFn: async () => {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${endpoint}${queryString ? `?${queryString}` : ''}`;
            const response = await axiosInstance.get(url);
            return response.data;
        },
        staleTime: needCache ? 1000 * 60 * 60 : 0
    });
}