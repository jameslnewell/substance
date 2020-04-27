import {MediaMap} from './types';

export type DefaultMediaName = 'mobile' | 'tablet' | 'desktop';

export const defaultMedia: MediaMap<DefaultMediaName> = {
  mobile: '(min-width: 0em)',
  tablet: '(min-width: 46.0625em)', // 737px
  desktop: '(min-width: 64.0625em)', // 1025px
};
