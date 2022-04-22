import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "../styles/theme.config";
import { useState, useEffect } from "react";
import Header from "../components/Header";
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (localStorage.getItem("style")) {
      const storagetheme = JSON.parse(localStorage.getItem("style"));
      setTheme(storagetheme.theme);
    }
  }, []);
  const isTrueSet = theme === "light";
  return (
    <>
      <ThemeProvider theme={isTrueSet ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
