// @flow

import compare from '../src/lib';

test('JSON #1', () => {
  const expected = '{' +
    '\n    host: hexlet.io' +
    '\n  + timeout: 20' +
    '\n  - timeout: 50' +
    '\n  - proxy: 123.234.53.22' +
    '\n  + verbose: true' +
    '\n}';

  const path1 = '__test__/__fixtures__/before.json';
  const path2 = '__test__/__fixtures__/after.json';
  expect(compare(path1, path2)).toBe(expected);
});

test('YAML #!', () => {
  const expected = '{' +
    '\n    host: hexlet.io' +
    '\n  + timeout: 20' +
    '\n  - timeout: 50' +
    '\n  - proxy: 123.234.53.22' +
    '\n  + verbose: true' +
    '\n}';

  const path1 = '__test__/__fixtures__/before.yaml';
  const path2 = '__test__/__fixtures__/after.yaml';
  expect(compare(path1, path2)).toBe(expected);
});
