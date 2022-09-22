import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  display: inline-block;
  opacity: ${({ disabled }) => (disabled === true ? 0.5 : 1)};

  button {
    font-weight: 500;
    font-size: 18px;
    line-height: 120%;
    background-color: ${({ variant, theme }) =>
      variant === "ghost" ? "transparent !important" : theme?.colors?.primary};
    color: ${({ variant, theme }) =>
      variant === "ghost" ? theme?.colors?.primary : "#fff"};
    text-decoration: ${({ variant }) =>
      variant === "ghost" ? "underline" : "none"};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    height: 40px;
    padding: ${({ variant }) => (variant === "ghost" ? 0 : "0 2em")};
    min-width: ${({ variant }) => (variant === "ghost" ? "auto" : "197px")};
    border: 0;
    text-align: center;
    cursor: ${({ disabled }) => (disabled === true ? "no-drop" : "pointer")};
    user-select: none;
    transition: all 200ms;
    font-weight: ${({ variant }) => (variant === "ghost" ? 100 : 200)};

    &:hover {
      background-color: ${({ theme }) => theme?.colors?.primaryDarken};
      text-decoration: none;
    }

    &:active {
      transform: translate(1px, 1px);
    }
  }
`;
