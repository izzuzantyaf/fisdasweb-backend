import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const typeOrmDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  dropSchema: false,
  logging: process.env.NODE_ENV === 'production' ? false : true,
};

export const typeOrmModuleOptions = {
  ...typeOrmDataSourceOptions,
  autoLoadEntities: true,
};

const typeOrmDataSource = new DataSource({
  ...typeOrmDataSourceOptions,
  entities: ['src/**/admin.entity.ts', 'src/**/organigram.entity.ts'],
  migrations: ['src/common/database/postgres/migration/*.ts'],
});
export default typeOrmDataSource;
