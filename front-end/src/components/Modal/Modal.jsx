import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
// import Lottie from "lottie-react";
// import farmerAnimation from "./farmer.json"; 

// Styled Components
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled(motion.div)`
  /* background: #fff; */
  width: 65%;
  padding: 0px;
  border-radius: 12px;
  /* box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3); */
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 0px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  z-index:9;
  &:focus{
    outline: unset;
  }
  &:focus-visible{
    outline: unset;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 0;
  color: #2c3e50;
`;

const ContentWrapper = styled.div`
  /* color: #555; */
  margin-bottom: 0px;
`;

const Modal = ({ title, content, onClose, isOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.02 }}
          onClick={onClose}
        >
          <ModalWrapper
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.02, opacity: 0 }}
            transition={{ duration: 0.02, ease: "linear" }}
          >
            <CloseButton onClick={onClose}>
              &times;
            </CloseButton>
            
            <TitleWrapper>
              {typeof title === 'string' ? <h2>{title}</h2> : title}
            </TitleWrapper>
            
            {/* <Lottie animationData={farmerAnimation} style={{ height: 150 }} /> */}
            
            <ContentWrapper>
              {typeof content === 'string' ? <p>{content}</p> : content}
            </ContentWrapper>
          </ModalWrapper>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;