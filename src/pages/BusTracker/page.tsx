import {useEffect, useRef, useState} from "react";
import {Map} from "react-kakao-maps-sdk"
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader.ts"
import {BusCardSection, PageWrapper} from "@/pages/BusTracker/styles.ts";
import {BusState} from "@/pages/Home/styles.ts";
import BusStopOverlay from "@/pages/BusTracker/components/BusStopOverlay";
import BusRoute from "@/pages/BusTracker/components/BusRoute";
import BusSvg from "@/pages/Home/component/BusSvg";
import BusOverlay from "@/pages/BusTracker/components/BusOverlay";
import UserOverlay from "@/pages/BusTracker/components/UserOverlay";
import LocateMeButton from "@/pages/BusTracker/components/LocateMeButton";

export type PositionType = {
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
                    <BusState.Card>
                        <BusState.CardHeader>
                            <BusState.CardInfo>
                                <BusState.CardTIme>
                                    오늘 12:00
                                </BusState.CardTIme>
                                <BusState.CardLocation>
                                    학동역 탑승
                                </BusState.CardLocation>
                            </BusState.CardInfo>
                        </BusState.CardHeader>
                        <BusState.CardBusInfo>
                            <BusSvg />
                            <BusState.CardBusNumber>
                                버스01
                            </BusState.CardBusNumber>
                            <BusState.ArrivalTime>
                                4분 후 도착
                            </BusState.ArrivalTime>
                        </BusState.CardBusInfo>
                        <BusState.CardDestination>
                            <BusState.CardDestinationText>
                                13:00 학교 도착
                            </BusState.CardDestinationText>
                            <BusState.Divider />
                            <BusState.CardDestinationText>
                                45분 소요
                            </BusState.CardDestinationText>
                        </BusState.CardDestination>
                    </BusState.Card>
                </BusCardSection>
        </PageWrapper>
    )
}


function useCurrentLocation() {
    const [location, setLocation] = useState<PositionType>({ lat: -1, lng: -1 });

    useEffect(() => {
        if ("geolocation" in navigator) {
            /* 위치정보 사용 가능 */
            const success = (pos: GeolocationPosition) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                })
            }

            const error = (err: GeolocationPositionError) => {
                console.warn("ERROR(" + err.code + "): " + err.message);
            }

            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }

            const id = navigator.geolocation.watchPosition(success, error, options);

            return () => {
                navigator.geolocation.clearWatch(id);

            }
        } else {
            /* 위치정보 사용 불가능 */
            console.warn("위치 권한이 거부됨. watchPosition 실행하지 않음.");
        }

    }, []);

    return location;
}