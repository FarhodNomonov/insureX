import styled from "styled-components";

export const HomeContainer = styled.div`
  .client {
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
      .anchor__card__cont {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        .anchor__card__ {
          cursor: pointer;
          background: #1d3557;
          padding: 24px 10px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #ffffff;
          gap: 20px;
          min-height: 205px;
          transition: 300ms;
          text-decoration: none;
          &:hover {
            transform: translateY(-5px);
          }

          .anchor__card__icon {
            width: 50px;
            height: 50px;

            svg {
              width: 100%;
              height: 100%;
            }
          }

          .anchor__card__text {
            h1 {
              font-weight: 700;
              font-size: 24px;
              line-height: 24px;
            }
            p {
              font-weight: 400;
              font-size: 14px;
              line-height: 18px;
              margin-top: 10px;
            }
          }
        }
        .logo__center__ {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px solid #1d3557;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          cursor: pointer;
          outline: none;
          transition: 300ms;
          &:active {
            transform: translate(-50%, -50%) scale(0.95);
          }
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;
