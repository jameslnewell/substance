import 'styled-components';
import {DefaultTheme as Theme} from '@substance/style/src/types';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
