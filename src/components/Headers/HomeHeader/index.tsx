import BellSvg from "@/pages/Home/component/BellSvg";
import UserSvg from "@/pages/Home/component/UserSvg";
import {NavButton, NavList, Title, Wrapper} from "@/components/Headers/HomeHeader/styles.ts";


export default function HomeHeader() {


    return (

        <Wrapper>
            <Title>
                DingDong
            </Title>
            <NavList>
                <li>
                    <NavButton>
                        <BellSvg />
                    </NavButton>
                </li>
                <li>
                    <NavButton>
                        <UserSvg />
                    </NavButton>
                </li>
            </NavList>
        </Wrapper>
    )
}