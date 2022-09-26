import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import fontRegular from "../fonts/Assistant-Regular.ttf";

export const GlobalStyle = createGlobalStyle`
${reset}

@font-face {
  font-family: 'Assistant';
  src: url(${fontRegular}) format('truetype');
  font-display: swap;
}


* {
  box-sizing: border-box;
  font-family: 'Assistant', sans-serif;
}


*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #9eb4c1;

  &-thumb {
    background: hsl(215.2,50%,22.7%);
  }
}

html, body {
  position: relative;
  scroll-behavior: smooth;
}

body {
  font-size: 18px;
  background-position: 50% 50%;
  background-size: cover;
  direction: rtl;
  max-width: 100vw;
  overflow-x: hidden;
  font-family: 'Assistant', sans-serif;
  > iframe{ 
    display: none;
  }
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
  direction: ltr;
}
html, body, #root {
  position: relative;
  width: 100%;
  height:100%;
  -webkit-text-size-adjust: 100%;
}

#root {
  max-width: 1920px;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: scroll;
}
.h-100 {
  min-height: 100vh;
  &.flex__column__ {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }
}
textarea {
  min-height: 110px;
  max-height: 200px;
  resize: vertical;
  padding: 10px 0.8em;
  font-family: sans-serif;
}
.wrap {
  position: relative;
  width: 100%;
  width: 600px;
  max-width: calc(100vw - 20px);
  margin: 0 auto;

  &.contentWrap {
    width: 300px;
  }
  
}
.contentWrap {
  label {
    display:flex;
    gap: 10px;
  }
}
.red_icon {
  color: red;
  svg circle{
    
    fill: red;
  }
}
.green_icon{ 
  color: green;
  svg circle{
    fill: green;
  }
}
`;

//hsl used for more quick edits for darken/lighten variations of standart theme colors (hovers, transitions, etc)
export const theme = {
  colors: {
    primary: "hsl(215.2,50%,22.7%)",
    primaryDarken: "hsl(215.2,50%,15%)",
    secondary: "#9EB4C1",
    gray: "#999999",
  },
  fonts: {
    default: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif`,
    Assistant: "Assistant",
  },
};
