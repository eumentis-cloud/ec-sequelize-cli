import moment from 'moment';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

nunjucks.configure(path.resolve(__dirname, '../nunjucks'));

export const migrationTable = (tableName) => {
  const fileName = `${moment().format('YYYYMMDDHHmmss')}-table-${tableName}.js`;
  fs.writeFile(
    path.resolve(process.cwd(), `./sequelize/migrations/${fileName}`),
    nunjucks.render('migrationTable.njk', { tableName }),
    (err) => {
      if (err) console.log(err);
    },
  );
};

export const modelFile = (tableName, modelName) => {
  fs.writeFile(
    path.resolve(process.cwd(), `./sequelize/models/${modelName}.js`),
    nunjucks.render('model.njk', { tableName, modelName }),
    (err) => {
      if (err) console.log(err);
    },
  );
};

export const addColumnMigrationFile = (tableName, columnName) => {
  const fileName = `${moment().format('YYYYMMDDHHmmss')}-addColumn-${tableName}-${columnName}.js`;
  fs.writeFile(
    path.resolve(process.cwd(), `./sequelize/migrations/${fileName}`),
    nunjucks.render('addColumn.njk', { tableName, columnName }),
    (err) => {
      if (err) console.log(err);
    },
  );
};

export const removeColumnMigrationFile = (tableName, columnName) => {
  const fileName = `${moment().format('YYYYMMDDHHmmss')}-removeColumn-${tableName}-${columnName}.js`;
  fs.writeFile(
    path.resolve(process.cwd(), `./sequelize/migrations/${fileName}`),
    nunjucks.render('removeColumn.njk', { tableName, columnName }),
    (err) => {
      if (err) console.log(err);
    },
  );
};

export default null;
