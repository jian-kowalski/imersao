import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useEffect } from "react";
import "../styles/globals.css";
import theme from "../utils/theme";

function MyApp({ Component, pageProps }) {
  useEffect(() => {

  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
