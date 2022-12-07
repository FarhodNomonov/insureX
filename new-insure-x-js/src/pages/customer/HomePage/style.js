import styled from "styled-components";

export const HomeContainer = styled.div`
  .client {
    overflow: hidden;
    .client_body {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .client_title {
        position: absolute;
        top: 46%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1d3557;
        width: 122px;
        height: 122px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 50%;
        border: 1px solid #1d3557;
        cursor: pointer;
        outline: none;
        transition: 300ms;
        &:active {
          transform: translate(-50%, -50%) scale(0.95);
        }
        p {
          font-style: normal;
          font-weight: 400;
          font-size: 28px;
          line-height: 30px;
          color: #ffffff;
        }
      }
    }
  }
  .flex_container {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background: none;
      border: 0;
      outline: none;
      cursor: pointer;
      transition: 300ms;
      &:active {
        transform: translateY(2px);
      }
      &.next_button {
        transform: rotate(180deg);
        &:active {
          transform: rotate(180deg) translateY(-2px);
        }
      }
    }
    .animation_svg_left {
      animation: slide_left 0.5s ease-in-out forwards alternate;
      @keyframes slide_left {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
    .animation_svg_right {
      animation: slide_right 0.5s ease-in-out forwards alternate;
      @keyframes slide_right {
        0% {
          transform: translateX(100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
`;
export const FooterQuestionBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  direction: ltr;
  margin: 0 25px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 3;
  svg {
    cursor: pointer;
  }
  button {
    margin-bottom: 15px;
  }
`;
export const Overlay = styled.div`
  position: fixed;
  background: #586c79a1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
`;
