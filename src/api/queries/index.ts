//import Home from "@/api/queries/Home";
import Test from "@/api/queries/Test";
import {QueriesPath} from "@/lib/customNav/interface.ts";


// 테스트 동작으로 임시로 적용
const queriesPath: QueriesPath = {
    '/home': Test,
}

export default queriesPath