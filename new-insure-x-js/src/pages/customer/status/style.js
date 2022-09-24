import styled from "styled-components";

export const StatusContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  direction: ltr;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`;

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 10px;
  &.active {
    .pagination__icon__ {
      .icon__ {
        background-color: #1d3557;
      }
      svg {
        path {
          fill: #1d3557;
        }
      }
    }
    p {
      color: #1d3557;
      font-weight: 600;
    }
  }
  &:last-child {
    svg {
      display: none;
    }
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    text-align: right;
  }
  .pagination__icon__ {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon__ {
      width: 20px;
      height: 20px;
      background-color: #9eb4c1;
      border-radius: 50%;
    }
    svg {
      width: 20px;
      height: 20px;
      margin-top: 3px;
      transform: rotate(-90deg);
      path {
        fill: #9eb4c1;
      }
    }
  }
`;
export const FlexBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  max-width: 400px;
  margin: 20px auto;
  user-select: none;
  padding-top: 20px;
  border-top: 2px dashed #9eb4c1;
  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
  .next {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      margin-right: 5px;
      font-weight: 400;
      color: #1d3557;
      line-height: 0;
    }
  }
  .back {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      margin-left: 5px;
      color: #1d3557;
      line-height: 0;
    }
  }
`;
