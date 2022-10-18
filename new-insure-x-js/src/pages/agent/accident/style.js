import styled from "styled-components";

export const Paragraf = styled.p`
  font-weight: 600;
  font-size: 18px;
  text-align: right;
  color: #1d3557;
`;

export const AccidentForm = styled.div`
  .step_form_container {
    margin: 20px 0;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn_remove {
      padding: 5px;
      border: 1px solid red;
      color: red;
      font-size: 14px;
      cursor: pointer;
      background: transparent;
      border-radius: 5px;
    }
    .mt-10 {
      margin-top: 10px !important;
    }
    .fw-500 {
      font-weight: 500 !important;
    }
    .fs-16 {
      font-size: 16px !important;
    }
    .step_form_paginations {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .step_form_pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 20px;
        border-radius: 20px;
        background: rgba(158, 180, 193, 0.54);
        color: #000;
        font-size: 20px;
        position: relative;
        margin: 0 5px;
        cursor: pointer;
        transition: 300ms ease-in-out;

        @media screen and (max-width: 1024px) {
          width: 50px;
        }

        @media screen and (max-width: 768px) {
          width: 20px;
        }

        &:hover {
          background: rgba(158, 180, 193, 0.87);
        }

        &::after {
          content: "";
          position: absolute;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          background: transparent;
          border-radius: 20px;
          top: 50%;
          left: 50%;
          transition: 300ms ease-in-out;
          transform: translate(-50%, -50%);
        }

        &.active {
          &::after {
            background: #1d3557;
          }
        }
      }
      .pagination__icon__ {
        &:hover {
          cursor: pointer;
          animation: ai-pagination-icon-hover 1s ease-in-out infinite;

          @keyframes ai-pagination-icon-hover {
            0% {
              transform: translateX(0);
            }
            30% {
              transform: translateX(5px);
            }
            60% {
              transform: translateX(-5px);
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      }
    }
    .step_form_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .step_form_content__header {
        margin: 10px 0;
        .step_form_content__header__title {
          font-weight: 700;
          font-size: 24px;
          line-height: 50px;
          text-align: center;
          color: #1d3557;
        }
      }
    }
    .radio_button_group {
      display: flex;
      flex-direction: column;
      margin: 20px 0;
      .radio_button_group_title {
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
        text-align: right;
        color: #1d3557;
      }
      .radio_button_group_container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 10px 0;
        gap: 40px;

        label {
          display: flex;
          align-items: center;
          justify-content: center;

          p {
            margin: 0 5px;
            font-weight: 500;
            font-size: 16px;
            line-height: 16px;
            text-align: left;
            color: #1d3557;
          }
        }
      }
    }
    .step_form_content__footer__button {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      margin-top: 20px;

      .back__step__ {
        margin-top: 10px;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        text-decoration-line: underline;
        color: #1d3557;
        cursor: pointer;
      }
    }

    .impact_area_chart {
      div[role="presentation"] {
        border: none !important;
      }
    }
    .impact_area_chart_title {
      font-weight: 600;
      font-size: 18px;
      text-align: right;
      color: #1d3557;
    }
    .drawer_opener_button_ {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      img {
        width: 280px;
        height: 260px;
      }
    }
    .upload_files_container {
      .upload_files_container_item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        cursor: pointer;

        p {
          font-weight: 600;
          font-size: 18px;
          line-height: 18px;
          text-align: right;
          color: #1d3557;
        }
        .icon__upload__ {
          background: #9eb4c1;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .witnesses_container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px 0;

      p.witnesses_title {
        font-weight: 600;
        font-size: 18px;
        text-align: right;
        color: #1d3557;
        margin-bottom: 20px;
      }
    }
    .policyholder_container {
      max-width: 400px;

      p {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        text-align: justify;
        color: #1d3557;
      }
    }
  }
  .event_received_container {
    p {
      font-weight: 400;
      font-size: 18px;
      color: #000000;
      line-height: 20px;
      text-align: center;
      margin: 10px 0;
    }
    button {
      font-weight: 600;
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      cursor: pointer;
      margin: 10px 0;
      min-width: 250px;
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    display: flex;
    justify-content: center;
    padding-top: 30px;
    .modal_body_title {
      text-align: center;
    }
  }
  .form_before {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
    width: 400px;
    @media screen and (max-width: 768px) {
      width: 300px;
    }
    > h1 {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 18px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #1d3557;
      margin-bottom: 16px;
    }
    label {
      width: 396px;
      min-width: none;
      margin: 0;
      height: 60px;
      align-items: center;
      @media screen and (max-width: 768px) {
        width: 100%;
        input {
          width: 80%;
        }
      }
    }
    .list_search_result {
      width: 100%;
    }
    .list_search_result__item {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px dashed #9eb4c1;
      border-bottom: 1px dashed #9eb4c1;
      width: 396px;
      cursor: pointer;
      transition: 0.3s ease;
      &:hover,
      &.active {
        background: rgba(158, 180, 193, 0.3);
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      p {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 48px;
        text-align: right;
        color: #000000;
      }
      svg {
        margin-left: 18px;
      }
    }
    .list_btn_bottom {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-top: 10px;
      button {
        min-width: 220px;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #ffffff;
        margin: 10px 0;
        background: #1d3557;
        margin: 5px auto;
      }
    }
    .form_before__content {
      a {
        min-width: 300px;
        display: flex;
        align-items: flex-start;
        flex-direction: row-reverse;
        justify-content: flex-end;
        padding: 30px 20px;
        text-decoration: none;
        margin-bottom: 12px;
        background: #1d3557;
        border-radius: 12px;
        .phone_title {
          margin-right: 10px;
          h1 {
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 26px;
            color: #ffffff;
            margin-bottom: 5px;
          }
          p {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 26px;
            color: #ffffff;
          }
        }
      }
      p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 16px;
        text-align: center;
        color: #1d3557;
      }
      .form_before__content__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        button {
          min-width: 300px;
          margin-top: 20px;
          margin-bottom: 10px;
        }
      }
    }
    .list_space_bettween {
      .list_search_result__item {
        justify-content: space-between;
        .list_search_result__item_in {
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        }
        .list_search_svg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1d3557;
          padding: 5px;
          margin: 5px 0;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .form_before_main {
      display: flex;
      align-items: center;
      margin-bottom: 45px;
      p {
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 18px;
        color: #1d3557;
      }
      svg {
        margin-right: 10px;
      }
    }
    .form_before_list {
      > p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 16px;
        text-align: center;
        color: #1d3557;
        margin-bottom: 15px;
      }
      .form_before_list__item {
        min-width: 300px;
        background: rgba(158, 180, 193, 0.15);
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        padding: 10px 20px;
        margin-bottom: 22px;
        p {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 16px;
          color: #1d3557;
        }
      }
      .form_before_list__item_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 70px;
      }
    }
    .form_before_list_events {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 20px;
        text-align: center;
        color: #1d3557;
      }
      button {
        margin-top: 10px;
      }
    }
    .modal_body_title {
      text-align: center;
      margin-bottom: 30px;
      color: #1d3557;
      text-align: center;
      font-style: normal;
      font-weight: 800;
      font-size: 28px;
      line-height: 28px;
    }
    .modal_body_title_main {
      text-align: center;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 10px;
    }
    .modal_body_title_main_title {
      text-align: center;
      p {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 30px;
        color: #1d3557;
      }
    }
  }
`;
