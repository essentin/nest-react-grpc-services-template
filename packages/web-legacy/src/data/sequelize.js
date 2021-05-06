import Sequelize from 'sequelize';
import fs from 'fs';
import { databaseUrl, databaseEnv } from '../config';

let digitalCert = '';

try {
  if (
    !fs
      .lstatSync(__dirname + '/../well-known/digitalOcean/ca-certificate.crt')
      .isDirectory()
  ) {
    digitalCert = fs.readFileSync(
      __dirname + '/../well-known/digitalOcean/ca-certificate.crt',
    );
  }
} catch (err) {
  // ignore
}

const logging = (query) => {
  const now = new Date();
  const stamp = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 2, // not woring on nodejs 12
    hour12: false,
  }).format(now);

  // eslint-disable-next-line no-console
  console.log(`[${stamp}.${now.getMilliseconds()}]`, query);
};

const dialectOptions = {
  ssl:
    databaseEnv == 'dev' && digitalCert
      ? {
          rejectUnauthorized: true,
          ca: [digitalCert],
        }
      : false,
};

const sequelize = new Sequelize(databaseUrl, {
  define: {
    freezeTableName: true,
  },
  logging,
  dialectOptions,
});

export default sequelize;
