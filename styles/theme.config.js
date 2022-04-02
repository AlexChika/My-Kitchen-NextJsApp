import { createGlobalStyle } from "styled-components";
export const Themes = {
  // priBg: "rgba(236, 236, 236, 0.5)",
  // text: "black",
  // navline: "black",
  // secBg: `rgba(255, 255, 255, 0.7
  //   )`,
};

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  word-wrap:break-word;
  font-family: 'Roboto', sans-serif;
}
html{
      -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}
/*
body {
  width:100vw;
   background: ${({ theme }) => theme.priBg};
   color: ${({ theme }) => theme.text};
  font-family: 'Roboto', sans-serif !important;
   font-weight: 300;
   font-style: normal;
   overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
   -webkit-transition: all 0.3s linear;
   transition: all 0.3s linear;
   -webkit-scroll-behavior: smooth;
   -moz-scroll-behavior: smooth;
    -ms-scroll-behavior: smooth;
    scroll-behavior: smooth;
    -webkit-scroll-behavior: smooth;
    -moz-scroll-behavior: smooth;
    -ms-scroll-behavior: smooth;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background-color:${({ theme }) => theme.priBg};
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color:rgb(205, 207, 236);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(150, 154, 214);
}
*/
`;
