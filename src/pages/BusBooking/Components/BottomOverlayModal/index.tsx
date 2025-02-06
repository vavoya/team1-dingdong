import React from "react";

import { ModalContainer, Overlay } from "./styles";
import { createPortal } from "react-dom";
interface BottomOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomOverlayModal({
  isOpen,
  onClose,
  children,
}: BottomOverlayModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>,
    document.getElementById("root") as HTMLDivElement
  );
}
