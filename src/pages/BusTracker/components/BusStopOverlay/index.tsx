import {BusStopInfoBox, BusStopOverlayWrapper} from "@/pages/BusTracker/components/BusStopOverlay/styles.ts";
import {CustomOverlayMap} from "react-kakao-maps-sdk";
import {PositionType} from "@/pages/BusTracker/page.tsx";


export default function BusStopOverlay({lat, lng}: PositionType ) {

    return (

        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
            // 커스텀 오버레이가 표시될 위치입니다
            position={{
                lat: lat,
                lng: lng,
            }}
        >
            {/* 커스텀 오버레이에 표시할 내용입니다 */}
            <BusStopOverlayWrapper>
                <BusStopInfoBox>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z" fill="#FF6F00"/>
                    </svg>
                    <span>
                    학동역
                </span>
                    <span>
                    탑승
                </span>
                </BusStopInfoBox>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="16" viewBox="0 0 5 16" fill="none">
                    <line x1="2.5" y1="4.37114e-08" x2="2.5" y2="13" stroke="#222235" strokeWidth="2"/>
                    <circle cx="2.5" cy="14" r="2" fill="#222235"/>
                </svg>
            </BusStopOverlayWrapper>
        </CustomOverlayMap>
    )
};