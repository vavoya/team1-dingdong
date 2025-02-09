import BellIcon from "@/components/designSystem/Icons/Home/BellIcon";
import UserIcon from "@/components/designSystem/Icons/Home/UserIcon";
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
                        <BellIcon />
                    </NavButton>
                </li>
                <li>
                    <NavButton>
                        <UserIcon />
                    </NavButton>
                </li>
            </NavList>
        </Wrapper>
    )
}