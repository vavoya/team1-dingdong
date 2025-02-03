import {useEffect, useRef, useState} from "react";
import {ScheduledDepartures} from "./styles.ts";
import ArrowRightSvg from "@/pages/Reservations/components/ArrowRightSvg";
import ArrowLeftSvg from "@/pages/Reservations/components/ArrowLeftSvg";
import LocationSvg from "@/pages/Reservations/components/LocationSvg";
import CalenderSvg from "@/pages/Reservations/components/CalenderSvg";
import ClockSvg from "@/pages/Reservations/components/ClockSvg";
import ArrowRight2Svg from "@/pages/Reservations/components/ArrowRight2Svg";

// @ts-ignore data 때문에 임시로
export default function CardSlider({data}) {
    const countRef = useRef<number[]>([-1, 0, 1]);
    const slideCurrent = useRef<number>(0);
    const [slideState, setSlideState] = useState<{ isNext: boolean } | null>(null);
    const slideBlock = useRef<boolean>(false);

    useEffect(() => {
        if (slideState !== null) {
            const timer = setTimeout(() => {
                slideBlock.current = false;
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [slideState])

    const renderCards = () => {
        const prev = slideCurrent.current > 0 ? slideCurrent.current - 1 : data.length - 1;
        const current = slideCurrent.current
        const next = slideCurrent.current < data.length - 1 ? slideCurrent.current + 1 : 0;

        if (slideState == null) {
            return countRef.current.map((count, index) => {
                if (count === -1) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[prev].date} location={data[prev].location} time={data[prev].time}/>
                    )
                }
                if (count === 0) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[current].date} location={data[current].location} time={data[current].time}/>
                    )
                }
                if (count === 1) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[next].date} location={data[next].location} time={data[next].time}/>
                    )
                }
            })
        }
        else if (slideState.isNext) {
            return countRef.current.map((count, index) => {
                if (count === -1) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[prev].date} location={data[prev].location} time={data[prev].time}/>
                    )
                }
                if (count === 0) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[current].date} location={data[current].location} time={data[current].time}/>
                    )
                }
                if (count === 1) {
                    return (
                        <Card key={index} count={count} isHidden={true} toUniversity={true} date={data[next].date} location={data[next].location} time={data[next].time}/>
                    )
                }
            })
        }
        else {
            return countRef.current.map((count, index) => {
                if (count === -1) {
                    return (
                        <Card key={index} count={count} isHidden={true} toUniversity={true} date={data[prev].date} location={data[prev].location} time={data[prev].time}/>
                    )
                }
                if (count === 0) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[current].date} location={data[current].location} time={data[current].time}/>
                    )
                }
                if (count === 1) {
                    return (
                        <Card key={index} count={count} toUniversity={true} date={data[next].date} location={data[next].location} time={data[next].time}/>
                    )
                }
            })
        }

    }

    const slideNext = () => {
        if (slideBlock.current) return;
        slideBlock.current = true;
        slideCurrent.current = slideCurrent.current < data.length - 1 ? slideCurrent.current + 1 : 0;
        countRef.current.unshift(countRef.current.pop() as number);
        setSlideState({
            isNext: true
        });
    }

    const slidePrev = () => {
        if (slideBlock.current) return;
        slideBlock.current = true;
        slideCurrent.current = slideCurrent.current > 0 ? slideCurrent.current - 1 : data.length - 1;
        countRef.current.push(countRef.current.shift() as number);
        setSlideState({
            isNext: false
        });
    }

    return (
        <ScheduledDepartures.Wrapper>
            <ScheduledDepartures.Slider>
                <HiddenCard />
                {
                    renderCards()
                }
            </ScheduledDepartures.Slider>
            <ScheduledDepartures.SliderControls>
                {
                    data.length > 1 ?
                        <ScheduledDepartures.SlideButton onClick={slidePrev}>
                            <ArrowLeftSvg />
                        </ScheduledDepartures.SlideButton>:
                        null
                }
                <ScheduledDepartures.SlideCounter isCurrent={true}>
                    {slideCurrent.current + 1}
                </ScheduledDepartures.SlideCounter>
                <ScheduledDepartures.SlideCounter>
                    /
                </ScheduledDepartures.SlideCounter>
                <ScheduledDepartures.SlideCounter>
                    {data.length}
                </ScheduledDepartures.SlideCounter>
                {
                    data.length > 1 ?
                        <ScheduledDepartures.SlideButton onClick={slideNext}>
                            <ArrowRightSvg />
                        </ScheduledDepartures.SlideButton> :
                        null
                }
            </ScheduledDepartures.SliderControls>
        </ScheduledDepartures.Wrapper>
    )
}

type CardProps = {
    count: number,
    toUniversity: boolean,
    date: string,
    location: string,
    time: string,
    isHidden?: boolean
    isAbsolute?: boolean
}
function Card({count, toUniversity, date, location, time, isHidden = false, isAbsolute = true}: CardProps) {

    return (
        <ScheduledDepartures.Card style={isHidden ? {visibility: 'hidden'}: undefined} isAbsolute={isAbsolute} count={count}>
            <ScheduledDepartures.CardHeader>
                <ScheduledDepartures.Title>
                    탑승 예정
                </ScheduledDepartures.Title>
                <ScheduledDepartures.Direction>
                    <ScheduledDepartures.DirectionText>
                        {
                            toUniversity ? "집" : "학교"
                        }
                    </ScheduledDepartures.DirectionText>
                    <ArrowRight2Svg />
                    <ScheduledDepartures.DirectionText>
                        {
                            toUniversity ? "학교" : "집"
                        }
                    </ScheduledDepartures.DirectionText>
                </ScheduledDepartures.Direction>
            </ScheduledDepartures.CardHeader>
            <ScheduledDepartures.CardPunchHole left={true}/>
            <ScheduledDepartures.CardPunchHole left={false}/>
            <ScheduledDepartures.CardBody>
                <ScheduledDepartures.InfoBox>
                    <CalenderSvg />
                    <ScheduledDepartures.InfoText>
                        {date}
                    </ScheduledDepartures.InfoText>
                </ScheduledDepartures.InfoBox>
                <ScheduledDepartures.InfoBox>
                    <LocationSvg />
                    <ScheduledDepartures.InfoText>
                        {location}
                    </ScheduledDepartures.InfoText>
                </ScheduledDepartures.InfoBox>
                <ScheduledDepartures.InfoBox>
                    <ClockSvg />
                    <ScheduledDepartures.InfoText>
                        {time}
                    </ScheduledDepartures.InfoText>
                </ScheduledDepartures.InfoBox>
            </ScheduledDepartures.CardBody>
        </ScheduledDepartures.Card>
    )
}

function HiddenCard() {
    return (
        <Card count={0} toUniversity={true} date={'1'} location={'1'} time={'1'} isHidden={true} isAbsolute={false}/>
    )
}