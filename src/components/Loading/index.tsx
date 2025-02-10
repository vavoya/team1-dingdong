import Lottie from 'react-lottie';
import animationData from '@/assets/lottie/busLoadingAnimation.json'
import {Backdrop, LoadingText, Modal} from "@/components/Loading/styles.ts";
import {useEffect} from "react";
import {createPortal} from "react-dom";



interface LoadingModalProps {
    text: string;
}
export default function LoadingModal({text}: LoadingModalProps) {

    useEffect(() => {
        // 컴포넌트 마운트 시 스크롤을 막음
        document.body.style.overflow = 'hidden';

        // 컴포넌트 언마운트 시 스크롤을 복구
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);



    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return  createPortal(
        <Backdrop>
            <Modal>
                <Lottie width={140} height={105}
                        options={defaultOptions}/>
                <LoadingText>
                    {text}
                </LoadingText>
            </Modal>
        </Backdrop>,
        document.body
    )
}
