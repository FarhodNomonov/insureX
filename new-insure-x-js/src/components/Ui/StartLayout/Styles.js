import styled from "styled-components";

export const Box = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  min-height: 100%;
  background: linear-gradient(167.98deg, #9eb4c1 0.65%, #e5e5e5 100%);
`;

export const LogoArea = styled.div`
  position: relative;
  text-align: center;
  padding: 3.5vmax;
  background-color: #fff;
  margin-bottom: 7vmax;

  @media (max-width: 768px) {
    padding: ${7 / 3}vmax;
    padding-bottom: 7vmax;
  }
`;

export const Logo = styled.svg`
  position: relative;
  height: 112px;
  width: auto;
  z-index: 3;
`;

export const SubText = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: ${7 * 1.5}vmax;
  min-height: 100px;
  transform-origin: 0 100%;
  z-index: 1;
  clip-path: polygon(0 0, 0 100%, 100% 50%);
  background-color: #1d3557;
  transform: translateY(50%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    width: 100%;
    text-align: left;
    font-size: 24px;
    padding: 0 20px;

    small {
      font-size: 36px;
      display: block;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      font-size: 20px;
      small {
        font-size: 30px;
      }
    }
  }
`;
