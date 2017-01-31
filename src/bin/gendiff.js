#!/usr/bin/env node
// @flow

import program from 'commander';
import compare from '../lib/';

program
  .version('0.7.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((first_config, second_config) => {
    console.log(compare(first_config, second_config, program.format));
  })
  .parse(process.argv);
