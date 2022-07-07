import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'Anhminh1234*',
  database: 'anhminh',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
