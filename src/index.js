#!/usr/bin/env node

import yargs from 'yargs';
import packageJson from '../package.json';
import {
  migrationTable,
  modelFile,
  addColumnMigrationFile,
  removeColumnMigrationFile,
  changeColumnMigrationFile,
  renameColumnMigrationFile,
  addUniqueConstraintMigrationFile,
} from './actions';

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
  .command(
    'migration:column:change <table> <column>',
    'Create migration file to change the column definition',
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
  .command(
    'migration:column:rename <table> <oldColumn> <newColumn>',
    'Create migration file to rename column in table',
    (yargs1) => {
      yargs1
        .positional('table', {
          describe: 'Table name',
          type: 'string',
        })
        .positional('oldColumn', {
          describe: 'Old column name',
          type: 'string',
        })
        .positional('newColumn', {
          describe: 'New column name',
          type: 'string',
        });
    },
  )
  .command(
    'uniqueConstraint:add <table> <columns>',
    'Create migration file to add new unique constraint to table',
    (yargs1) => {
      yargs1
        .positional('table', {
          describe: 'Table name',
          type: 'string',
        })
        .positional('columns', {
          describe: 'Comma separated list of column names',
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
    case 'migration:column:change':
      changeColumnMigrationFile(args.table, args.column);
      break;
    case 'migration:column:rename':
      renameColumnMigrationFile(args.table, args.oldColumn, args.newColumn);
      break;
    case 'uniqueConstraint:add':
      addUniqueConstraintMigrationFile(args.table, args.columns.split(',').map((entry) => entry.trim()));
      break;
    default:
      console.error('Incorrect command given!');
  }
}
