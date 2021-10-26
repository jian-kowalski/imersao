import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import type { AppContext, AppProps } from "next/app";
import { useEffect } from "react";
import { TenantProvider } from "../components/TenantProvider";
import "../styles/globals.css";
import { KEYCLOAK_PUBLIC_CONFIG } from "../utils/auth";
import { parseCookies } from "../utils/cookies";
import theme from "../utils/theme";

function MyApp({ Component, pageProps, cookies }: AppProps & { cookies: any }) {
  useEffect(() => {
    const jssStyless = document.querySelector("#jss-server-side");
    jssStyless?.parentElement?.removeChild(jssStyless);
  }, []);
  return (
    <SSRKeycloakProvider
      keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
      persistor={SSRCookies(cookies)}
      initOptions={{
        onload: "check-sso",
        silientChecksoRedirectUri:
          typeof window != "undefined"
            ? `${window.location.origin}/salient-check-sso.html`
            : null,
      }}
    >
      <TenantProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </TenantProvider>
    </SSRKeycloakProvider>
  );
}

MyApp.getIntialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};

export default MyApp;
