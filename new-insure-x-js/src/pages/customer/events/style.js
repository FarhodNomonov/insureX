import styled from "styled-components";

export const MyDocsWrapper = styled.div`
  .my_docs_body {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: calc(100% - 200px);
    padding: 10px 0;
    border-bottom: 2px dashed #e6e6e6;
    margin-top: 20px;

    @media screen and (max-width: 768px) {
      width: calc(100% - 40px);
    }
    @media screen and (max-width: 480px) {
      width: calc(100%);
    }
    .my_docs_body_title {
      margin-top: 40px;
      background: #9eb4c1;
      padding: 7px 30px;
      border-radius: 20px 0px 0px 20px;
      @media screen and (max-width: 480px) {
        max-width: 80%;
      }
      h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        color: #ffffff;
        text-align: right;
        @media screen and (max-width: 480px) {
          font-weight: 500;
        }
      }
    }
    .my_docs_body_content {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 20px;
      justify-content: space-between;
      @media screen and (max-width: 480px) {
        padding: 0 10px;
      }
      .my_docs_body_content_icon {
        line-height: 36px;
        cursor: pointer;
      }
      .my_docs_body_content_text {
        p {
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 36px;
          text-align: right;
          color: #1d3557;
        }
      }
      .my_docs_content_text_left {
        p {
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 36px;
          text-align: right;
          color: #5c6a73;
        }
      }
    }
    .my_docs_body_btn {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      @media screen and (max-width: 480px) {
        padding: 0 10px;
      }
    }
  }
`;
