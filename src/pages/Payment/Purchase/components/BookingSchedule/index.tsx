import {
    Card,
    CardBody, CardBodyItem, CardBodyItemText,
    CardLine,
    CardTitle,
    Title,
    Wrapper
} from "@/pages/Payment/Purchase/components/BookingSchedule/styles.ts";
import CalenderIcon from "@/components/designSystem/Icons/Reservations/CalenderIcon.tsx";
import ClockIcon from "@/components/designSystem/Icons/Reservations/ClockIcon.tsx";
import LocationIcon from "@/components/designSystem/Icons/Reservations/LocationIcon.tsx";


export default function BookingSchedule() {

    return (
        <Wrapper>
            <Title>
                예매 일정
            </Title>
            <Card>
                <CardTitle>
                    등교
                </CardTitle>
                <CardLine />
                <CardBody>
                    <CardBodyItem>
                        <CalenderIcon />
                        <CardBodyItemText>
                            02.15(수)
                        </CardBodyItemText>
                    </CardBodyItem>
                    <CardBodyItem>
                        <ClockIcon />
                        <CardBodyItemText>
                            10:00 탑승
                        </CardBodyItemText>
                    </CardBodyItem>
                    <CardBodyItem>
                        <LocationIcon />
                        <CardBodyItemText>
                            학동역
                        </CardBodyItemText>
                    </CardBodyItem>
                </CardBody>
            </Card>
        </Wrapper>
    )
}