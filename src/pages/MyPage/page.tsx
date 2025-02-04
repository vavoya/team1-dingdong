import PopHeader from "@/components/Headers/PopHeader";
import {
    ItemButton, ItemDivde, ItemTitle,
    ItemWrapper,
    Main,
    PageWrapper,
    UserEmail,
    UserInfo,
    UserName,
    UserProfile,
    UserProfileBox
} from "@/pages/MyPage/styles.ts";
import {useNavigate} from "react-router-dom";


export default function Page() {
    const navigate = useNavigate();


    return (
        <PageWrapper>
            <PopHeader text={"마이 페이지"} />
            <Main>
                <UserProfileBox>
                    <UserProfile>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <g clip-path="url(#clip0_1175_15874)">
                                <path d="M21.9996 25.3C25.6447 25.3 28.5996 22.3451 28.5996 18.7C28.5996 15.0549 25.6447 12.1 21.9996 12.1C18.3545 12.1 15.3996 15.0549 15.3996 18.7C15.3996 22.3451 18.3545 25.3 21.9996 25.3Z" fill="#C3C3CF"/>
                                <path d="M6.59961 45.1C6.59961 36.5948 13.4944 29.7 21.9996 29.7C30.5048 29.7 37.3996 36.5948 37.3996 45.1H6.59961Z" fill="#C3C3CF"/>
                            </g>
                            <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#DDDDE5"/>
                            <defs>
                                <clipPath id="clip0_1175_15874">
                                    <rect width="44" height="44" rx="22" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </UserProfile>
                    <UserInfo>
                        <UserName>
                            김지현
                        </UserName>
                        <UserEmail>
                            vavoya6324@gmail.com
                        </UserEmail>
                    </UserInfo>
                </UserProfileBox>
                <ul>
                    <Item text={'예매 내역'} onClick={() => navigate('/reservations')}/>
                    <Item text={'결제 수단 관리'}/>
                    <Item text={'시간표 관리'}/>
                    <ItemDivde />
                    <Item text={'비밀번호 재설정'}/>
                    <Item text={'알림 설정'}/>
                    <ItemDivde />
                    <Item text={'안내 사항'}/>
                    <Item text={'고객 센터'}/>
                    <Item text={'FAQ'}/>
                </ul>
            </Main>
        </PageWrapper>
    )
}


interface ItemProps {
    text: string;
    onClick?: () => void;
}
function Item({text, onClick = () => {}}: ItemProps) {

    return (
        <ItemWrapper>
            <ItemTitle>{text}</ItemTitle>
            <ItemButton onClick={onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.79289 5.79289C9.18342 5.40237 9.81658 5.40237 10.2071 5.79289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L10.2071 18.2071C9.81658 18.5976 9.18342 18.5976 8.79289 18.2071C8.40237 17.8166 8.40237 17.1834 8.79289 16.7929L13.5858 12L8.79289 7.20711C8.40237 6.81658 8.40237 6.18342 8.79289 5.79289Z" fill="#9292A0"/>
                </svg>
            </ItemButton>
        </ItemWrapper>
    )
}