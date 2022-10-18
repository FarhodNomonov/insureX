import styled from "styled-components";

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0px;
  margin: 20px auto;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchWrapper = styled.label`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  width: 50%;
  min-width: 300px;
  margin-bottom: 40px;

  input {
    border: none;
    outline: none;
    flex: 1;
    padding: 0 10px;
    font-size: 22px;
    color: #000;
    width: 80%;

    &:focus + svg path {
      stroke: #000;
    }
  }
`;

export const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 300px;
  margin: 0 auto;
`;

export const MessageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 0;
  border-top: 2px dashed hsl(215.2, 50%, 22.7%);
`;

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 40px;

  .text__message {
    font-weight: 600;
    font-size: 18px;
    text-align: right;
    color: #000000;
    padding-right: 10px;
  }
  p.text__message {
    white-space: pre-wrap;
    background-color: white;
    -webkit-user-modify: read-only;
    word-wrap: break-word;
  }
`;
