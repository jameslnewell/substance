import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      sm: number,
      md: number,
      lg: number
    },
    colors: {
      red: 'pink',
      green: 'lime',
      blue: 'skyblue'
    }
  }
}
