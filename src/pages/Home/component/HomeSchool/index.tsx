// 스타일
import {Content, Row, Wrapper, Text, Button, Title, Divider} from "@/pages/Home/component/HomeSchool/styles.ts";
// 컴포넌트
import HomeIcon from "@/components/designSystem/Icons/HomeIcon.tsx";
import ArrowRightIcon from "@/components/designSystem/Icons/Home/ArrowRightIcon.tsx";
import UniversityIcon from "@/components/designSystem/Icons/Home/UniversityIcon.tsx";


export default function HomeSchool() {

    return (
        <Wrapper>
            <Content>
                <Row>
                    <HomeIcon/>
                    <Text>
                        집 위치
                    </Text>
                    <Button>
                        <ArrowRightIcon/>
                    </Button>
                </Row>
                <Title>
                    우리집
                </Title>
            </Content>
            <Divider/>
            <Content>
                <Row>
                    <UniversityIcon/>
                    <Text>
                        학교
                    </Text>
                </Row>
                <Title>
                    서울대학교
                </Title>
            </Content>
        </Wrapper>
    );
}