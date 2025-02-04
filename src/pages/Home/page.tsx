// 스타일
import {
    PageWrapper, PageMain
} from "@/pages/Home/styles.ts"
// 컴포넌트
import HomeHeader from "@/components/Headers/HomeHeader";
import BusState from "@/pages/Home/component/BusState";
import HomeSchool from "@/pages/Home/component/HomeSchool";
import BusSelection from "@/pages/Home/component/BusSelection";

export default function Page() {


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