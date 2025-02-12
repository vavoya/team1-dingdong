// 스타일
import {
    PageWrapper, PageMain
} from "@/pages/Home/styles.ts"
// 컴포넌트
import HomeHeader from "@/components/Headers/HomeHeader";
import BusState from "@/pages/Home/component/BusState";
import HomeSchool from "@/pages/Home/component/HomeSchool";
import BusSelection from "@/pages/Home/component/BusSelection";
import {useLoaderData} from "react-router-dom";

export default function Page() {
    const events = useLoaderData();
    console.log(events)

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