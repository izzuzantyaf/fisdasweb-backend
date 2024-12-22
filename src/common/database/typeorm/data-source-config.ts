import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

config();

export const typeOrmDataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: false,
  dropSchema: false,
  logging: process.env.APP_ENV === 'production' ? false : true,
  seeds: ['dist/common/database/seeders/**/*{.ts,.js}'],
};

export const typeOrmModuleOptions = {
  ...typeOrmDataSourceOptions,
  autoLoadEntities: true,
};

const typeOrmDataSource = new DataSource({
  ...typeOrmDataSourceOptions,
  entities: ['dist/**/entities/index{.ts,.js}'],
  migrations: ['dist/common/database/postgres/migration/*{.ts,.js}'],
});

export default typeOrmDataSource;
