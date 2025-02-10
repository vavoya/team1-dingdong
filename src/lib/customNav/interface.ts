import {QueryFunction} from "react-query";


export interface QueryParams {
    [key: string]: string;
}

// 여러 함수에서 사용 가능한 타입 별칭 정의
export type QueryFactory = (queryParams?: QueryParams) => Query;

export interface Query {
    queryKey: (string | QueryParams)[];
    queryFn: QueryFunction<any, (string | QueryParams)[]>;
    suspense: boolean
}

export interface QueriesPath {
    [key: string]: Query[]
}