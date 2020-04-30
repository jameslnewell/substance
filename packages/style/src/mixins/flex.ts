import {Properties} from 'csstype';
import {createMixin, map} from '@substance/style';

// FIXME: improve typings
type AlignItems = Required<Properties<string | number>>['alignItems'];

export const alignItems = createMixin({
  map,
  properties: ['alignItems'],
  transform: (value: AlignItems) => value,
});
