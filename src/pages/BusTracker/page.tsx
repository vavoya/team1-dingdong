
// react
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
// kakaoMap
import {Map} from "react-kakao-maps-sdk"
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader.ts"
// hook
import useCurrentLocation from "@/hooks/useCurrentLoaction/useCurrentLocation.ts";
// 스타일
import {BusCardSection, PageWrapper} from "@/pages/BusTracker/styles.ts";
// 컴포넌트
import BusStopOverlay from "@/pages/BusTracker/components/BusStopOverlay";
import BusRoute from "@/pages/BusTracker/components/BusRoute";
import BusOverlay from "@/pages/BusTracker/components/BusOverlay";
import UserOverlay from "@/pages/BusTracker/components/UserOverlay";
import LocateMeButton from "@/pages/BusTracker/components/LocateMeButton";
import BusStateCard from "@/pages/Home/component/BusStateCard";

export interface PositionType {
    lat: number;
    lng: number;
}

export default function BasicMap() {
    useKakaoLoader()
    const userLocation = useCurrentLocation();
    const [location, setLocation] = useState({
        // 지도의 초기 위치
        center: { lat: 33.450701, lng: 126.570667 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: false,
    })
    // 중심 이동 좌표가 동일하면 지도 이동이 안됨. 그것을 약간 씩 조절 해주는 값
    const mapJitter = useRef<number>(0.00000001);
    return (
        createPortal(
            <PageWrapper>
                <Map // 지도를 표시할 Container
                    id="map"
                    center={location.center}
                    isPanto={location.isPanto}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "100%",
                    }}
                    level={4} // 지도의 확대 레벨
                >
                    {/* 버스 경로 */}
                    <BusRoute path={[
                        { lat: 33.452344169439975, lng: 126.56878163224233 },
                        { lat: 33.452739313807456, lng: 126.5709308145358 },
                        { lat: 33.45178067090639, lng: 126.572688693875 },
                    ]}/>
                    {/* 버스 정류장 오버레이 */}
                    <BusStopOverlay lat={33.450701} lng={126.570667} />
                    {/* 버스 위치 오버레이 */}
                    <BusOverlay lat={33.450701} lng={126.570667} />
                    {/* 사용자 위치 오버레이 */}
                    <UserOverlay lat={userLocation.lat} lng={userLocation.lng} />
                </Map>
                <BusCardSection>
                    <LocateMeButton onClick={() => {
                        if (userLocation.lat !== -1 || userLocation.lng !== -1) {
                            mapJitter.current *= -1
                            setLocation({
                                center: { lat: userLocation.lat + mapJitter.current, lng: userLocation.lng },
                                isPanto: true,
                            })
                        }
                    }}/>
                    <BusStateCard  />
                </BusCardSection>
            </PageWrapper>,
            document.getElementById("root")!
        )
    )
}

