import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const typeOrmDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: false,
  dropSchema: false,
  logging: process.env.NODE_ENV === 'production' ? false : true,
};

export const typeOrmModuleOptions = {
  ...typeOrmDataSourceOptions,
  autoLoadEntities: true,
};

const typeOrmDataSource = new DataSource({
  ...typeOrmDataSourceOptions,
  entities: ['dist/**/entity/index.js'],
  migrations: ['dist/common/database/postgres/migration/*.js'],
});
export default typeOrmDataSource;
