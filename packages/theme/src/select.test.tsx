import {select} from './select';

describe('select()', () => {

  it('should return a top-level property on the theme', () => {
    expect(select('name')({theme: {name: '@substance'}})).toEqual('@substance');
  });

  it('should return the default value when a top-level property does not exist on the theme', () => {
    expect(select('name', '@substance')({})).toEqual('@substance');
  });

  it('should return a second-level property on the theme', () => {
    expect(select('colors.primary')({theme: {colors: {primary: 'red'}}})).toEqual('red');
  });

  it('should return the default value when a second-level property does not exist on the theme', () => {
    expect(select('colors.primary', 'green')({})).toEqual('green');
    expect(select('colors.primary', 'green')({theme: {colors: {}}})).toEqual('green');
  });

  it('should return a third-level property on the theme', () => {
    expect(select('colors.shades.light')({theme: {colors: {shades: {light: '#CCC'}}}})).toEqual('#CCC');
  });

  it('should return the default value when a third-level property does not exist on the theme', () => {
    expect(select('colors.shades.light', 'green')({})).toEqual('green');
    expect(select('colors.shades.light', 'green')({theme: {colors: {}}})).toEqual('green');
    expect(select('colors.shades.light', 'green')({theme: {colors: {shades: {}}}})).toEqual('green');
  });

});
