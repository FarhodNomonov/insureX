import styled from "styled-components";

export const EventDocsMain = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

export const EventDocsStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 60px;
  max-width: 600px;
  min-height: 400px;
  max-height: 50vh;
  overflow-y: auto;
  border: 1px solid #e6e6e6;
  padding: 10px;
  border-radius: 2px;
  direction: ltr;
  position: relative;
  &::-webkit-scrollbar {
    width: 0.5em;
    background-color: #e6e6e6;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
  }
`;

export const EventDocsContainer = styled.div`
  display: grid;
  width: 100%;
  padding-bottom: 50px;
  ${({ theme }) =>
    theme === true &&
    `
    grid-template-columns: repeat(2,1fr);`}
`;

export const EventList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 5px;
  a {
    text-decoration: none;
  }
  &.active,
  &:hover {
    background-color: #f5f5f5;
  }
  svg,
  img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }

  .dots_ {
    width: 30px;
    height: 25px;
    cursor: pointer;
  }
`;
export const EventListInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  gap: 5px;
`;
export const EventListTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #3f3f3f;
`;
export const EventListDate = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #000;
`;
export const EventAdder = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 15px;
  background-color: #c3e7ff;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 33;
  ${(props) =>
    props.theme === true &&
    `
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
    background-color: #c3e7ff;
    width: 100%;
    height: 100%;
    z-index: 1;
    svg {
      width: 30px;
      height: 30px;
    }
   }`}

  &:hover {
    background-color: #a3d6ff;
  }
  &:active {
    background-color: #8acdff;
  }
  svg {
    transform: rotate(45deg);
  }
`;

export const SortableButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  position: absolute;
  bottom: calc(100% - 10px);
  left: 0;
  background-color: #c3e7ff;
  justify-content: space-between;
  z-index: 2;
  border-radius: 5px 5px 0 0;
  direction: ltr;
  user-select: none;
  .back_speace,
  .speace {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;
    border-radius: 2px;
    &:hover {
      background-color: #a3d6ff;
    }
    &:active {
      background-color: #8acdff;
    }
    p {
      color: #3f3f3f;
      font-size: 16px;
      margin-left: 5px;
      font-weight: 600;
    }
    img {
      width: 30px;
      height: 30px;
    }
    svg {
      transform: rotate(90deg);
      fill: #3f3f3f;
    }
  }
  .back_speace {
    svg {
      transform: rotate(0deg);
    }
  }
  .search_bar {
    display: flex;
    border: 1px solid #50627c;
    padding: 5px;
    font-size: 16px;
    background-color: #fff;
    outline: none;
    height: auto;
    box-shadow: none;
    color: #50627c;
    align-items: center;
    margin: 0 10px;
    .search_input {
      border: none;
      padding: 0px;
      font-size: 16px;
      outline: none;
      height: auto;
      box-shadow: none;
      color: #50627c;
      border-radius: 0;
    }
    svg {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
  }
  .between {
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;
    border-radius: 2px;
    &:hover {
      background-color: #a3d6ff;
    }
    &:active {
      background-color: #8acdff;
    }
  }
`;
export const FileNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
  background: #dbf0ff;
  border-radius: 2px;
  flex-direction: column;
  p {
    font-size: 18px;
    font-weight: bold;
    color: #3f3f3f;
    margin-top: 20px;
    padding: 0 20px;
    text-align: center;
  }
`;
export const NumberList = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;
