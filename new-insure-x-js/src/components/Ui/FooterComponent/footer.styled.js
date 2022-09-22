import styled from "styled-components";

export const FooterWrapper = styled.footer`
  .footer {
    background: #ffffff;
    box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.15);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding-top: 10px;
    padding-bottom: 20px;
    .footer-content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 20px;

      @media screen and (max-width: 450px) {
        gap: 10px;
        justify-content: space-between;
        padding: 0 30px;
      }

      svg {
        width: 45px;
        height: 45px;
        margin: 5px;

        path {
          stroke: #a2a1a1;
          stroke-width: 1px;
        }
      }

      .active div {
        background: #1d3557;
        border-radius: 50%;

        svg {
          path {
            stroke: #ffffff;
          }
        }
      }
      a {
        text-decoration: none;
        max-width: 55px;
        color: #000000;
        div {
          width: 55px;
          height: 55px;
        }
        p {
          text-align: center;
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 18px;
          text-align: center;
          color: #000000;
          margin-top: 3px;
          word-wrap: break-word;
        }
      }
    }
  }
`;
