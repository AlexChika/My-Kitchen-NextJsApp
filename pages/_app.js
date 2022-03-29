import { ThemeProvider } from "styled-components";
import { GlobalStyles, Themes } from "../styles/theme.config";
import { useState, useEffect } from "react";
import Header from "../components/Header";
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      const storagetheme = localStorage.getItem("theme");
      setTheme(storagetheme);
    }
  });
  const isTrueSet = theme === "light";
  return (
    <>
      <ThemeProvider theme={Themes}>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
