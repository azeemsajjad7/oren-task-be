import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'online_fd',
  schema: 'public',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
