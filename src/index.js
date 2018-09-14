import yargs from 'yargs';
import packageJson from '../package.json';
import migrationTable from './migrationTable';

const cli = yargs
  .scriptName('ecSequelize')
  .version(packageJson.version)
  .command('migration:table <table>', 'Create migration file for new table', (yargs1) => {
    yargs1.positional('table', {
      describe: 'Table name',
      type: 'string',
    });
  })
  .demandCommand(1, 1, 'Run a command', 'Only one command allowed')
  .help();

const args = cli.argv;

if (args) {
  switch (args._[0]) {
    case 'migration:table':
      migrationTable(args.table);
      break;
    default:
      console.error('Incorrect command given!');
  }
}
