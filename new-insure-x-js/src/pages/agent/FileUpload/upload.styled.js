import styled from "styled-components";
export const FileUploadContainer = styled.div`
  .btn_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      input {
        display: none;
      }
      div {
        min-width: 280px;
        padding: 14px 0;
        margin-bottom: 20px;
        background: #1d3557;
        border-radius: 11px;
        cursor: pointer;
        display: grid;
        grid-template-columns: 10% 70%;
        place-content: center;
        gap: 20px;
        svg {
          width: 30px;
          height: 30px;
        }
        p {
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 30px;
          text-align: right;
          color: #ffffff;
        }
      }
    }
  }
  .btn_submit {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      max-width: 100px;
    }
  }
`;
export const EventList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
  cursor: pointer;
  margin-bottom: 10px;
  max-width: 280px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  a {
    text-decoration: none;
  }
  &.active,
  &:hover {
    background-color: #f5f5f5;
  }
  img,
  svg {
    width: 25px;
    height: 25px;
    margin-left: 10px;
  }
  .dots_ {
    width: 30px;
    height: 25px;
    cursor: pointer;
  }
`;
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal_ {
    width: 500px;
    height: 500px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
