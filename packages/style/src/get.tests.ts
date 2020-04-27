import {get} from './get';

const object = {
  id: 'abc-def',
  contact: {
    name: 'John Smith',
  },
  countries: [
    {
      name: 'Australia',
      states: [
        {
          name: 'New South Wales',
        },
      ],
    },
  ],
};

describe('get()', () => {
  test('returns undefined from depth 1', () => {
    expect(get('foobar', object)).toBeUndefined();
  });

  test('returns value from depth 1', () => {
    expect(get('id', object)).toEqual('abc-def');
  });

  test('returns undefined from depth 2', () => {
    expect(get('contact.bar', object)).toBeUndefined();
  });

  test('returns value from depth 2', () => {
    expect(get('contact.name', object)).toEqual('John Smith');
  });

  test('returns undefined from depth 3', () => {
    expect(get('countries.0.foobar', object)).toBeUndefined();
  });

  test('returns value from depth 3 in an array', () => {
    expect(get('countries.0.name', object)).toEqual('Australia');
  });
});
