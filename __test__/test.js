// @flow

import compare from '../src/lib';

test('Pretty JSON', () => {
  const expected = '{' +
    '\n    common: {' +
      '\n        setting1: Value 1' +
      '\n      - setting2: 200' +
      '\n        setting3: true' +
      '\n      - setting6: {' +
        '\n            key: value' +
        '\n        }' +
      '\n      + setting4: blah blah' +
      '\n      + setting5: {' +
        '\n            key5: value5' +
        '\n        }' +
    '\n    }' +
    '\n    group1: {' +
      '\n      + baz: bars' +
      '\n      - baz: bas' +
      '\n        foo: bar' +
    '\n    }' +
    '\n  - group2: {' +
      '\n        abc: 12345' +
    '\n    }' +
    '\n  + group3: {' +
      '\n        fee: 100500' +
    '\n    }' +
  '\n}';

  const path1 = '__test__/__fixtures__/before.json';
  const path2 = '__test__/__fixtures__/after.json';
  expect(compare(path1, path2)).toBe(expected);
});

test('Pretty YAML', () => {
  const expected = '{' +
    '\n    common: {' +
      '\n        setting1: Value 1' +
      '\n      - setting2: 200' +
      '\n        setting3: true' +
      '\n      - setting6: {' +
        '\n            key: value' +
        '\n        }' +
      '\n      + setting4: blah blah' +
      '\n      + setting5: {' +
        '\n            key5: value5' +
        '\n        }' +
    '\n    }' +
    '\n    group1: {' +
      '\n      + baz: bars' +
      '\n      - baz: bas' +
      '\n        foo: bar' +
    '\n    }' +
    '\n  - group2: {' +
      '\n        abc: 12345' +
    '\n    }' +
    '\n  + group3: {' +
      '\n        fee: 100500' +
    '\n    }' +
  '\n}';

  const path1 = '__test__/__fixtures__/before.yaml';
  const path2 = '__test__/__fixtures__/after.yaml';
  expect(compare(path1, path2)).toBe(expected);
});

test('Pretty INI', () => {
  const expected = '{' +
    '\n    common: {' +
      '\n        setting1: Value 1' +
      '\n      - setting2: 200' +
      '\n        setting3: true' +
      '\n      - setting6: {' +
        '\n            key: value' +
        '\n        }' +
      '\n      + setting4: blah blah' +
      '\n      + setting5: {' +
        '\n            key5: value5' +
        '\n        }' +
    '\n    }' +
    '\n    group1: {' +
      '\n      + baz: bars' +
      '\n      - baz: bas' +
      '\n        foo: bar' +
    '\n    }' +
    '\n  - group2: {' +
      '\n        abc: 12345' +
    '\n    }' +
    '\n  + group3: {' +
      '\n        fee: 100500' +
    '\n    }' +
  '\n}';

  const path1 = '__test__/__fixtures__/before.ini';
  const path2 = '__test__/__fixtures__/after.ini';
  expect(compare(path1, path2)).toBe(expected);
});

test('PlAIN TEXT', () => {
  const expected = 'Property \'common.setting2\' was removed\n' +
    'Property \'common.setting6\' was removed\n' +
    'Property \'common.setting4\' was added with value: blah blah\n' +
    'Property \'common.setting5\' was added with complex value\n' +
    'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n' +
    'Property \'group2\' was removed\n' +
    'Property \'group3\' was added with complex value\n';

  const path1 = '__test__/__fixtures__/before.json';
  const path2 = '__test__/__fixtures__/after.json';
  expect(compare(path1, path2, 'plain')).toBe(expected);
});

test('JSON output', () => {
  const expected = {
    common: {
      setting1: {
        type: 'unchanged',
        value: 'Value 1',
      },
      setting2: {
        type: 'deleted',
        value: '200',
      },
      setting3: {
        type: 'unchanged',
        value: true,
      },
      setting6: {
        type: 'deleted',
        value: {
          key: 'value',
        },
      },
      setting4: {
        type: 'added',
        value: 'blah blah',
      },
      setting5: {
        type: 'added',
        value: {
          key5: 'value5',
        },
      },
    },
    group1: {
      baz: {
        type: 'changed',
        value: 'bars',
        oldValue: 'bas',
      },
      foo: {
        type: 'unchanged',
        value: 'bar',
      },
    },
    group2: {
      type: 'deleted',
      value: {
        abc: '12345',
      },
    },
    group3: {
      type: 'added',
      value: {
        fee: '100500',
      },
    },
  };

  const path1 = '__test__/__fixtures__/before.json';
  const path2 = '__test__/__fixtures__/after.json';

  expect(compare(path1, path2, 'json')).toBe(JSON.stringify(expected, null, 4));
});
