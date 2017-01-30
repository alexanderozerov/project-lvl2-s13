// @flow

import yamlJs from 'yaml-js';
import iniJs from 'ini';

const format = {
  json: data => JSON.parse(data),
  yaml: data => yamlJs.load(data),
  yml: data => yamlJs.load(data),
  ini: data => iniJs.parse(data),
};

const parser = (file: string, ext: string) => format[ext](file);

export default parser;
