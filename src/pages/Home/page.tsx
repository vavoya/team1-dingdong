// 스타일
import {
    PageWrapper, PageMain
} from "@/pages/Home/styles.ts"
// 컴포넌트
import HomeHeader from "@/components/Headers/HomeHeader";
import BusState from "@/pages/Home/component/BusState";
import HomeSchool from "@/pages/Home/component/HomeSchool";
import BusSelection from "@/pages/Home/component/BusSelection";
import {usePathQueries} from "@/lib/customNav";

export default function Page() {
    const results = usePathQueries();

    const firstQuery = results[0];

    if (!firstQuery.isLoading && firstQuery.data) {
        console.log('캐시 데이터를 사용 중입니다.');
    } else {
        console.log('데이터를 네트워크로부터 가져오고 있습니다.');
    }


    return (
        <PageWrapper>
            <HomeHeader />
            <PageMain>
                <BusSelection />
                <HomeSchool />
                {/* type 에 따라 예매 내역 유무*/}
                <BusState />
            </PageMain>
        </PageWrapper>
    );
}