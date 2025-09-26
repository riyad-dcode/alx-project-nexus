import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      primary: string;
      text: string;
      muted: string;
    };
    radii: { sm: string; md: string; lg: string };
    shadow: { sm: string };
  }