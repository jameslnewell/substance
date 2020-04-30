import {combine} from './combine';
import {ThemeProps, DefaultTheme} from './types';

const props: ThemeProps<{}, DefaultTheme> = {theme: {} as any};

describe('combine', () => {
  test('returns undefined when no parameters are passed', () => {
    expect(combine(undefined)).toBeUndefined();
  });

  test('returns undefined when undefined is passed', () => {
    expect(combine(undefined)).toBeUndefined();
  });

  test('returns an object when an object is passed', () => {
    expect(combine({color: 'red'})).toEqual({color: 'red'});
  });

  test('returns an object when a function is passed', () => {
    expect(combine(() => ({color: 'red'}))?.(props)).toEqual({color: 'red'});
  });

  test('returns an object when an array is passed', () => {
    expect(combine([{color: 'red'}])?.(props)).toEqual({color: 'red'});
  });
});
