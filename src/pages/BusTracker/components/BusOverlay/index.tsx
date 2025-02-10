import {BusWrapper} from "@/pages/BusTracker/components/BusOverlay/styles.ts";
import {CustomOverlayMap} from "react-kakao-maps-sdk";
import {PositionType} from "@/pages/BusTracker/page.tsx";
import BusIcon from "@/components/designSystem/Icons/BusTracker/BusIcon.tsx";

export default function BusOverlay({lat, lng}: PositionType) {

    return (
        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
            // 커스텀 오버레이가 표시될 위치입니다
            position={{
                lat: lat,
                lng: lng,
            }}
        >
            <BusWrapper>
                <BusIcon />
            </BusWrapper>
        </CustomOverlayMap>
    )
}