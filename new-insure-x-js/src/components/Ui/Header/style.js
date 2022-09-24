import styled from "styled-components";

export const HeaderStyled = styled.div`
  .header__top__bar {
    background: #1d3557;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-end;
    padding-top: 0px;

    .header__top__bar__logo {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      position: relative;
      top: 55px;

      svg {
        width: 80px;
        height: 80px;
      }

      p {
        color: #ffffff;
        position: relative;
        top: -10px;
      }
    }
    .header__top__bar__menu {
      display: flex;
      flex-direction: column-reverse;
      gap: 5px;
      cursor: pointer;
      position: relative;
      background: transparent;
      border: none;
      &:focus {
        .popup {
          display: block;
        }
      }
      .popup {
        position: absolute;
        top: 25px;
        right: 30px;
        z-index: 9999;
        padding: 10px;
        border-radius: 5px;
        background: #fff;
        -webkit-box-shadow: 1px 4px 8px 5px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 1px 4px 8px 5px rgba(34, 60, 80, 0.2);
        box-shadow: 1px 4px 8px 5px rgba(34, 60, 80, 0.2);
        display: none;
        .popup_title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
          padding: 2px 5px;
          border-radius: 4px;
          h1 {
            font-size: 18px;
            color: #495057;
            border-radius: 4px;
            font-weight: 500;
            width: max-content;
          }
        }
        .poput_log_out {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-right: 2px;
          padding: 2px 5px;
          border-radius: 4px;
          transition: 300ms ease;
          &:hover {
            background: aliceblue;
          }
          p {
            font-size: 16px;
            color: #495057;
            border-radius: 4px;
            font-weight: 500;
          }
        }
      }
    }
  }
  .header__bottom__bar {
    background: #ffffff;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 20px 20px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-end;

    .header__bottom__bar__icon {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      cursor: pointer;
    }

    .header__bottom__bar__text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      p {
        color: #1d3557;
        position: relative;
        left: -100px;

        @media screen and (max-width: 768px) {
          left: -50px;
          max-width: 300px;
          text-overflow: ellipsis;
          white-space: pre-wrap;
        }

        &:after {
          content: "";
          position: absolute;
          left: calc(100% + 10px);
          width: 300px;
          top: 50%;
          height: 100%;
          background: #9eb4c1;
          border-radius: 6px 0px 0px 6px;
          transform: translateY(-50%);

          @media screen and (max-width: 768px) {
            width: 100px;
          }
        }
        &:nth-child(2) {
          font-weight: 700;
          font-size: 22px;
          text-align: end;
          color: #1d3557;
          direction: ltr;

          @media screen and (max-width: 768px) {
            font-size: 16px;
          }
        }
      }
    }
  }
`;
