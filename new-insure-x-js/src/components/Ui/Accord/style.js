import styled from "styled-components";

export const AccordStyled = styled.div`
  .accord {
    max-width: 500px;
    min-width: 300px;
    width: 80vw;
    margin: 0 auto;
    margin-top: 20px;
    .accord__opener {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      justify-content: space-between;
      background: #1d3557;
      border-radius: 11px;
      transition: 300ms ease;
      height: 70px;

      &:hover {
        background: #284a83;
        cursor: pointer;
      }

      .accord__opener__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row-reverse;
        h3 {
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
          margin-right: 30px;
        }
      }
    }
    .accord__list {
      display: flex;
      align-items: center;
      background: #e5e5e5;
      transition: 300ms ease;
      border-radius: 11px;
      flex-direction: row-reverse;
      pointer-events: none;
      cursor: pointer;
      text-decoration: none;
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      height: 0;
      border: 0px solid rgb(158, 180, 193);

      .accord_body_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 50px;

        .accord_body_item__title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          h3 {
            font-size: 1.2rem;
            font-weight: bold;
            color: #000;
            margin-right: 30px;
          }
        }
      }
    }
    &.active {
      .accord__list {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: all;
        margin-top: 20px;
        height: auto;
        padding: 5px 20px;
        border-width: 2px;
      }
    }
  }
`;
