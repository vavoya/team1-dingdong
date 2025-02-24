import React, { ReactNode, useEffect, useState } from "react";

import styled from "styled-components";
import LoadingSpinner from "../designSystem/Icons/LoadingSpinner";

interface PullToRefreshProps {
  el: React.RefObject<HTMLDivElement>;
  children: ReactNode;
}

const isIOS = /iP(hone|od|ad)/.test(window.navigator.userAgent);
const isPWA = window.matchMedia("(display-mode: standalone)").matches;

// 새로고침을 위함( ios PWA 에서의 스크롤을 길게 당겼을 때, 새로고침 기능을 넣기 위함
export const PullToRefreshContainer: React.FC<PullToRefreshProps> = ({
  el,
  children,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    if (!isIOS || !isPWA) return; // iOS PWA가 아닐 때는 이벤트 등록 안 함
    function handleTouchStart(event: TouchEvent) {
      setStartY(event.touches[0].clientY);
    }

    function handleTouchMove(event: TouchEvent) {
      if (!el.current) return;
      const moveY = event.touches[0].clientY;
      const pullDistance = moveY - startY;

      if (pullDistance > 0) {
        event.preventDefault();

        if (pullDistance > 80) {
          el.current.style.transform = "translateY(40px)";
          el.current.style.transition = "0.3s";
          setRefreshing(true);
        }
      }
    }

    function handleTouchEnd() {
      if (refreshing) {
        window.location.reload(); // 새로고침 실행

        setTimeout(() => {
          setRefreshing(false);
          if (el.current) {
            el.current.style.transform = "translateY(0)";
          }
        }, 1000);
      }
    }

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [refreshing, startY, el]);

  return (
    <Container>
      <Loader>{refreshing && <LoadingSpinner />}</Loader>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Loader = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
`;
