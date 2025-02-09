import ExitHeader from "@/components/Headers/ExitHeader";
import BookingSchedule from "@/pages/Payment/Purchase/components/BookingSchedule";
import PricingInfo from "@/pages/Payment/components/PricingInfo";
import PaymentMethod from "@/pages/Payment/components/PaymentMethod";
import {
    Divider,
    PageMain, PageWrapper
} from "@/pages/Payment/Purchase/styles.ts";
import ActionButton from "@/pages/Payment/components/ActionButton";


export default function Page() {


    return (
        <PageWrapper>
            <ExitHeader text={"함께 타기"} />
            <PageMain>
                <BookingSchedule />
                <Divider />
                <PricingInfo />
                <Divider />
                <PaymentMethod />
                <ActionButton />
            </PageMain>
        </PageWrapper>
    )
}