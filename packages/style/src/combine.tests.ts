import {combine} from './combine';
import {
  PropsWithTheme,
  DefaultTheme,
  PropsConstraint,
  StyleObject,
  Style,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props: PropsWithTheme<{}, DefaultTheme> = {theme: {} as any};

function combineAndCallWithProps<Props extends PropsConstraint>(
  props: Props,
  ...args: Style<Props>[]
): StyleObject | undefined {
  const result = combine(...args);
  if (typeof result === 'function') {
    return result(props);
  }
  return result;
}

describe('combine()', () => {
  test('returns an empty object when no parameters are passed', () => {
    expect(combineAndCallWithProps(props)).toEqual({});
  });

  test('returns an empty object when undefined is passed', () => {
    expect(combineAndCallWithProps(props, undefined)).toEqual({});
  });

  test('returns an empty object when an empty array is passed', () => {
    expect(combineAndCallWithProps(props, [])).toEqual({});
  });

  test('returns an empty object when an empty function is passed', () => {
    expect(combineAndCallWithProps(props, () => undefined)).toEqual({});
    expect(combineAndCallWithProps(props, () => [])).toEqual({});
  });

  test('returns an object when an object is passed', () => {
    expect(combineAndCallWithProps(props, {color: 'red'})).toEqual({
      color: 'red',
    });
  });

  test('returns an object when a function is passed', () => {
    expect(combineAndCallWithProps(props, () => ({color: 'red'}))).toEqual({
      color: 'red',
    });
  });

  test('returns an object when an array is passed', () => {
    expect(combineAndCallWithProps(props, [{color: 'red'}])).toEqual({
      color: 'red',
    });
  });

  test('returns an object when an array is passed with a nested object, function and array', () => {
    expect(
      combineAndCallWithProps(props, [
        undefined,
        {color: 'red'},
        () => ({backgroundColor: 'green'}),
        [{}],
      ]),
    ).toEqual({
      color: 'red',
      backgroundColor: 'green',
    });
  });

  test('combines discrete properties on an object', () => {
    expect(
      combineAndCallWithProps(
        props,
        {color: 'red'},
        {backgroundColor: 'green'},
      ),
    ).toEqual({
      color: 'red',
      backgroundColor: 'green',
    });
  });

  test('replaces common properties on an object', () => {
    expect(
      combineAndCallWithProps(props, {color: 'red'}, {color: 'green'}),
    ).toEqual({
      color: 'green',
    });
  });

  test.only('merges common properties on an object', () => {
    expect(
      combineAndCallWithProps(
        props,
        {':hover': {color: 'red', backgroundColor: 'orange'}},
        {':hover': {color: 'green', borderColor: 'purple'}},
      ),
    ).toEqual({
      ':hover': {
        color: 'green',
        backgroundColor: 'orange',
        borderColor: 'purple',
      },
    });
  });

  // TODO: test when conflicts occur while merging objects
});
