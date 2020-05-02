import {combine} from './combine';
import {
  PropsWithTheme,
  DefaultTheme,
  FlatStyle,
  PropsConstraint,
  StyleObject,
} from './types';

const props: PropsWithTheme<{}, DefaultTheme> = {theme: {} as any};

const callIfCallable = <Props extends PropsConstraint>(
  style: FlatStyle<Props>,
  props: Props,
): StyleObject | undefined => {
  if (typeof style === 'function') {
    return style(props);
  }
  return style;
};

describe('combine', () => {
  test('returns undefined when no parameters are passed', () => {
    expect(combine()).toBeUndefined();
  });

  test('returns undefined when undefined is passed', () => {
    expect(combine(undefined)).toBeUndefined();
  });

  test('returns undefined when an empty array is passed', () => {
    expect(combine(undefined)).toBeUndefined();
  });

  test('returns an object when an object is passed', () => {
    expect(combine({color: 'red'})).toEqual({color: 'red'});
  });

  test('returns an object when a function is passed', () => {
    expect(
      callIfCallable(
        combine(() => ({color: 'red'})),
        props,
      ),
    ).toEqual({color: 'red'});
  });

  test('returns an object when an array is passed', () => {
    expect(callIfCallable(combine([{color: 'red'}]), props)).toEqual({
      color: 'red',
    });
  });

  test('returns an object when an array is passed with nested object, function and array', () => {
    expect(
      callIfCallable(
        combine([{color: 'red'}, () => ({backgroundColor: 'green'}), [{}]]),
        props,
      ),
    ).toEqual({
      color: 'red',
      backgroundColor: 'green',
    });
  });

  // TODO: test when conflicts occur while merging objects
});
