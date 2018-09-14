import moment from 'moment';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

export default (tableName) => {
  const fileName = `${moment().format('YYYYMMDDHHmmss')}-table-${tableName}.js`;
  fs.writeFile(
    path.resolve(process.cwd(), `./sequelize/migrations/${fileName}`),
    nunjucks.render(path.resolve(__dirname, '../nunjucks/migrationTable.njk'), { tableName }),
  );
};
