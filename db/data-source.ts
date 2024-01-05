import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: any = {
  entities: ['**/*.entity.js'],
  migrations: ['../dist/db/migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
    });
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    });
    break;
  case 'production':
    Object.assign(dataSourceOptions, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unkown environment!');
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
