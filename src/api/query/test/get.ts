import axios from 'axios';

// 테스트 동작을 위한 코드
export default (queryParams = {}) => ({
    // 쿼리 파라미터가 존재하면 [endpoint, queryParams]를, 없으면 [endpoint]를 캐시 키로 사용
    queryKey: Object.keys(queryParams).length > 0 ? ['test', queryParams] : ['test'],
    queryFn: async () => {
        const response = await axios.get('https://httpbin.org/delay/5');
        return response.data;
    },
    suspense: true,
});
