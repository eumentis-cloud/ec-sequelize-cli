import moment from 'moment';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

nunjucks.configure(path.resolve(__dirname, '../nunjucks'));

export default (tableName) => {
  const fileName = `${moment().format('YYYYMMDDHHmmss')}-table-${tableName}.js`;
  fs.writeFile(
    path.resolve(process.cwd(), `./sequelize/migrations/${fileName}`),
    nunjucks.render('migrationTable.njk', { tableName }),
    (err) => {
      if (err) console.log(err);
    },
  );
};
