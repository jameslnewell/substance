import {MediaQueries} from './types';

export type DefaultMedia = 'mobile' | 'tablet' | 'desktop';

export const defaultMediaQueries: MediaQueries<DefaultMedia> = {
  mobile: '(min-width: 0em)',
  tablet: '(min-width: 46.0625em)', // 737px
  desktop: '(min-width: 64.0625em)', // 1025px
};
