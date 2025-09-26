import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root { color-scheme: dark light; }
  html, body, #__next { height: 100%; }
  body { margin: 0; background: #0b0f14; color: #e8edf2; }
  * { box-sizing: border-box; }
`;

const theme = {
  colors: {
    background: "#0b0f14",
    surface: "#121821",
    primary: "#4dabf7",
    text: "#e8edf2",
    muted: "#9aa7b2",
  },
  radii: { sm: "6px", md: "10px", lg: "16px" },
  shadow: { sm: "0 2px 10px rgba(0,0,0,.2)" },
} as const;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}