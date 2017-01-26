// @flow

import compare from '../src/lib';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

const path1 = '__test__/__fixtures__/before.json';
const path2 = '__test__/__fixtures__/after.json';

test('gendiff', () => {
  expect(compare(path1, path2)).toBe(expected);
});
