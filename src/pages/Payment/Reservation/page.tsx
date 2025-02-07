import ExitHeader from "@/components/Headers/ExitHeader";
import BookingSchedule from "@/pages/Payment/Reservation/components/BookingSchedule";
import PricingInfo from "@/pages/Payment/components/PricingInfo";
import PaymentMethod from "@/pages/Payment/components/PaymentMethod";
import {
    Divider,
    PageMain, PageWrapper
} from "@/pages/Payment/Purchase/styles.ts";
import ActionButton from "@/pages/Payment/components/ActionButton";
import RefundPolicy from "@/pages/Payment/components/RefundPolicy";


export default function Page() {


    return (
        <PageWrapper>
            <ExitHeader text={"버스 예매"} />
            <PageMain>
                <BookingSchedule />
                <Divider />
                <PricingInfo />
                <Divider />
                <PaymentMethod />
                <RefundPolicy />
                <ActionButton />
            </PageMain>
        </PageWrapper>
    )
}