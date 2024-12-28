import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

export const typeOrmDataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: false,
  dropSchema: false,
  logging: process.env.APP_ENV === 'local' ? true : false,
  seeds: ['dist/common/database/seeders/**/*{.ts,.js}'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...typeOrmDataSourceOptions,
  autoLoadEntities: true,
  applicationName: 'fisdasweb',
  extra: {
    idleTimeoutMillis: 30_000,
  },
};

const typeOrmDataSource = new DataSource({
  ...typeOrmDataSourceOptions,
  entities: ['dist/**/entities/index{.ts,.js}'],
  migrations: ['dist/common/database/postgres/migration/*{.ts,.js}'],
});

export default typeOrmDataSource;
