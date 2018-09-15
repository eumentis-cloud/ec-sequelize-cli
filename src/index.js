#!/usr/bin/env node

import yargs from 'yargs';
import packageJson from '../package.json';
import { migrationTable, modelFile, addColumnMigrationFile, removeColumnMigrationFile } from './actions';

const cli = yargs
  .scriptName('ecSequelize')
  .version(packageJson.version)
  .command('migration:table <table> [model]', 'Create migration file for new table', (yargs1) => {
    yargs1
      .positional('table', {
        describe: 'Table name',
        type: 'string',
      })
      .positional('model', {
        describe: 'Model name',
        type: 'string',
      });
  })
  .command('migration:column:add <table> <column>', 'Create migration file to add new column to table', (yargs1) => {
    yargs1
      .positional('table', {
        describe: 'Table name',
        type: 'string',
      })
      .positional('column', {
        describe: 'Column name',
        type: 'string',
      });
  })
  .command(
    'migration:column:remove <table> <column>',
    'Create migration file to remove column from table',
    (yargs1) => {
      yargs1
        .positional('table', {
          describe: 'Table name',
          type: 'string',
        })
        .positional('column', {
          describe: 'Column name',
          type: 'string',
        });
    },
  )
  .demandCommand(1, 1, 'Run a command', 'Only one command allowed')
  .help();

const args = cli.argv;

if (args) {
  switch (args._[0]) {
    case 'migration:table':
      migrationTable(args.table);
      if (args.model) {
        modelFile(args.table, args.model);
      }
      break;
    case 'migration:column:add':
      addColumnMigrationFile(args.table, args.column);
      break;
    case 'migration:column:remove':
      removeColumnMigrationFile(args.table, args.column);
      break;
    default:
      console.error('Incorrect command given!');
  }
}
