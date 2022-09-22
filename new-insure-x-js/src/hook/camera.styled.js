import styled from "styled-components";

export const StyledCameraContainer = styled.div`
  position: ${(props) =>
    props.mode === "modal" ? "fixed" : "initial" || "relative"};
  top: ${(props) => (props.mode === "modal" ? "0" : "initial")};
  bottom: ${(props) => (props.mode === "modal" ? "0" : "initial")};
  left: ${(props) => (props.mode === "modal" ? "0" : "initial")};
  right: ${(props) => (props.mode === "modal" ? "0" : "initial")};
  backdrop-filter: ${(props) =>
    props.mode === "modal" ? "blur(5px)" : "initial"};
  z-index: ${(props) => (props.mode === "modal" ? "70" : "initial")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .back {
    position: relative;
    z-index: 2;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    cursor: pointer;
  }
  .video {
    position: relative;
    width: 80vw;
    height: 80vh;
    max-width: 600px;
    max-height: 600px;
    min-width: 310px;
    min-height: 410px;
    border: 1px solid #fff;
    border-radius: 5px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 10vh;
    margin-bottom: 20px;
    background: url(${"https://cdn-icons-png.flaticon.com/512/678/678523.png"});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #fff9;
    video,
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: rotateY(180deg);
    }
    canvas {
      display: none;
    }
  }
  .btn_camera {
    width: 80vw;
    max-width: 600px;
    min-width: 310px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    input,
    button {
      width: 100%;
      cursor: pointer;
      padding: 10px 0;
      &:first-child {
      }
    }
  }
`;
